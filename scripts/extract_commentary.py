from __future__ import annotations

import re
import zipfile
from collections import OrderedDict
from pathlib import Path
from xml.etree import ElementTree as ET


ROOT = Path(__file__).resolve().parent.parent
GUA_FOLDER = ROOT / "\uad18\uc0ac"
YAO_FOLDER = ROOT / "\ud6a8\uc0ac"
BONUS_GUA_SOURCE = ROOT / "\ubcf4\ub108\uc2a4" / "\uad18\uc0ac-0.odt"
BONUS_YAO_SOURCE = ROOT / "\ubcf4\ub108\uc2a4" / "\ud6a8\uc0ac-0.odt"
NAMESPACES = {
    "office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    "text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
    "table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
}
TITLE_RE = re.compile(r"^(?P<num>\d+)\.\s*(?P<title>.*\S)?$")
STATUS_RE = re.compile(r"^\[.*\]$")
LIST_START_MARKER = "[[list]]"
LIST_END_MARKER = "[[/list]]"
LIST_ITEM_MARKER = "[[item]]"


def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def extract_cell_text(cell: ET.Element) -> str:
    return normalize_text("".join(cell.itertext()))


def extract_table_block(table: ET.Element) -> str | None:
    rows: list[list[str]] = []
    for row in table.findall("table:table-row", NAMESPACES):
        row_repeat = int(row.attrib.get(f"{{{NAMESPACES['table']}}}number-rows-repeated", "1"))
        cells: list[str] = []

        for cell in row.findall("table:table-cell", NAMESPACES):
            cell_repeat = int(cell.attrib.get(f"{{{NAMESPACES['table']}}}number-columns-repeated", "1"))
            cell_text = extract_cell_text(cell)
            for _ in range(cell_repeat):
                cells.append(cell_text)

        for _ in range(row_repeat):
            rows.append(cells.copy())

    if len(rows) < 2:
        return None

    max_width = max((len(row) for row in rows), default=0)
    if max_width == 0:
        return None

    normalized_rows = [row + [""] * (max_width - len(row)) for row in rows]
    return "\n".join(" | ".join(cell for cell in row) for row in normalized_rows)


def extract_title_match(block_text: str) -> re.Match[str] | None:
    for line in block_text.splitlines():
        stripped = line.strip()
        if not stripped:
            continue

        return TITLE_RE.match(stripped)

    return None


def extract_node_blocks(node: ET.Element) -> list[str]:
    blocks: list[str] = []

    for child in list(node):
        tag = child.tag.rsplit("}", 1)[-1]

        if tag in {"p", "h"}:
            text = normalize_text("".join(child.itertext()))
            if not text or STATUS_RE.match(text):
                continue
            blocks.append(text)
            continue

        if tag == "table":
            table_block = extract_table_block(child)
            if table_block is not None:
                blocks.append(table_block)
            continue

        if tag == "list":
            list_block = extract_list_block(child)
            if list_block is not None:
                blocks.append(list_block)
            continue

        blocks.extend(extract_node_blocks(child))

    return blocks


def extract_list_item_text(item: ET.Element) -> str | None:
    blocks = extract_node_blocks(item)
    if not blocks:
        return None

    item_text = "\n\n".join(blocks).strip()
    return item_text or None


def extract_list_block(list_node: ET.Element) -> str | None:
    header_blocks: list[str] = []
    item_blocks: list[str] = []

    for header in list_node.findall("text:list-header", NAMESPACES):
        header_text = extract_list_item_text(header)
        if header_text is not None:
            header_blocks.append(header_text)

    for item in list_node.findall("text:list-item", NAMESPACES):
        item_text = extract_list_item_text(item)
        if item_text is not None:
            item_blocks.append(f"{LIST_ITEM_MARKER} {item_text}")

    if not header_blocks and not item_blocks:
        return None

    return "\n".join([*header_blocks, LIST_START_MARKER, *item_blocks, LIST_END_MARKER])


