const islandKeyStore = {};
let islands = 0;

const fanTraverse = (grid, y, x, key) => {
  if (!existInKeyStore(y, x)) {
    insertKeyStore(y, x, key);
  }

  let nextPosition;

  const right = x + 1;
  if (
    right < grid[0].length &&
    grid[y][right] === "1" &&
    !existInKeyStore(y, right)
  ) {
    nextPosition = { y, x: right };
    fanTraverse(grid, nextPosition.y, nextPosition.x, key);
  }

  const down = y + 1;
  if (
    down < grid.length &&
    grid[down][x] === "1" &&
    !existInKeyStore(down, x)
  ) {
    nextPosition = { y: down, x };
    fanTraverse(grid, nextPosition.y, nextPosition.x, key);
  }

  const left = x - 1;
  if (left > -1 && grid[y][left] === "1" && !existInKeyStore(y, left)) {
    nextPosition = { x: left, y };
    fanTraverse(grid, nextPosition.y, nextPosition.x, key);
  }

  const up = y - 1;
  if (up > -1 && grid[up][x] === "1" && !existInKeyStore(up, x)) {
    nextPosition = { y: up, x };
    fanTraverse(grid, nextPosition.y, nextPosition.x, key);
  }
};

const existInKeyStore = (y, x) => islandKeyStore[`${y}${x}`];

const insertKeyStore = (y, x, islandKey) => {
  islandKeyStore[`${y}${x}`] = islandKey;
};

const islandFinder = (grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const position = grid[y][x];

      if (!existInKeyStore(y, x) && position === "1") {
        islands = islands + 1;
        fanTraverse(grid, y, x, islands);
      }
    }
  }
};

islandFinder([
  ["0", "1", "0", "1", "0"],
  ["1", "0", "1", "0", "0"],
  ["1", "1", "1", "0", "0"],
  ["0", "0", "0", "1", "0"]
]);

console.log(islandKeyStore);
console.log(islands);

export default islandFinder;
