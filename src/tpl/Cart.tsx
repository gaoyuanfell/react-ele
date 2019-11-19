import React, { useMemo } from 'react'
import './Cart.scss'

export function Cart(props){

  let { cart } = props

  let memoizedPrice = useMemo(()=> {
    if ( cart instanceof Array && cart.length !== 0){
      return cart.map(ite => ite.lowest_price * ite.quantity).reduce((a, b) => a + b);
    }
    return 0
  }, [cart])

  let memoizedNumber = useMemo(()=> {
    if ( cart instanceof Array && cart.length !== 0){
      return cart.map(ite => ite.quantity).reduce((a, b) => a + b);
    }
    return 0
  }, [cart])

  return (
    <div className="cart-view">
      <div className="cart-box f_c_c">

        <div className="cart-box-number">
          <span>{ memoizedNumber }</span>
        </div>

        <div className="cart-box-price">
          <p>¥{ memoizedPrice }</p>
          <p>另需配送费3.5元</p>
        </div>
        <div className="cart-box-btn f_c_c">
          <span>去结算</span>
        </div>
      </div>
    </div>
  )
}