def extract_blocks(odt_path: Path) -> list[tuple[int, str]]:
    with zipfile.ZipFile(odt_path) as archive:
        root = ET.fromstring(archive.read("content.xml"))

    office_text = root.find("office:body/office:text", NAMESPACES)
    if office_text is None:
        raise RuntimeError(f"Missing office:text in {odt_path}")

    entries: list[tuple[int, str]] = []
    current_number: int | None = None
    current_blocks: list[str] = []

    for block_text in extract_node_blocks(office_text):
        title_match = extract_title_match(block_text)
        if title_match:
            if current_number is not None and current_blocks:
                entries.append((current_number, "\n\n".join(current_blocks)))
            current_number = int(title_match.group("num"))
            current_blocks = [block_text]
            continue

        if current_number is not None:
            current_blocks.append(block_text)

    if current_number is not None and current_blocks:
        entries.append((current_number, "\n\n".join(current_blocks)))

    return entries


def folder_sort_key(path: Path) -> tuple[object, ...]:
    parts = re.split(r"(\d+)", path.name.casefold())
    key: list[object] = []
    for part in parts:
        if not part:
            continue
        if part.isdigit():
            key.append(int(part))
        else:
            key.append(part)
    return tuple(key)


def extract_source_entries(source: Path) -> list[tuple[int, str]]:
    if source.is_file():
        return extract_blocks(source)

    odt_paths = sorted(source.glob("*.odt"), key=folder_sort_key)
    if not odt_paths:
        raise RuntimeError(f"No ODT files found in {source}")

    entries: list[tuple[int, str]] = []
    for odt_path in odt_paths:
        entries.extend(extract_blocks(odt_path))
    return entries


def to_ts_template(text: str) -> str:
    escaped = text.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    return f"`{escaped}`"


def build_registry(entries: list[tuple[int, str]], source_label: str) -> OrderedDict[int, str]:
    registry: OrderedDict[int, list[str]] = OrderedDict()

    for num, text in entries:
        if num in registry:
            raise RuntimeError(f"Duplicate commentary number {num} found while building {source_label}")
        registry.setdefault(num, []).append(text)

    merged: OrderedDict[int, str] = OrderedDict()
    for num, blocks in registry.items():
        merged[num] = "\n\n".join(blocks)

    return merged


def render_ts(var_name: str, function_name: str, registry: OrderedDict[int, str]) -> str:
    lines = [f"export const {var_name}: Readonly<Record<number, string>> = {{"]
    for num, text in registry.items():
        lines.append(f"  {num}: {to_ts_template(text)},")
    lines.append("};")
    lines.append("")
    lines.append(f"export function {function_name}(num: number | null): string | undefined {{")
    lines.append("  if (num === null) {")
    lines.append("    return undefined;")
    lines.append("  }")
    lines.append("")
    lines.append(f"  const commentary = {var_name}[num];")
    lines.append("  return commentary && commentary.trim().length > 0 ? commentary : undefined;")
    lines.append("}")
    lines.append("")
    return "\n".join(lines)


def render_num_list(var_name: str, registry: OrderedDict[int, str]) -> str:
    nums = ", ".join(str(num) for num in registry.keys())
    return f"export const {var_name} = [{nums}] as const;\n"


def main() -> None:
    gua_entries = build_registry(extract_source_entries(GUA_FOLDER), "괘사")
    yao_entries = build_registry(extract_source_entries(YAO_FOLDER), "효사")
    bonus_gua_entries = build_registry(extract_source_entries(BONUS_GUA_SOURCE), "보너스 괘사")
    bonus_yao_entries = build_registry(extract_source_entries(BONUS_YAO_SOURCE), "보너스 효사")

    (ROOT / "src" / "data" / "guaCommentary.ts").write_text(
        render_ts("GUA_COMMENTARY_BY_NUM", "getGuaCommentary", gua_entries),
        encoding="utf-8",
    )
    (ROOT / "src" / "data" / "yaoCommentary.ts").write_text(
        render_ts("YAO_COMMENTARY_BY_NUM", "getYaoCommentary", yao_entries),
        encoding="utf-8",
    )
    (ROOT / "src" / "data" / "bonusGuaCommentary.ts").write_text(
        render_num_list("BONUS_GUA_COMMENTARY_NUMS", bonus_gua_entries)
        + render_ts("BONUS_GUA_COMMENTARY_BY_NUM", "getBonusGuaCommentary", bonus_gua_entries),
        encoding="utf-8",
    )
    (ROOT / "src" / "data" / "bonusYaoCommentary.ts").write_text(
        render_num_list("BONUS_YAO_COMMENTARY_NUMS", bonus_yao_entries)
        + render_ts("BONUS_YAO_COMMENTARY_BY_NUM", "getBonusYaoCommentary", bonus_yao_entries),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
