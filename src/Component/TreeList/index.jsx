import { h, Fragment, useEffect, useState, useRef } from 'fre'
import { Dots, Add, Remove, Finish, Todo, Close, Open } from '../../utils/svg'
import Input from '../Input'
import CreateTreeItem from './CreateTreeItem'

function TreeItem({ cell, onClick, isCollapsed, setIsCollapsed, editabled, onCreate }) {
  const [editable, setEditable] = useState(editabled || false)

  const handleKey = (e) => {
    if (e.keyCode !== 13) return
    onClick(
      e.target.value ?
        { action: 3, id: cell.id, dto: { ...cell, content: e.target.value } } :
        { action: 2, id: cell.id }
    )
    setEditable(false)
  }
  const handleBlur = (e) => {
    !setEditable(false)
  }
  return <section class="my-1">
    <div class="relative group">
      <div class="inline-block min-w-300 cursor-pointer group-hover:shadow">
        <div onClick={() => !editable && setEditable(true)} class="relative flex items-center">
          <div class={`absolute left-2 rounded-full w-2 h-2 ${cell.finished ? 'bg-green-500' : 'bg-blue-500'}`}></div>
          <div class={`py-3 px-6 ${cell.finished ? 'line-through' : ''}`}>{
            editable ?
              <Input onBlur={handleBlur} onKeyPress={handleKey} defaultValue={cell.content} /> :
              cell.content
          }</div>
          {cell.children && isCollapsed && <Dots />}
        </div>
      </div>
      <div
        onClick={() => onClick && onClick({ action: 3, id: cell.id, dto: { ...cell, finished: !cell.finished } })}
        class="inline-block w-4 h-3 cursor-pointer transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-4"
      >
        {cell.finished ? <Todo /> : <Finish />}
      </div>
      {/* <div
        onClick={onCreate}
        class="inline-block w-4 h-3 cursor-pointer transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-5"
      >
        <Add />
      </div> */}
      <div
        onClick={() => onClick && onClick({ action: 2, id: cell.id })}
        class="inline-block w-4 h-3 cursor-pointer transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-6"
      >
        <Remove />
      </div>
      {cell.children && <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        class="inline-block w-4 h-3 cursor-pointer transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-7"
      >
        {isCollapsed ? <Open /> : <Close />}
      </div>}
    </div>
  </section>
}

function TreeList({ tree, onClick }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [visible, setVisible] = useState(false)

  const handleClick = (val) => {
    const { action } = val
    if (action === 1) {
      setVisible(true)
      return
    }
    onClick(val)
  }

  const handleCreate = async (content) => {
    if (content) {
      await onClick({ action: 1, parentId: tree.id, dto: { content } })
    }
    setVisible(false)
  }

  return <>
    <TreeItem
      cell={tree}
      onClick={handleClick}
      isCollapsed={isCollapsed}
      setIsCollapsed={setIsCollapsed}
      onCreate={() => setVisible(true)}
    />
    <section
      class="transition duration-500 ease-in-out overflow-hidden"
      style={`padding-left: 35px;height:${isCollapsed ? 0 : 'auto'}`}
    >
      {tree.children && tree.children.map(item => <TreeList tree={item} onClick={onClick} />)}
      {/* {visible && <CreateTreeItem onOk={handleCreate} />} */}
    </section>
  </>
}

TreeList.TreeItem = TreeItem
TreeList.CreateTreeItem = CreateTreeItem

export default TreeList