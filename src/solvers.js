/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row[j] = 0;
    }
    solution[i] = row;
  }
  var board = new Board(solution);
  var solver = (row) => {
    if (row === n) {
      return board;
    }
    for (let index = 0; index < n; index++) {
      board.togglePiece(row, index);
      if (!board.hasAnyRooksConflicts()) {
        return solver(row + 1);
      }
      board.togglePiece(row, index);
    }
    return;
  };
  solver(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var solution = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row[j] = 0;
    }
    solution[i] = row;
  }
  var board = new Board(solution);
  var solver = (row) => {
    if (row === n) {
      solutionCount ++;
      return;
    }
    for (let index = 0; index < n; index++) {
      board.togglePiece(row, index);
      if (!board.hasAnyRooksConflicts()) {
        solver(row + 1);
      }
      board.togglePiece(row, index);
    }
    return;
  };
  solver(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row[j] = 0;
    }
    solution[i] = row;
  }

  var board = new Board(solution);
  // if (n === 2 || n === 3) {
  //   return board;
  // };
  var solver = (row) => {
    if (row === n) {
      return board;
    }
    for (let index = 0; index < n; index++) {
      board.togglePiece(row, index);
      if (!board.hasAnyQueensConflicts()) {
        ans = solver(row + 1);
        if (ans !== 'go back') {
          return;
        }
      }
      board.togglePiece(row, index);
    }
    return 'go back';
  };
  solver(0);
  console.log(n, board);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var solution = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row[j] = 0;
    }
    solution[i] = row;
  }
  var board = new Board(solution);
  var solver = (row) => {
    if (row === n) {
      solutionCount ++;
      return;
    }
    for (let index = 0; index < n; index++) {
      board.togglePiece(row, index);
      if (!board.hasAnyQueensConflicts()) {
        solver(row + 1);
      }
      board.togglePiece(row, index);
    }
    return;
  };
  solver(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
