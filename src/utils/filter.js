/**
 * 省略多余字符，用...显示
 * @param {String} value
 * @param {number} len
 */
 export function ellipsis(value, len) {
  if (!value) return ''
  if (value.length > len) {
    return value.slice(0, len) + '...'
  }
  return value
}

//时间转换
export function transformTimestamp(timestamp){
  let a = new Date(timestamp).getTime();
  const date = new Date(a);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '  ';
  const h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  const m = (date.getMinutes() <10 ? '0'+date.getMinutes() : date.getMinutes()) + ':' ;
  const s = (date.getSeconds() <10 ? '0'+date.getSeconds() : date.getSeconds()); // 秒
  const dateString = Y + M + D + h + m + s;
  // console.log('dateString', dateString); // > dateString 2021-07-06 14:23
  return dateString;
}
