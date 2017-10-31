
/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (data, id = 'id', pid = 'pid', children = 'children') => {
  if (Object.prototype.toString.call(data) !== '[object Array]') {
    throw TypeError('the parameter: data is not an array!')
  }

  let result = []
  let idData = {}

  data.map(item => {
    idData[item[id]] = item
  })

  data.map(item => {
    let pidData = idData[item[pid]]

    if (pidData) {
      if (!pidData[children]) {
        pidData[children] = []
      }
      pidData[children].push(item)
    } else {
      result.push(item)
    }
  })

  return result
}
