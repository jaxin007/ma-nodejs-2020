const text = 'Hello World!';

function position (string, symbol) {
  let position = string.indexOf(symbol);
  
  console.log(string.indexOf(symbol) + 1);

  for (let count = 0; position != -1; count ++) {
    position = string.indexOf(symbol, position + 1);

    if (position !== -1) {                          //Delete -1 from console.log
      console.log(position + 1);
    }                                              // -=-        
  }
}

position(text, 'o');

const textWithoutL = text.replace(/l/g, '');
console.log(textWithoutL);