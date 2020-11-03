let stringNumbers="8,0,\n1,5";

const calculator = (function(){

    function add(stringNumbers){
        if(stringNumbers === ''){
          return 0
        }
        const formatValues = stringToArray(stringNumbers)
        return calculatedSum(getNumbers(formatValues))
      }
       // formatting items only numbers
        function stringToArray(items){
            //search from start skip line breaks and 
            const reg = /^(\/\/.*\n)/
            const results = reg.exec(items)
            if(results && results.length > 0){
            return items.replace(reg, '')
            }
            return items
        }
          //change strings types to Number types with parse
            function getNumbers(items){
                return items.split('')
                .map(n => parseInt(n))
            }

            function calculatedSum(numbers){
                const negatives =[]
                const total = numbers.reduce((sum, n)=> {
                  if(n > 1000){
                    return 0;
                  }
                  if(n < 0){
                    negatives.push(n)
                    return 0;
                  }
                  return sum + n
                }, 0)
                if (negatives.length > 0){
                  console.error('negatives not allowed, ', negatives.join(','))
                }
                return total;
              }


      return{add}
}())