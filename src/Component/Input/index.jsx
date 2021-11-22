import { h, useRef, useEffect } from 'fre'

function Input({ defaultValue, onFocus, ...rest }) {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [ref.current])

  const handleFocus = (e) => {
    onFocus && onFocus(e)
    ref.current.setSelectionRange(ref.current.value.length, ref.current.value.length)
  }

  return <input
    {...rest}
    ref={ref}
    type="text"
    onFocus={handleFocus}
    defaultValue={defaultValue}
    class="outline-none ring border-blue-300"
  />
}

export default Input