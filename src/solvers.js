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
  // var solution = new Board([[],[],[]]);
  var solution = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row[j] = 0;
    }
    solution[i] = row;
  }
  //console.log(solution);
  var board = new Board(solution);
  //[[1,0,0],
  // [0,1,0]
  // [0,0,1]]
  console.log('board ', board);
  var solver = (row) => {
    if (row === n) {
      //console.log(board);
      return board;
    }
    for (let index = 0; index < n; index++) {
      board.togglePiece(row, index);
      if (!board.hasAnyRooksConflicts()) {
        return solver(row + 1);
      }
      board.togglePiece(row, index);
    }
  };
  solver(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var solution = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row[j] = 0;
    }
    solution[i] = row;
  }
  //solution[0][0] = 1;
  var board = new Board(solution);
  //var board = new Board(n);
  var solver = (row) => {
    if (row === n) {
      //console.log(board);
      //return board;
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
  };
  solver(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
