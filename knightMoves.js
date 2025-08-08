class KnightMoves {
  constructor() {
    this.knightMoves = [
      [1, 2],
      [1, -2],
      [2, 1],
      [2, -1],
      [-1, 2],
      [-1, -2],
      [-2, 1],
      [-2, -1]
    ];
  }

  isValid(x, y) {
    return (x >= 0 && x <= 7 && y >= 0 && y <= 7);
  }

  key(x, y) {
    return `${x}, ${y}`;
  }

  parseKey(k) {
    return k.split(',').map(Number);
  }

  neighbors(x, y) {
    const result = [];
    for (const [dx, dy] of this.knightMoves) {
      const nx = x + dx;
      const ny = y + dy;
      if (this.isValid(nx, ny)) result.push([nx, ny]);
    }
    return result;
  }

  findPath(start, end) {
    const [sx, sy] = start;
    const [ex, ey] = end;
    if (sx === ex && sy === ey) return [[sx,sy]];

    const startKey = this.key(sx, sy);
    const endKey = this.key(ex, ey);
    const visited = new Set([startKey]);
    const parent = new Map();
    const queue = [[sx, sy]];

    while (queue.length > 0) {
      const [x, y] = queue.shift();
      
      for (const [nx, ny] of this.neighbors(x, y)) {
        const k = this.key(nx, ny);
        if (visited.has(k)) continue;
        
        visited.add(k);
        parent.set(k, this.key(x, y));

        if (k === endKey) {
          const path = [];
          let current = k;
          while (current !== undefined) {
            path.push(this.parseKey(current));
            if (current === startKey) break;
            current = parent.get(current);
          }
          path.reverse();
          return path;
        }
        queue.push([nx, ny]);
      }
    }  
    return [];
  }

  printPath(start, end) {
    const path = this.findPath(start, end);
    if (path.length === 0) {
      console.log('No path found.');
      return;
    }
    const moves = path.length - 1;
    console.log(`You made it in ${moves}! Here's your path: `);
    for (const p of path) {
      console.log(`[${p[0]}, ${p[1]}]`); 
    }
  }
}

const testKnightMoves = new KnightMoves();

console.log('Test 1 - Start [0, 0], End [1, 2]');
testKnightMoves.printPath([0, 0], [1, 2]);
console.log('\nTest 2 - Start [0, 0], End [3, 3]');
testKnightMoves.printPath([0, 0], [3, 3]);
console.log('\nTest 3 - Start [3, 3], End [0, 0]');
testKnightMoves.printPath([3, 3], [0, 0]);
console.log('\nTest 4 - Start [0, 0], End [7, 7]');
testKnightMoves.printPath([0, 0], [7, 7]);
console.log('\nTest 5 (trivial) - Start [4, 4], End [4, 4]');
testKnightMoves.printPath([4, 4], [4, 4]);
console.log('\nTest 6 (out of bounds) - Start [0, 0], End [3, 8]');
testKnightMoves.printPath([0, 0], [3, 8]);
