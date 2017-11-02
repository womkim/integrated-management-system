export const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]'
/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (data, id = 'id', pid = 'pid', children = 'children') => {
  if (!isArray(data)) {
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

export const findIds = (data, id = 'id') => {
  let ids = []
  if (data[id]) {
    ids.push(data[id])
  }
  if (data.children && isArray(data.children)) {
    data.children.map(item => {
      ids.push(...findIds(item, id))
    })
  }
  return ids
}
