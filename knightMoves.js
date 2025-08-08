function isValid(x, y) {
  if (x >= 0 && x <= 7 && y >= 0 && y <= 7) return true;
}

const KNIGHT_MOVES = [
  [1, 2],
  [1, -2],
  [2, 1],
  [2, -1],
  [-1, 2],
  [-1, -2],
  [-2, 1],
  [-2, -1]
];

function knightMoves(start, end) {
  const [sx, sy] = start;
  const [ex, ey] = end;

  if (sx === ex && sy === ey) return [[sx,sy]];

  const queue = [];
  const visited = new Set();
}