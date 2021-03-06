import { h, useState, useEffect } from 'fre'
import ContentCard from '../../Component/ContentCard'
import TreeList from '../../Component/TreeList'
import useStore from './Store'

const { CreateTreeItem } = TreeList

function Home() {
  const { todoTree, onUpdate, onAdd, onRemove } = useStore()
  const [visible, setVisible] = useState(false)

  const handleClick = ({ action, id, dto, parentId }) => {
    switch (action) {
      case 1:
        onAdd(parentId, dto)
        break
      case 2:
        onRemove(id)
        break
      case 3:
        onUpdate(id, dto)
        break
    }
  }

  const onCreate = (content) => {
    onAdd(-1, { content })
    setVisible(false)
  }

  return <ContentCard>
    <div
      onClick={() => setVisible(true)}
      class="hover:shadow-lg hover:border-transparent hover:shadow-xs cursor-pointer w-full text-center rounded-lg border-2 border-dashed border-gray-200 py-4"
    >
      Add
    </div>
    {todoTree && todoTree.map(item => <TreeList tree={item} onClick={handleClick} />)}
    {visible && <CreateTreeItem onOk={onCreate} onCancel={() => setVisible(false)} />}
  </ContentCard>
}

export default Home