import React from 'react'
import './style.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, children, onClick }: Props) {
  return (
    <button className={'button ' + (className ?? '')} onClick={onClick}>
      {children}
    </button>
  )
}
