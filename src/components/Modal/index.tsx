import React, { RefObject, useRef } from 'react'
import { createPortal } from 'react-dom'
import classnames from 'classnames'

import CloseIcon from 'assets/icons/close.svg'
import useLockBodyScroll from 'src/hooks/useLockBodyScroll'
import useClickOutside from 'src/hooks/useClickOutside'
import { Transition } from '@headlessui/react'

interface Props {
  title?: string
  isOpen: boolean
  center: boolean
  className?: string
  /* function called when modal is closed */
  onDismiss?: () => void
  children?: React.ReactNode
  size: 'normal' | 'large'
}
const sizeClasses = {
  large: 'w-175',
  normal: 'w-140',
}

function Modal({
  title,
  isOpen,
  center,
  size,
  className,
  onDismiss,
  children,
}: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
  const outerRef = useRef(null)

  const wrapperClasses = classnames(
    'fixed flex flex-col items-center inset-0 z-50',
    {
      'justify-center': center,
    }
  )
  const modalClasses = classnames(
    'flex flex-col items-center overflow-hidden transform bg-white modal shadow-large-modal rounded-xl',
    {
      'mt-20 mb-2 ': !center,
    },
    sizeClasses[size],
    className
  )

  useLockBodyScroll()
  useClickOutside(
    ref,
    () => {
      if (isOpen && onDismiss) onDismiss()
    },
    outerRef
  )

  const modal = (
    <div ref={outerRef}>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition easy-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className={wrapperClasses}
      >
        <div ref={ref} className={modalClasses}>
          {title && (
            <div className="flex items-center justify-between w-full pl-8 pr-4 border-b border-gray-200">
              <div className="text-sm font-semibold text-gray-700">{title}</div>
              <div className="p-4" onClick={onDismiss}>
                <CloseIcon className="w-4 text-gray-500 hover:text-gray-700" />
              </div>
            </div>
          )}
          {children}
        </div>
      </Transition>
    </div>
  )

  return createPortal(modal, document.getElementById('root-modal') as Element)
}

Modal.defaultProps = {
  size: 'normal',
  center: true,
}

export default Modal
