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

function isValid(x, y) {
  return (x >= 0 && x <= 7 && y >= 0 && y <= 7);
}

function knightMoves(start, end) {
  const [sx, sy] = start;
  const [ex, ey] = end;
  const positionKey = (x, y) => `${x}, ${y}`;
  const parseKey = (k) => k.split(',').map(Number);

  if (sx === ex && sy === ey) return [[sx,sy]];

  const queue = [];
  const visited = new Set();
  const parent = new Map();

  queue.push([sx, sy]);
  visited.add(positionKey(sx, sy));

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    
    for (const [dx, dy] of KNIGHT_MOVES) {
      const nx = x + dx;
      const ny = y + dy;
      
      if (!isValid(nx, ny)) continue;

      const key = positionKey(nx, ny);
      if (visited.has(key)) continue;

      visited.add(key);
      parent.set(key, positionKey(x, y));

      if (nx === ex & ny === ey) {
        const path = [];
        let currentKey = key;
        while (currentKey !== undefined) {
          path.push(parseKey(currentKey));
          if (currentKey === positionKey(sx, sy)) break;
          currentKey = parent.get(currentKey);
        }
        path.reverse();
        return path;
      }
      queue.push([nx, ny]);
    }
  }
  return [];
}

console.log(knightMoves([0,0],[1,2]));
console.log(knightMoves([0,0],[3,3]));
console.log(knightMoves([3,3],[4,3]));