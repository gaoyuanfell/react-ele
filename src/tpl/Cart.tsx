import React, { useMemo, useState, useCallback, useEffect } from 'react'
import './Cart.scss'
import { AddDrop } from './AddDrop';

export function Cart(props) {

  const [showCart, setShowCart] = useState<boolean>(false);

  let { cart, onChange=()=> {}, clearCart=()=> {} } = props

  // 总价
  let memoizedPrice = useMemo(() => {
    if (cart instanceof Array && cart.length !== 0) {
      return cart.map(ite => ite.lowest_price * ite.quantity).reduce((a, b) => a + b).toFixed(1);
    }
    return 0
  }, [cart])

  // 总数量
  let memoizedNumber = useMemo(() => {
    if (cart instanceof Array && cart.length !== 0) {
      return cart.map(ite => ite.quantity).reduce((a, b) => a + b);
    }
    return ''
  }, [cart])

  // 购物车为空 关闭购物车
  useEffect(()=> {
    if(!cart || cart.length === 0) setShowCart(false)
  }, [cart])

  const showCartFun = useCallback(() => {
    if(!cart || cart.length === 0) return
    setShowCart(!showCart)
  }, [cart, showCart])

  return (
    <div className="cart-view">

      <div className={`cart-mask ${showCart ? ' active' : ''}`} onClick={ showCartFun }></div>

      <div className={`cart-list ${showCart ? ' active' : ''}`}>
        <div className="cart-ctrl f_b_c">
          <p>已选商品</p>
          <p onClick={ clearCart } >清空</p>
        </div>
        <div className="cart-list-overflow">
          {
            cart.map((ite) => {
              let { name, lowest_price, quantity, item_id } = ite
              return (
                <div className="cart-list-item f_b_c" key={ item_id }>
                  <p>{name}</p>
                  <p>{lowest_price * quantity}</p>
                  <AddDrop value={quantity} onChange={ onChange.bind(null, ite, 3 ) }></AddDrop>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="cart-box f_c_c">
        <div className="cart-box-number" onClick={ showCartFun }>
          <span>{memoizedNumber}</span>
        </div>
        <div className="cart-box-price" onClick={ showCartFun }>
          <p>¥{memoizedPrice}</p>
          <p>另需配送费3.5元</p>
        </div>
        <div className="cart-box-btn f_c_c">
          <span>去结算</span>
        </div>
      </div>

    </div>
  )
}