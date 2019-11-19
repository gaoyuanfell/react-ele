import React, { useState, useEffect } from 'react'

import './AddDrop.scss'

export function AddDrop(props) {

  const {value = 0, onChange = () => {}} = props

  const [number, setNumber] = useState(value)

  useEffect(() => {
    if(value !== number){
      setNumber(value)
    }
  }, [value, number])

  const addFun = (number) => {
    setNumber(++number)
    onChange(number)
  }

  const dropFun = (number) => {
    setNumber(--number)
    onChange(number)
  }

  return (
    <div className="add-drop f_c_c">
      {
        number !== 0 &&
        <>
          <svg className="cart-add" viewBox="0 0 44 44" onClick={dropFun.bind(null, number)}>
            <path fill="#2395ff" fillRule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z" clipRule="evenodd"></path>
            <path fill="#2395ff" fillRule="evenodd" d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z" clipRule="evenodd"></path>
          </svg>
          <span className="cart-number">{number}</span>
        </>
      }
      <svg className="cart-minus" viewBox="0 0 44 44" onClick={addFun.bind(null, number)}>
        <path fill="none" d="M0 0h44v44H0z"></path>
        <path fill="#2395ff" fillRule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clipRule="evenodd"></path>
      </svg>
    </div>
  )
} 