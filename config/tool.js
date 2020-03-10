export const formatData = function(b){
  let remainingTime = ''
  remainingTime += b[0] + '-'
  remainingTime += b[1] + '-'
  remainingTime += b[2] + ' '
  remainingTime += b[3] + ':'
  remainingTime += b[4] + ':'
  remainingTime += b[5] ? b[5] : '0'
  return remainingTime
}

export const formatData2 = function(b){
  let remainingTime = ''
  remainingTime += b[0] >= 10 ? b[0] + ':' : '0' + b[0] + ':'
  remainingTime += b[1] >= 10 ? b[1] + ':' : '0' + b[1] + ':'
  remainingTime += b[2] ? (b[2] > 10 ? b[2] : '0' + b[2]) : '00'
  return remainingTime
}

export const formatData3 = function(b){
  let remainingTime = ''
  remainingTime += b[0] >= 10 ? b[0] + '-' : '0' + b[0] + '-'
  remainingTime += b[1] >= 10 ? b[1] + '-' : '0' + b[1] + '-'
  remainingTime += b[2] ? (b[2] > 10 ? b[2] : '0' + b[2]) : '00'
  return remainingTime
}

export const formatData4 = function(b){
  let remainingTime = ''
  remainingTime += b[0] + '/'
  remainingTime += b[1] + '/'
  remainingTime += b[2] + ' '
  remainingTime += b[3] + ':'
  remainingTime += b[4] + ':'
  remainingTime += b[5] ? b[5] : '0'
  return remainingTime
}

// 格式化数字格式成为10,000.2333
export const toThousands = function(p) {
  let num = p // 防止引用类型
  // console.log('toThousands', num)
  let result = '', counter = 0;
  num = (num || 0).toString();
  let point = num.indexOf('.')
  let temp1 = ''
  if ( point !== -1) {
    let len = num.length
    temp1 = num.slice(point, len)
    num = num.slice(0, point)
  }
  // console.log('toThousands NoPointer', num)
  for (let i = num.length - 1; i >= 0; i--) {
    counter++;
    result = num.charAt(i) + result;
    if (!(counter % 3) && i !== 0) { result = ',' + result; }
  }
  // console.log('toThousands Result', result + temp1)
  return result + temp1;
}
