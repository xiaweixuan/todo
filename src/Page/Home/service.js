import request from '../../utils/request'
import { getTodos, setTodos } from '../../utils/utils'

export async function queryTodos() {
  const { byId, allIds } = { byId: {}, allIds: [] }
  try {
    const todos = getTodos()
    if (todos) {
      todos.forEach(item => {
        byId[item.id] = item
        allIds.push({ id: item.id, parentId: item.parentId })
      })
    }
  } catch (error) {
    console.log(error)
  }
  return { byId, allIds }
}

export async function createTodo(parentId, dto) {
  try {
    const todos = getTodos()
    const id = (new Date()).getTime()
    setTodos([...todos, { id, finished: false, content: dto.content, parentId }])
    return { id, finished: false, content: dto.content }
  } catch (error) {
    return
  }
}

export async function updateTodo(id, dto) {
  try {
    const todos = getTodos()
    const index = todos.findIndex(i => i.id == id)
    if (index === -1) return
    todos[index].content = dto.content
    todos[index].finished = dto.finished
    setTodos(todos)
    return todos[index]
  } catch (error) {
    return
  }
}

export async function deleteTodo(id) {
  try {
    const todos = getTodos()
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
    const delList = find(todos, id)
    setTodos(todos.filter(i => !delList.includes(i.id)))
    return delList
  } catch (error) {
    return []
  }
}