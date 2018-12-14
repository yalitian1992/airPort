// 字符串日期（如20180309）格式化为2018-03-09
export default function formatDate (date) {
  if (date.length >= 8) {
    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)
    const result = `${year}-${month}-${day}`
    return result
  }
  if (date.length === 6) {
    const year = date.slice(0, 4)
    const month = date.slice(4, 5)
    const day = date.slice(5, 6)
    const result = `${year}-${`0${month}`}-${`0${day}`}`
    return result
  }

  return ''
}
