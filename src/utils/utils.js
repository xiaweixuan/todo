export function sleep(time) {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, time || 500)
  })
}

export function getTodos() {
  try {
    const todos = localStorage.getItem('fre_todo_list')
    if (todos) {
      return JSON.parse(todos)
    } else {
      const inital = { byId: {}, allIds: [] }
      setTodos(inital)
      return inital
    }
  } catch (error) {
    return
  }
}

export function setTodos(todos) {
  try {
    localStorage.setItem('fre_todo_list', JSON.stringify(todos))
  } catch (error) {
    throw Error('存储todos失败')
  }
}