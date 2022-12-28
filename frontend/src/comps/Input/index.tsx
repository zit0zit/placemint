import React from 'react'
import './style.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element
}

export function Input({
  icon,
  type,
  placeholder,
  value,
  onChange,
  className,
}: Props) {
  return (
    <div className={'input ' + (className ?? '')}>
      {icon && <div className="icon">{icon}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
