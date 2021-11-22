import { h, useEffect, useReducer, useCallback, useMemo, useState } from 'fre'
import { toTree } from '../../utils/tree'
import { queryTodos, deleteTodo, updateTodo, createTodo } from './service'

const reducer = (state, action) => {
  const { byId, allIds } = state
  switch (action.type) {
    case 'saveState':
      return action.payload
    case 'addItem':
      byId[action.payload.node.id] = action.payload.node
      return { byId, allIds: [...allIds, { id: action.payload.node.id, parentId: action.payload.parentId }] }
    case 'updateItem':
      byId[action.payload.id] = action.payload
      return { byId, allIds }
    case 'removeItem':
      return {
        ...state,
        allIds: allIds.filter((item) => !action.payload.includes(item.id))
      }
    default:
      return state
  }
}

export default function () {
  const [state, dispatch] = useReducer(reducer, { byId: {}, allIds: [] }) // id, parentId
  const { byId, allIds } = state

  useEffect(async () => {
    const tree = await queryTodos()
    dispatch({ type: 'saveState', payload: tree })
  }, [])

  const todoTree = useMemo(() => {
    function loop(tree) {
      return tree.map(item => {
        if (item.children) {
          item.children = loop(item.children)
        }
        return { ...byId[item.id], ...item }
      })
    }
    return loop(toTree(allIds, -1))
  }, [state])

  const onAdd = useCallback(
    async (parentId, dto) => {
      const newNode = await createTodo(parentId, dto)
      if (newNode) {
        dispatch({ type: 'addItem', payload: { parentId, node: newNode } })
      }
    }, [dispatch],
  )

  const onUpdate = useCallback(
    async (id, dto) => {
      const curNode = await updateTodo(id, dto)
      if (curNode) {
        dispatch({ type: 'updateItem', payload: curNode })
      }
    }, [dispatch],
  )

  const onRemove = useCallback(
    async (id) => {
      const relList = await deleteTodo(id)
      if (relList.length) {
        dispatch({ type: 'removeItem', payload: relList })
      }
    }, [dispatch],
  )

  return { todoTree, onAdd, onUpdate, onRemove }
}