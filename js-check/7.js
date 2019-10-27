const vegetables = ['potato', 'tomato', 'cucumber'];
const fruits = ['apple', 'pineapple', 'banana'];

console.log ('\nIf: ');

if (vegetables.includes('cucumber')) {
    console.log ('cucumber belong to vegetables: ', vegetables);
} else if (fruits.includes('cucumber')) {
    console.log ('cucumber belong to fruits: ', fruits);
}

console.log ('\nSwitch-Case: ');

switch (vegetables.includes('cucumber')) {
    case true:
        console.log('cucumber belong to vegetables: ', vegetables);
        break;
    case false:
        console.log('cucumber belong to fruits: ', fruits);
}