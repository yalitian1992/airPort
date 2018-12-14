export default{
  isEmpty (val) {
    if (val === '' || val === undefined || val === null) return true
    if (val instanceof Array && val.length === 0) {
      return true
    } else if (val instanceof Object && Object.keys(val).length === 0) {
      return true
    }
    return false
  }
}
