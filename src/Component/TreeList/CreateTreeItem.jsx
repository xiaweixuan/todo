import { h } from 'fre'
import Input from '../Input'

function CreateTreeItem({ onOk, onCancel }) {
  const handleKey = (e) => {
    if (e.keyCode !== 13) return
    onOk(e.target.value)
  }

  return <section class="my-1">
    <div class="inline-block relative group">
      <div class="inline-block min-w-300 cursor-pointer group-hover:shadow">
        <div class="relative flex items-center">
          <div class="absolute left-2 rounded-full w-2 h-2 bg-blue-500"></div>
          <div class="py-3 px-6">
            <Input onKeyPress={handleKey} onBlur={onCancel} />
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default CreateTreeItem