class Matrix_test_1D {
  constructor(size, A, B) {
    this.elements = (size ** 2) + size;
    this.size = size;
    this.width = size + 1;
    this.height = size;
    this.flattenInput = this._formatInput(A, B);
    this.solve();
  }

  solve() {
    let result = [];
    let start = performance.now();

    let matrix = this._triangularRepr();

    if (matrix) {
      result = this._substitution(matrix);
    }

    let end = performance.now();

    let effectiveTime = end - start;

    console.log(this._iterationsNumber());
    console.log(`time: ${effectiveTime}`);
    console.log(result);
  }

  _formatInput(A, B) {
    let j = 0;
    let flatten = A;
    for (let i = this.height; i < this.elements; i += this.width) {
      flatten.splice(i, 0, B[j++]);
    }
    return flatten;
  }

  _swapRows(rowIdx, rowToSwapIdx, matrix) {
    let temp = 0;

    for (let i = 0; i < this.width; i++) {
      temp = matrix[rowIdx];
      matrix[rowIdx++] = matrix[rowToSwapIdx];
      matrix[rowToSwapIdx++] = temp;
    }
    return matrix;
  }

  _isSwappable(start, columnToCheck, matrix) {

    for (let i = start; i < this.height; i++) {
      let idx = (i * this.width) + columnToCheck;
      if (matrix[idx] !== 0) {
        return i;
      }
    }
    return false;
  }

  _iterationsNumber() {
    let result = 0;
    let x = this.width;
    for (let i = this.height - 1; i > 0; i--) {
      result += x * i;
      x--;
    }
    return result;
  }

  _triangularRepr() {
    let matrix = this.flattenInput;
    let columnToNullify = 0;
    let row = 0;
    let el = this.width;
    let elementToNulify = matrix[el];

    let diagonalElement = (columnToNullify * this.width) + columnToNullify;

    for (let it = 0; it <= this._iterationsNumber(); it++) {

      if (row === 0) {
        if (matrix[0] === 0) {
          let rowToSwap = this._isSwappable(row + 1, columnToNullify, matrix);
          if (!rowToSwap) {
            return null;
          }
          this._swapRows(row * this.width, rowToSwap * this.width, matrix);
        }
        row++;

      } else {

        let idx = (columnToNullify * this.width) + columnToNullify;
        let diagonalElement = matrix[idx];

        if (!diagonalElement) {
          let rowToSwap = this._isSwappable(row + 1, columnToNullify, matrix);
          if (!rowToSwap) {
            return null;
          }
          this._swapRows(row * this.width, rowToSwap * this.width, matrix);
          diagonalElement = matrix[idx];
        }

        if (el === (row * this.width) + columnToNullify) {
          elementToNulify = matrix[el];
          matrix[el] = 0;
        } else {
          matrix[el] -= (elementToNulify / diagonalElement) *
            matrix[(columnToNullify * this.width) + (el % this.width)];
        }

        el++;

        if (el % this.width === 0) {
          row++;
          if (row % this.height === 0) {
            columnToNullify++;
            row = columnToNullify + 1;
          }
          el = (row * this.width) + columnToNullify;
        }
      }
    }
    return matrix;
  }

  _detTriangular(matrix) {
    let result = 1;
    for (let i = 0; i < this.height; ++i) {
      result *= matrix[(i * this.width) + i];
    }
    return result;
  }

  _substitution(matrix) {
    if (this._detTriangular(matrix) !== 0) {

      let results = new Array(this.height);

      for (let i = this.height - 1; i > -1; i--) {

        results[i] = matrix[this.height + (this.width * i)] /
          matrix[(this.width * i) + i];

        for (let j = i - 1; j > -1; j--) {

          matrix[(j * this.width) + this.height] -= matrix[(j * this.width) +
          i] * results[i];

        }
      }
      return results;
    } else {
      return false;
    }
  }

}

