/**
 * Transform the matrix into a triangular one
 * WARNING : Replace the given matrix
 */
function toTriangularMatrix(matrix) {

  let matrixLength = matrix.length;

  for (let columnToNullify = 0; columnToNullify < matrixLength; columnToNullify++) {
    for (let row = columnToNullify + 1; row < matrixLength; row++) {
      let diagonal = matrix[columnToNullify][columnToNullify];
      if (diagonal == 0) {
        if (columnToNullify < matrixLength - 1) {
          matrix = swapRow(matrix, columnToNullify);
          diagonal = matrix[columnToNullify][columnToNullify];
        }
        if (diagonal == 0) {
          return null;
        }
      }
      let elementToNullify = matrix[row][columnToNullify];
      matrix[row][columnToNullify] = 0;
      for (let column = columnToNullify + 1; column < matrixLength + 1; column++) {
        matrix[row][column] -= (elementToNullify / diagonal) * matrix[columnToNullify][column];
      }
    }
  }
  // console.log("old:");
  // console.log(matrix);

  return matrix;
}

function swapRow(matrix, indexRow) {
    for (let i = 0; i < matrix.length; i++) {
        let temp = matrix[i][indexRow];
        matrix[i][indexRow] = matrix[i][indexRow+1];
        matrix[i][indexRow+1] = temp;
    }
    return matrix;
}

/**
 * Calculate the determinant for a triangular matrix
 */
function detTriangular(matrix) {
  let result = 1;
  for (let i = 0; i < matrix.length; ++i) {
    result *= matrix[i][i];
  }

  return result;
}

/**
 *  Solve the triangular matrix to return the X vector
 */
function substitution(matrix) {
  //solve upper triangular matrix
  if (detTriangular != 0) {
    let n = matrix.length;
    let x = new Array(n);
    for (let i = n - 1; i > -1; i--) {
      x[i] = matrix[i][n] / matrix[i][i];
      for (let k = i - 1; k > -1; k--) {
        matrix[k][n] -= matrix[k][i] * x[i];
      }
    }
    return x;
  } else {
    return undefined;
  }
}

/**
 * Solve a matrix from a file .json
 */
function resolveMatrix(matrix) {
  let effectiveTime;

  let timeAtStart = performance.now();
  matrix = toTriangularMatrix(matrix);

  if (matrix != null) {
    let result = [];
    if (matrix) {
      result = substitution(matrix);
    }
    let timeAtEnd = performance.now();
    effectiveTime = timeAtEnd - timeAtStart;

    // console.log('Solution Matrix ' + result);
    displayArray('resultBody', result);

  } else {
    let timeAtEnd = performance.now();
    effectiveTime = timeAtEnd - timeAtStart;
    display('resultBody', 'Aucunes solutions');
  }

  // console.log('time', effectiveTime.toFixed(3) + 'ms');
  display('time', effectiveTime.toFixed(3) + 'ms');
}

/*
 *
 */
function solve() {
  //Retrieve the first (and only!) File from the FileList object
  let f = document.getElementById('idFile').files[0];
  if (f) {
    var r = new FileReader();
    r.onload = function (e) {
      var contents = JSON.parse(e.target.result);
      matrix = formatMatrix(contents['n'][0], contents['A'], contents['B']);
      resolveMatrix(matrix);
    };
    r.readAsText(f);
  } else {
    alert('Failed to load file');
  }
}

/*
 * format the matrix in a array
 */
function formatMatrix(n, A, B) {
  let matrix = createMatrix(n);
  let count = 0;
  for (let i = 0; i < A.length; i++) {
    if (i % n == 0 && i != 0) {
      matrix[count][n] = B[count];
      count++;
    }
    matrix[count][i % n] = A[i];
  }
  matrix[count][n] = B[count];
  return matrix;
}

/*
 * create and return a matrix empty. (n+1, n)
 */
function createMatrix(n) {
  let matrix = Array(n);
  for (let i = 0; i < matrix.length; ++i) {
    matrix[i] = Array(matrix.length + 1);
  }
  return matrix;
}

/*
 *Display text in element (id)
 */
function display(id, text) {
  let element = document.getElementById(id);
  element.innerHTML = text;
}

/*
 * Display array in element(id)
 */

function displayArray(id, array) {
  let table = document.getElementById(id);
  table.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    let row = table.insertRow(i);
    let cellIndex = row.insertCell(0);
    let cellValue = row.insertCell(1);
    cellIndex.innerHTML = i + 1;
    cellValue.innerHTML = array[i].toFixed(3);
  }
}

matrix = createMatrix(3);

matrix[0][0] = 3;
matrix[0][1] = 4;
matrix[0][2] = -1;
matrix[1][0] = 1;
matrix[1][1] = -1;
matrix[1][2] = 2;
matrix[2][0] = 2;
matrix[2][1] = 3;
matrix[2][2] = 4;
matrix[0][3] = 23;
matrix[1][3] = 3;
matrix[2][3] = 7;

//console.log(matrix);
resolveMatrix(matrix);
