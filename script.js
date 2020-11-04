
const calculator = (function(){

    function add(stringNumbers){
      if(stringNumbers === ''){
        return 0
      }
      const delimiter = getDelimiter(stringNumbers)
      const formatValues = stringToArray(stringNumbers)
      return calculatedSum(getNumbers(formatValues, delimiter))
    }
      // formatting items only numbers
      function stringToArray(items){
        //search from start skip line breaks 
        const reg = /^(\/\/.*\n)/
        const results = reg.exec(items)
          if(results && results.length > 0){
          return items.replace(reg, '')
          }
          return items
      }

      //delimiter 
      function getDelimiter(items){
        const delimiters =[];
        const multipleDelimiterRegexp = /(?:^\/\/)?\[([^\[\]]+)\]\n?/g

        let matches = multipleDelimiterRegexp.exec(items)
          while(matches !== null){
            delimiters.push(matches[1])
            matches = multipleDelimiterRegexp.exec(items)
          }
          if(delimiters.length > 0){
            return new RegExp('['+delimiters.join('')+']')
          }
          matches = /^\/\/(.*)\n/.exec(items)
          if(matches && matches[1]){
            return matches[1]
          }
          return /[\n,]/
      }

        //change strings types to Number types with parse
        function getNumbers(items, delimiter){
          return items.split(delimiter)
            .filter(n => n !== '')
            .map(n => parseInt(n))
        }

        //add numbers without special characters 
        function calculatedSum(numbers){
          const negatives =[]
          const total = numbers.reduce((sum, n)=> {
            //skip numbers over 1000
              if(n > 1000){
                    return 0;
              }
              //skip negative numbers 
              if(n < 0){
                negatives.push(n)
                  return 0;
              }
              return sum + n
              }, 0)
              if (negatives.length > 0){
                console.error('negatives not allowed')
              }
              return total;
        }
      return{add}
}())

// console.info(calculator.add('')) // 0
// console.info(calculator.add('1,2,3')) // 6
// console.info(calculator.add('//;\n1;3;4')) // 8
// console.info(calculator.add('//;\n1;2;3')) //6
// console.info(calculator.add('1001,2')) // 2
// console.info(calculator.add('//[**]\n1**2**3')) // 6
// console.info(calculator.add('//[*][%]\n1*2%3')) // 6
// console.info(calculator.add('//[..][%%]\n1..2%%3')) // 6
// console.info(calculator.add('-1,-3,2')) // 2