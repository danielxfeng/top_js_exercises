const Point = (list) => {
  let _x = list[0];
  let _y = list[1];

  const getX = () => {
    return _x;
  };

  const getY = () => {
    return _y;
  };

  const toList = () => {
    return [_x, _y];
  };

  return { getX, getY, toList };
};

const Square = () => {
  let _steps = null;
  let _isVisited = false;
  let _prevPosition = null;

  const getPrevPosition = () => {
    return _prevPosition;
  };

  const canVisit = (steps) => {
    return !_isVisited || _steps > steps;
  };

  const setVisited = (steps, prevPosition) => {
    _isVisited = true;
    _steps = steps;
    _prevPosition = prevPosition;
  };

  return { getPrevPosition, canVisit, setVisited };
};

const Board = (length) => {
  const _length = length;
  let _board = [];

  const _init = () => {
    _board = [];
    for (let i = 0; i < length; i++) {
      _board.push([]);
      for (let j = 0; j < length; j++) {
        _board[i].push(Square());
      }
    }
  };

  const isValidPoint = (list) => {
    return list[0] < 0 ||
      list[1] < 0 ||
      list[0] >= _length ||
      list[1] >= _length
      ? false
      : true;
  };

  const square = (point) => {
    return _board[point.getX()][point.getY()];
  };

  _init();

  return { isValidPoint, square };
};

const Game = (start, target) => {
  const _length = 8;
  const _board = Board(_length);
  if (!_board.isValidPoint(start) || !_board.isValidPoint(target))
    throw new Error("Out of range, illegal start or target point.");
  const _start = Point(start);
  const _target = Point(target);

  const play = () => {
    _board.square(_start).setVisited(0, null);
    _move(_start, 0);
    return _generateReturn();
  }

  const _generateReturn = () => {
    let list = [];
    let curr = _target;
    while (curr !== null) {
        list.push(curr.toList());
        curr = _board.square(curr).getPrevPosition();
    }
    return list.reverse();
  }

  const _move = (curr, steps) => {
    if (curr === null) return;
    let possibleNextPositions = _generateNext(curr);
    steps++;
    while (possibleNextPositions.length) {
        let next = possibleNextPositions.pop()
        let nextSquare = _board.square(next);
        if (nextSquare.canVisit(steps)) {
            nextSquare.setVisited(steps, curr);
            _move(next, steps);
        }
    }
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