const calculator = (function(){
    function add(stringNumbers){
      if(stringNumbers === ''){
        return 0
      }
      const delimiter = getDelimiter(stringNumbers)
      const formatValues = formatString(stringNumbers)
      console.log('the delimiter: ',delimiter)
      console.log('the formatted values: ',formatValues)
      return calculatedSum(getNumbers(formatValues, delimiter))
    }
      //formatting to digits and char
      function formatString(items){
        const reg = /^(\/\/.*\n)/
        const results = reg.exec(items)
          if(results && results.length > 0){
            console.log('results array :',results)
          return items.replace(reg, '')
          }
          return items
      }
      //getting expression to split by 
      function getDelimiter(items){
        const delimiters =[];
        const multipleDelimiterRegexp = /(?:^\/\/)?\[([^\[\]]+)\]\n?/g
        let matches = multipleDelimiterRegexp.exec(items)
        while(matches !== null){
            delimiters.push(matches[1]) 
            matches = multipleDelimiterRegexp.exec(items)
            console.log('return null to break loop: ',matches)
          }
          if(delimiters.length > 0){
            console.log('delimiters: ',delimiters)
            return new RegExp('['+delimiters.join('')+']')
          }
          matches = /^\/\/(.*)\n/.exec(items)
          if(matches && matches[1]){
            console.log('matches without multidelimiters: ', matches)
            return matches[1]
          } 
          return /[\n,]/
        }
        //change strings types to int
        function getNumbers(items, delimiter){
          return items.split(delimiter)
          .filter(n => n !== '')
          .map(n => parseInt(n))
        }
        //add numbers array of int
        function calculatedSum(numbers){
          console.log('int\'s passed to calSum:', numbers)
          const negatives =[]
          const total = numbers.reduce((sum, n)=> {
            //skip numbers over 1000
              if(n > 1000){
                console.log('numbers > 1000 don\'t count')
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
//examples tests 
// console.info('test one with empty string: ',calculator.add('')) // 0
// console.info('test two string with numbers comma separated :', calculator.add('1,2,3')) // 6
// // console.info('test four ',calculator.add('//;\n1;2;3')) //6
// console.info('test eight ', calculator.add('//[..][%%]\n1..2%%3')) // 6

// console.info('test three string newline & special characters:',calculator.add('//;\n1;3;4')) // 8
// console.info('test five ', calculator.add('1001,2')) // 2
// console.info('test six ', calculator.add('//[**]\n1**2**3')) // 6
// console.info('test seven ', calculator.add('//[*][%]\n1*2%3')) // 6
// console.info('test nine ', calculator.add('-1,-3,2')) // 2