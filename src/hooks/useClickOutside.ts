import { RefObject, useCallback, useEffect } from 'react'

const useClickOutside = (
  ref: RefObject<Element>,
  callback: (event: MouseEvent) => void,
  outerRef?: RefObject<Element>
): void => {
  const handleClick = useCallback(
    (event) => {
      if (
        outerRef &&
        outerRef.current &&
        !outerRef.current.contains(event.target)
      )
        return
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event)
      }
    },
    [callback, ref]
  )
  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default useClickOutside
