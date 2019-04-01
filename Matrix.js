class Matrix {
  constructor(size, A, B) {
    this.size = size;
    this.matrix = this._initMatrix(A, B);
    this.time = null;
    this.solved = this.solve();
  }

  static _swapRows(matrix, i, j) {
    let temp = matrix[i];
    matrix[i] = matrix[j];
    matrix[j] = temp;
  }

  solve() {
    let start = performance.now();
    let result = this._compute(this.matrix);
    this.time = performance.now() - start;
    return result;
  }

  _initMatrix(A, B) {
    let matrix = [];
    for (let i = 0; i < this.size; ++i) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        row.push(A[i * this.size + j]);
      }
      row.push(B[i]);
      matrix.push(row);
    }
    return matrix;
  }

  _compute(matrix) {
    let i = 0;
    let validRow = this._findFirstValidRow(matrix, i);
    if (validRow !== i) {
      Matrix._swapRows(matrix, validRow, i);
    }

    for (let i = 0; i < this.size; i++) {

      for (let j = i + 1; j < this.size; j++) {
        let a = matrix[i][i];
        let b = matrix[j][i];

        if (b !== 0) {
          for (let k = i; k <= this.size; k++) {
            matrix[j][k] = matrix[j][k] / b - matrix[i][k] / a;
          }
        }
      }
    }

    let n = matrix.length;
    let X = new Array(n);

    for (let i = n - 1; i > -1; i--) {
      X[i] = matrix[i][n] / matrix[i][i];
      for (let k = i - 1; k > -1; k--) {
        matrix[k][n] -= matrix[k][i] * X[i];
      }
    }
    return X;
  }

  _findFirstValidRow(matrix, i) {
    let j = i;
    while (j < this.size) {
      if (matrix[j][i] !== 0) {
        return j;
      }
      j++;
    }
    // without valid row, should return this.size + 1
    return j;
  }

}


