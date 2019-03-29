

/**
 * Transform the matrix into a triangular one 
 * WARNING : Replace the given matrix
*/
function toTriangularMatrix(matrix){

    let matrixLength = matrix.length;

    for(let columnToNullify=0; columnToNullify<matrixLength; columnToNullify++){
        for(let row=columnToNullify+1; row<matrixLength; row++){
            let diagonal = matrix[columnToNullify][columnToNullify];
            if(diagonal == 0)
            {
                //swapRow(matrix, columnToNullify)
                diagonal = matrix[columnToNullify][columnToNullify];
                if(diagonal == 0)
                {
                    return null;
                }
            }
            let elementToNullify = matrix[row][columnToNullify];
            //console.log("Element to null : " + row + columnToNullify);
            matrix[row][columnToNullify] = 0;
            for(let column=columnToNullify+1; column < matrixLength + 1; column++){
                //console.log(matrix[row][column]);
                matrix[row][column] -= (elementToNullify / diagonal) * matrix[columnToNullify][column];
                //console.log(elementToNullify/diagonal  * matrix[columnToNullify][column]);
            }

        }
    }

    return matrix;
}


/**
 * Calculate the determinant for a triangular matrix
*/
function detTriangular(matrix){
    let result = 1;
    for(let i = 0; i < matrix.length; ++i){
        result *= matrix[i][i];
    }

    return result;
}

/**
 *  Solve the triangular matrix to return the X vector
 */
function substitution(matrix)
{
    //solve upper triangular matrix
    if(detTriangular != 0)
    {
        let n =matrix.length;
        let x = new Array(n);
        for (let i=n-1; i>-1; i--) {
            x[i] = matrix[i][n]/matrix[i][i];
            for (let k=i-1; k>-1; k--) {
                matrix[k][n] -= matrix[k][i] * x[i];
            }
        }
        return x;
    }
    else
    {
        return undefined;
    }
}

/**
 * Permet de résoudre la matrice récupérer du fichier .json
 */
function solve(matrix)
{
    let effectiveTime;
    try {
        let timeAtStart = performance.now();
        toTriangularMatrix(matrix);
        let x = [];
        if(matrix)
        {
            x = substitution(matrix);
        }
        let timeAtEnd = performance.now();
        effectiveTime = timeAtEnd-timeAtStart;
        console.log("time",effectiveTime.toFixed(3)+"ms");
        console.log("Solution Matrix " + x);
    } catch (e) {
        console.log("ERROR");
        console.log(e);
    }
    
}


let matrix = Array(3);
for(let i=0; i<matrix.length; ++i){
    matrix[i] = Array(matrix.length + 1);
}

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
solve(matrix);