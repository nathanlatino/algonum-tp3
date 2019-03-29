

/*
 * Transforme la matrice en matrice triangulaire SI POSSIBLE
 * Sinon retourne null
*/
function toTriangularMatrix(matrix){

    let matrixLength = matrix.length;

    for(let columnToNullify=0; columnToNullify<matrixLength; columnToNullify++){
        for(let row=columnToNullify+1; row<matrixLength; row++){
            let diagonal = matrix[columnToNullify][columnToNullify];
            let elementToNullify = matrix[row][columnToNullify];
            console.log("Element to null : " + row + columnToNullify);
            matrix[row][columnToNullify] = 0;
            for(let column=columnToNullify+1; column < matrixLength + 1; column++){
                console.log(matrix[row][column]);
                matrix[row][column] -= (elementToNullify / diagonal) * matrix[columnToNullify][column];
                console.log(elementToNullify/diagonal  * matrix[columnToNullify][column]);

            }

        }
    }

    return matrix;
}


/*
 * Permet de calculer le déterminant dans le cas où la matrice est triangulaire.
*/
function detTriangular(matrix){
    let result = 1;
    for(let i = 0; i < matrix.length; ++i){
        result *= matrix[i][i];
    }

    return result;
}


let matrix = Array(3);
for(let i=0; i<matrix.length; ++i){
    matrix[i] = [i+1, i+5, i+4, i+10];
}

//console.log(matrix);
console.log(toTriangularMatrix(matrix));

console.log(detTriangular(matrix));