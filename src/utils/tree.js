export function seekTree(tree, id) {
  if (!tree || !tree.length) return null
  let i = 0
  while (i < tree.length) {
    if (tree[i].id === id) return tree[i]
    if (tree[i].children) {
      const node = seek(tree[i].children, id)
      if (node) return node
    }
    i++
  }
  return null
}

function deepCopy(arr) {
  try {
    return JSON.parse(JSON.stringify(arr))
  } catch (e) {
    return arr
  }
}

export function toTree(allIds, parId) {
  const obj = {}
  const result = []
  const list = deepCopy(allIds)
  list.map(el => {
    obj[el.id] = el
  })
  for (let i = 0, len = list.length; i < len; i++) {
    const id = list[i].parentId
    if (id == parId) {
      result.push(list[i])
      continue
    }
    if (obj[id].children) {
      obj[id].children.push(list[i])
    } else {
      obj[id].children = [list[i]]
    }
  }
  return result
}