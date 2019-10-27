const first = [1, 2, 3, 4, 5];
const second = [6, 7, 8, 9, 0];

function mirrorConcate (arr1, arr2) {
    let a = arr1.reverse();
    let b = arr2.reverse();
    let c = [];
    
    for (let i = 0; i < a.length; i++) {
        c.push(a[i]);
        c.push(b[i]);
    }

    return c;
}

const result = mirrorConcate(first, second);
console.log(result);