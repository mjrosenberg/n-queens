// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var numItems = 0;
      for (item of row) {
        numItems += item;
      }
      return (numItems > 1);
    },
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var ans = false;
      for (var i = 0; i < this.get('n'); i++) {
        ans = this.hasRowConflictAt(i);
        if (ans === true) {
          return true;
        }
      }
      return ans; // doing this so it continues to run if there is not a conflict on row 1
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var numItems = 0;
      for (var i = 0; i < this.get('n'); i++) {
        var row = this.get(i);
        numItems += row[colIndex];
      }
      return (numItems > 1);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var ans = false;
      for (var i = 0; i < this.get('n'); i++) {
        ans = this.hasColConflictAt(i);
        if (ans === true) {
          return true;
        }
      }
      return ans;
    },



    // Major Diagonals - go from top-left to bottom-right
    //[[0,0,0]
    // [1,0,0]
    // [0,1,0]]
    // --------------------------------------------------------------
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      var extra = 0; //adding this varaible so I can start my loop on a lower down row if that is where the diagonal's top left corner is.
      while (extra < this.get('n')) { //checks all diagonals starting at given index in each row, thus accounting for lower ones
        var numItems = 0; //reset the count for a new diagonal
        for (var i = 0; i < this.get('n'); i++) {
          if (i + extra >= this.get('n')) { //make sure we are not exceeding the size limit
            continue;
          }
          var row = this.get(i + extra);
          if (majorDiagonalColumnIndexAtFirstRow + i < row.length && row[majorDiagonalColumnIndexAtFirstRow + i] === 1) {
            numItems += 1;
          }
        }
        extra ++; //incrementing the while loop so it will check the next row
        if (numItems > 1) { //returning true (and thus ending the loop) if we find a conflict
          return true;
        }
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var ans = false;
      for (var j = 0; j < this.get('n'); j++) {
        ans = this.hasMajorDiagonalConflictAt(j);
        if (ans === true) {
          return true;
        }
      }
      return ans;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var extra = 0; //adding this varaible so I can start my loop on a lower down row if that is where the diagonal's top left corner is.
      while (extra < this.get('n')) { //checks all diagonals starting at given index in each row, thus accounting for lower ones
        var numItems = 0; //reset the count for a new diagonal
        for (var i = 0; i < this.get('n'); i++) {
          if (i + extra >= this.get('n')) { //make sure we are not exceeding the size limit
            continue;
          }
          var row = this.get(i + extra);
          if (minorDiagonalColumnIndexAtFirstRow - i < row.length && row[minorDiagonalColumnIndexAtFirstRow - i] === 1) {
            numItems += 1;
          }
        }
        extra ++; //incrementing the while loop so it will check the next row
        if (numItems > 1) { //returning true (and thus ending the loop) if we find a conflict
          return true;
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var ans = false;
      for (var j = 0; j < this.get('n'); j++) {
        ans = this.hasMinorDiagonalConflictAt(j);
        if (ans === true) {
          return true;
        }
      }
      return ans;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
