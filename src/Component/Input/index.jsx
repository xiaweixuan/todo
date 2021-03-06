import { h, useRef, useEffect } from 'fre'

const DEFAULT_WIDTH = '170'
const EN_LENGTH = 7.5
const O_LENGTH = 14
const EXTRA_WIDTH = 8

function getTextWidth(text) {
  if (typeof text !== 'string') return DEFAULT_WIDTH
  let enNum = 0, oNum = 0
  text.split("").forEach(str => {
    str.charCodeAt() < 128 ? enNum++ : oNum++
  })
  return enNum * EN_LENGTH + oNum * O_LENGTH
}

function getInputWidth(el) {
  const iptWidth = el.style.width
  return Number(iptWidth.slice(0, iptWidth.length - 2))
}

function adjustInput(el) {
  const textWidth = getTextWidth(el.value)
  const iptWidth = getInputWidth(el)
  if (textWidth > DEFAULT_WIDTH) {
    el.style.width = `${textWidth + EXTRA_WIDTH}px`
  } else if(textWidth < DEFAULT_WIDTH && iptWidth > DEFAULT_WIDTH) {
    el.style.width = `${DEFAULT_WIDTH}px`
  }
}

function Input({ defaultValue, onFocus, onKeyup, ...rest }) {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
      adjustInput(ref.current)
    }
  }, [ref.current])

  const handleFocus = (e) => {
    onFocus && onFocus(e)
    ref.current.setSelectionRange(ref.current.value.length, ref.current.value.length)
  }
  const handleKeyup = (e) => {
    onKeyup && onKeyup(e)
    adjustInput(e.target)
  }

  return <input
    {...rest}
    ref={ref}
    type="text"
    onFocus={handleFocus}
    onKeyup={handleKeyup}
    defaultValue={defaultValue}
    class="text-xs w-full outline-none bg-gray-100 rounded-lg py-1 px-2"
  />
}

export default Input