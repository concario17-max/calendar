export interface SplitCommentary {
  heading: string;
  blocks: CommentaryBlock[];
}

export type CommentaryBlock =
  | {
      kind: 'paragraph';
      text: string;
    }
  | {
      kind: 'list';
      items: CommentaryListItem[];
    }
  | {
      kind: 'table';
      rows: string[][];
    };

export interface CommentaryListItem {
  text: string;
  children: CommentaryListItem[];
}

function splitParagraphBlocks(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function normalizeListItemText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function isMarkerListOpenToken(line: string): boolean {
  return /^\[{1,2}list\]\]$/.test(line);
}

function isMarkerListCloseToken(line: string): boolean {
  return /^\[{1,2}\/list\]\]$/.test(line);
}

function parseMarkerItemToken(line: string): string | null {
  const match = line.match(/^\[{1,2}item\]\]\s*(.+)$/u);
  if (!match) {
    return null;
  }

  const text = normalizeListItemText(match[1] || '');
  return text.length > 0 ? text : null;
}

function parsePipeTableBlock(block: string): string[][] | null {
  const rows = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (rows.length < 2) {
    return null;
  }

  const parsedRows = rows.map((row) => row.split('|').map((cell) => cell.trim()));
  const firstRow = parsedRows[0];

  if (firstRow.length < 3 || !parsedRows.every((row) => row.length >= 3)) {
    return null;
  }

  if (!parsedRows.every((row) => row.length === firstRow.length)) {
    return null;
  }

  return parsedRows;
}

function parseMarkerListBlock(block: string): CommentaryListItem[] | null {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 3) {
    return null;
  }

  if (!isMarkerListOpenToken(lines[0]) || !isMarkerListCloseToken(lines[lines.length - 1])) {
    return null;
  }

  const root: CommentaryListItem[] = [];
  const stack: CommentaryListItem[][] = [root];

  for (const line of lines.slice(1, -1)) {
    if (isMarkerListOpenToken(line)) {
      const currentItems = stack[stack.length - 1];
      const parentItem = currentItems[currentItems.length - 1];

      if (!parentItem) {
        return null;
      }

      stack.push(parentItem.children);
      continue;
    }

    if (isMarkerListCloseToken(line)) {
      if (stack.length === 1) {
        return null;
      }

      stack.pop();
      continue;
    }

    const text = parseMarkerItemToken(line);
    if (!text) {
      return null;
    }

    stack[stack.length - 1].push({
      text,
      children: [],
    });
  }

  if (stack.length !== 1 || root.length === 0) {
    return null;
  }

  return root;
}

function parseListBlock(block: string): CommentaryListItem[] | null {
  const markerItems = parseMarkerListBlock(block);
  if (markerItems) {
    return markerItems;
  }

  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return null;
  }

  const listItemPattern = /^(?:[-*]|\d+[.)])\s*(.+)$/u;
  const items: CommentaryListItem[] = [];

  for (const line of lines) {
    const match = line.match(listItemPattern);
    if (!match) {
      return null;
    }

    const text = normalizeListItemText(match[1] || '');
    if (text.length === 0) {
      return null;
    }

    items.push({
      text,
      children: [],
    });
  }

  return items;
}

export function splitCommentary(text: string): SplitCommentary {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return { heading: '', blocks: [] };
  }

  const newlineIndex = trimmed.indexOf('\n');
  if (newlineIndex === -1) {
    return { heading: trimmed, blocks: [] };
  }

  const heading = trimmed.slice(0, newlineIndex).trim();
  const body = trimmed.slice(newlineIndex + 1).trim();
  const blocks: CommentaryBlock[] = splitParagraphBlocks(body).map((block): CommentaryBlock => {
    const rows = parsePipeTableBlock(block);
    if (rows) {
      return { kind: 'table', rows };
    }

    const items = parseListBlock(block);
    if (items) {
      return { kind: 'list', items };
    }

    return { kind: 'paragraph', text: block };
  });

  return {
    heading,
    blocks,
  };
}
