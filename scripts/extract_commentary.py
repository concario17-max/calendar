from __future__ import annotations

import re
import zipfile
from collections import OrderedDict
from pathlib import Path
from xml.etree import ElementTree as ET


ROOT = Path(__file__).resolve().parent.parent
GUA_SOURCE = ROOT / "\uad18\uc0ac" / "\uad18\uc0ac-1.odt"
YAO_SOURCE = ROOT / "\ud6a8\uc0ac" / "\ud6a8\uc0ac-1.odt"
NAMESPACES = {
    "office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    "text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
    "table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
}
TITLE_RE = re.compile(r"^(?P<num>\d+)\.\s*(?P<title>.*\S)?$")
STATUS_RE = re.compile(r"^\[.*\]$")


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


def extract_blocks(odt_path: Path) -> list[tuple[int, str]]:
    with zipfile.ZipFile(odt_path) as archive:
        root = ET.fromstring(archive.read("content.xml"))

    office_text = root.find("office:body/office:text", NAMESPACES)
    if office_text is None:
        raise RuntimeError(f"Missing office:text in {odt_path}")

    entries: list[tuple[int, str]] = []
    current_number: int | None = None
    current_blocks: list[str] = []

    for child in office_text:
        tag = child.tag.rsplit("}", 1)[-1]
        block_text: str | None = None

        if tag == "p":
            text = normalize_text("".join(child.itertext()))
            if not text:
                continue
            if STATUS_RE.match(text):
                continue
            title_match = TITLE_RE.match(text)
            if title_match:
                if current_number is not None and current_blocks:
                    entries.append((current_number, "\n\n".join(current_blocks)))
                current_number = int(title_match.group("num"))
                current_blocks = [text]
                continue
            if current_number is not None:
                current_blocks.append(text)
            continue

        if tag == "table":
            block_text = extract_table_block(child)

        if block_text and current_number is not None:
            current_blocks.append(block_text)

    if current_number is not None and current_blocks:
        entries.append((current_number, "\n\n".join(current_blocks)))

    return entries


def to_ts_template(text: str) -> str:
    escaped = text.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    return f"`{escaped}`"


def build_registry(entries: list[tuple[int, str]]) -> OrderedDict[int, str]:
    registry: OrderedDict[int, list[str]] = OrderedDict()

    for num, text in entries:
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


def main() -> None:
    gua_entries = build_registry(extract_blocks(GUA_SOURCE))
    yao_entries = build_registry(extract_blocks(YAO_SOURCE))

    (ROOT / "src" / "data" / "guaCommentary.ts").write_text(
        render_ts("GUA_COMMENTARY_BY_NUM", "getGuaCommentary", gua_entries),
        encoding="utf-8",
    )
    (ROOT / "src" / "data" / "yaoCommentary.ts").write_text(
        render_ts("YAO_COMMENTARY_BY_NUM", "getYaoCommentary", yao_entries),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
