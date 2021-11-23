import request from '../../utils/request'
import { getTodos, setTodos } from '../../utils/utils'

export async function queryTodos() { 
  try {
    const todos = getTodos()
    if (todos) return todos
  } catch (error) {
    return { byId: {}, allIds: [] }
  }
}

export async function createTodo(parentId, dto) {
  try {
    const { byId, allIds } = getTodos()
    const id = (new Date()).getTime()
    byId[id] = { id, finished: false, content: dto.content }
    allIds.push({ id, parentId })
    setTodos({ byId, allIds })
    return { id, finished: false, content: dto.content }
  } catch (error) {
    return
  }
}

export async function updateTodo(id, dto) {
  try {
    const { byId, allIds } = getTodos()
    const curNode = byId[id]
    if (!curNode) return
    curNode.content = dto.content
    curNode.finished = dto.finished
    setTodos({ byId, allIds })
    return curNode
  } catch (error) {
    return
  }
}

export async function deleteTodo(id) {
  try {
    const { byId, allIds } = getTodos()
    function find(list, delId) {
      const delList = []
      const curNode = list.filter(it => delId === it.id)[0]
      if (!curNode) return []
      delList.push(curNode.id)
      const sList = list.filter(it => curNode.id === it.parentId)
      sList.forEach(item => {
        delList.push(...find(list, item.id))
      })
      return delList
    }
    const delList = find(allIds, id)
    setTodos({ byId, allIds: allIds.filter(item => !delList.includes(item.id)) })
    return delList
  } catch (error) {
    return []
  }
}