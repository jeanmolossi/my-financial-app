export function parseToCurrency(value: string): string {
  if(value.length<=2){
    return `0,${value.padStart(2, '0')}`;
  }

  const cents = value.substr(-2,2);

  const resolved_total = Array.from(value.slice(0, value.length - 2))
    .reverse()
    .map((digit, index) => {
      if((index % 3) === 0 && index > 1){
        return `${digit}.`;
      }

      return `${digit}`;
    })
    .reverse()
    .join('');


  return `${resolved_total},${cents}`
}

export function parseCurrencyInputToNumber(value: string): string {
  let incommingValue = value;

  if(!(new RegExp(/,/).test(value))){
    incommingValue = `${value},00`;
  }

  const centValue = incommingValue.replace(/([a-zA-Z]|\$|( )|,|\.)+/gim,'')
  return centValue;
}