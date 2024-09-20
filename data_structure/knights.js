const Point = (list) => {
  let _x = list[0];
  let _y = list[1];
  let _prev = null;

  const getX = () => {
    return _x;
  };

  const getY = () => {
    return _y;
  };

  const getPrev = () => {
    return _prev;
  }

  const toList = () => {
    return [_x, _y];
  };

  const toStr = () => {
    return `${_x}-${_y}`;
  }

  const setPrev = (p) => {
    _prev = p;
  };

  return { getX, getY, getPrev, toList, toStr, setPrev };
};

const Board = (length) => {
  const _length = length;

  const isValidPoint = (list) => {
    return list[0] < 0 ||
      list[1] < 0 ||
      list[0] >= _length ||
      list[1] >= _length
      ? false
      : true;
  };

  return { isValidPoint};
};

const Game = (start, target) => {
  const _length = 8;
  const _board = Board(_length);
  if (!_board.isValidPoint(start) || !_board.isValidPoint(target))
    throw new Error("Out of range, illegal start or target point.");
  const _start = Point(start);
  const _target = Point(target);

  const play = () => {
    let visited = new Set();
    let queue = [];
    queue.push(_start);
    while (queue.length) {
        let curr = queue.shift();
        let possibleNextPositions = _generateNext(curr);
        while (possibleNextPositions.length) {
            let next = possibleNextPositions.pop();
            if (!visited.has(next.toStr())) {
                visited.add(next.toStr());
                next.setPrev(curr);
                queue.push(next);
                if (next.toStr() === _target.toStr()) return _generateReturn(next);
            }
        }
    }
    throw new Error("Can't find a path to target point.");
  }

  const _generateReturn = (curr) => {
    let list = [];
    while (curr !== null) {
        list.push(curr.toList());
        curr = curr.getPrev();
    }
    return list.reverse();
  }

  const _generateNext = (start) => {
    let possiblePositions = [
      [start.getX() - 2, start.getY() - 1],
      [start.getX() - 2, start.getY() + 1],
      [start.getX() + 2, start.getY() + 1],
      [start.getX() + 2, start.getY() - 1],
      [start.getX() - 1, start.getY() - 2],
      [start.getX() - 1, start.getY() + 2],
      [start.getX() + 1, start.getY() + 2],
      [start.getX() + 1, start.getY() - 2]
    ];
    return possiblePositions
      .filter((position) => _board.isValidPoint(position))
      .map((position) => Point(position));
  };

  return { play };
};


let game;
game = Game([0,0],[1,2]);
console.log(game.play());
game = Game([0,0],[3,3]);
console.log(game.play());
game = Game([3,3],[0,0]);
console.log(game.play());
game = Game([0,0],[7,7]);
console.log(game.play());
game = Game([3,3],[4,3]);
console.log(game.play());