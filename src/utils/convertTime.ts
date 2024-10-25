export const convertTime = (val: number) => {
  let min = Math.floor(val / 60)
  let sec = Math.floor(val - min * 60)

  let minStr = min.toString()
  let secStr = sec.toString()
  let msStr: string | number | string[]
  if (val.toString().includes('.')) {
    msStr = val.toString().split('.')
    msStr = msStr[1]
    if (msStr.length === 1) msStr = msStr + '00'
    if (msStr.length === 2) msStr = msStr + '0'
    if (msStr.length > 3) msStr = msStr[0] + msStr[1] + msStr[2]
  }
  else msStr = '000'

  if (minStr.length < 2) minStr = '0' + minStr
  if (secStr.length < 2) secStr = '0' + secStr

  return `${minStr}:${secStr}:${msStr}`
}