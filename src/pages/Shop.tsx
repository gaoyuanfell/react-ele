import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import './Shop.scss'
import { getImageUrl, pushSingle } from '../core/util'
import { AddDrop } from '../tpl/AddDrop'
import { Cart } from '../tpl/Cart'

export function Shop() {

  const [tapType, setTapType] = useState<any>(1)
  const [recommend, setRecommend] = useState<any>(null)
  const [info, setInfo] = useState<any>({})
  const [menu, setMenu] = useState<any[]>()
  const [wHeight, setWHeight] = useState<number>(window.screen.height)
  const [menuIndex, setMenuIndex] = useState(0)
  const [cart, setCart] = useState<any[]>([])
  const [cart2, setCart2] = useState<any[]>([])

  // 确定foot高度
  const tabRef = useRef<HTMLDivElement>(null)
  const mainRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      if (tabRef.current !== null) {
        let height = wHeight - tabRef.current.offsetHeight
        node.style.height = `${height}px`;
      }
    }
  }, [wHeight]);

  useEffect(() => {
    setRecommend(require('../assets/json/recommend.json'))
  }, [])

  useEffect(() => {
    setInfo(require('../assets/json/info.json'))
  }, [])

  useEffect(() => {
    setMenu(require('../assets/json/menu.json'))
  }, [])

  const handerResize = () => {
    setWHeight(window.screen.height)
  }

  useEffect(() => {
    window.addEventListener('resize', handerResize)
    return () => {
      window.removeEventListener('resize', handerResize)
    }
  }, [wHeight])

  // 纯当测试使用 useMemo
  const memoized_image_hash = useMemo(() => {
    let shop_sign = info.shop_sign
    if (shop_sign) {
      return getImageUrl(shop_sign.image_hash, 'x-oss-process=image/format,webp/resize,w_770')
    }
    return ''
  }, [info])

  const memoized_image_path = useMemo(() => {
    let image_path = info.image_path
    if (image_path) {
      return getImageUrl(image_path, 'x-oss-process=image/format,webp/resize,w_150')
    }
    return ''
  }, [info])

  const memoized_image_banner = useMemo(() => {
    let posters = info.posters
    if (posters instanceof Array && posters[0]) {
      let image_banner = posters[0].image_hash
      return getImageUrl(image_banner, 'x-oss-process=image/format,webp/resize,w_686')
    }
    return ''
  }, [info])

  // 计算分组购买数量
  const reduceCategoryFun = useCallback((index) => {
    if (!menu) return ''
    let item = menu[index]
    return item.foods.map(ite => (ite.quantity || 0)).reduce((a, b) => a + b) || ''
  }, [menu])

  // 菜单定位食物
  const positionFoods = (id, index) => {
    let ele = document.querySelector('#category_' + id) as HTMLDivElement
    if (!ele) return
    setMenuIndex(index)
    let parentNode = ele.parentNode as HTMLDivElement
    if (!parentNode) return
    parentNode.scrollTo({ top: ele.offsetTop - parentNode.offsetTop, behavior: "smooth" })
  }

  // 食物定位菜单
  // const foodsPosition = useCallback((node: HTMLDivElement) => {
  //   node.addEventListener('scroll', () => {
  //   })
  // }, [])

  // 购物车数量改变
  const numberChange = useCallback((item, type, number) => {
    if (!menu || !recommend) return;
    item.quantity = number

    // 同步显示
    if (menu && (type === 1 || type === 3)) {
      let category = menu.find(ite => {
        return ite.id === item.category_id
      })
      if (category) {
        let food = category.foods.find(ite => {
          return ite.item_id === item.item_id
        })
        if (food) {
          food.quantity = number
          type !== 3 && pushSingle(cart2, food)
        }
      }
      setMenu([...menu])
    }

    // 同步显示
    if (recommend && (type === 2 || type === 3)) {
      let food = recommend.items.find(ite => {
        return ite.item_id === item.item_id
      })
      if (food) {
        food.quantity = number
        type !== 3 && pushSingle(cart2, food)
      }
      setRecommend({ ...recommend })
    }

    // 加入购物车
    let _cIndex = cart.indexOf(item)
    if (_cIndex === -1) {
      _cIndex = cart.map(i => i.item_id).indexOf(item.item_id)
      if (_cIndex === -1) {
        cart.push(item)
      }
    }

    let _cIndex2 = cart2.indexOf(item)
    if (_cIndex2 === -1) {
      _cIndex2 = cart2.map(i => i.item_id).indexOf(item.item_id)
    }

    if (number === 0) {
      cart.splice(_cIndex, 1)
      cart2.splice(_cIndex2, 1)
    }
    setCart([...cart])
    setCart2([...cart2])

    console.info(cart)
    console.info(cart2)

  }, [menu, recommend, cart, cart2])

  // 清空 购物车
  const clearCart = useCallback(() => {
    [...cart, ...cart2].forEach(item => {
      item.quantity = 0
    })
    setCart([])
    setCart2([])
  }, [cart, cart2])

  return (
    <div className="shop">
      <div className="shop-nav" style={{ backgroundImage: 'url(' + memoized_image_hash + ')' }}></div>
      <div className="shop-info f_l">
        <div className="shop-info-img">
          <img src={memoized_image_path} alt="" />
        </div>
        <div className="shop-info-title">
          <h2 className="shop-info-title-text1 f_c_c">
            <span>{info.name}</span>
            <i></i>
          </h2>
          <p className="shop-info-title-text2">
            <span>评价 {info.rating}</span>
            <span>月售{info.recent_order_num}单</span>
            <span>蜂鸟快送约{info.order_lead_time}分钟</span>
          </p>
        </div>

        <div className="shop-info-juan f_c_c">
          <div className="shop-info-juan-item f_c_c">
            <p className="f_c_c">
              <span>
                <small>￥</small>
                6
              </span>
              <span>
                无门槛
              </span>
            </p>
            <p>领取</p>
          </div>
        </div>

        <div className="shop-info-manjian f_b_c">
          <div className="shop-info-manjian-item">
            {
              info.activity_tags && info.activity_tags.map((item, index) => {
                return (
                  <span key={index}>{item.text}</span>
                )
              })
            }
          </div>
          <div className="shop-info-manjian-more">
            {info.activities ? info.activities.length : 0}个优惠
          </div>
        </div>

        <p className="shop-info-gonggao">
          公告：{info.promotion_info}
        </p>

      </div>

      <div ref={tabRef} className="shop-tab f_c_c">
        <div className={'shop-tab-item' + (tapType === 1 ? ' active' : '')} onClick={() => setTapType(1)}>点餐</div>
        <div className={'shop-tab-item' + (tapType === 2 ? ' active' : '')} onClick={() => setTapType(2)}>评价</div>
        <div className={'shop-tab-item' + (tapType === 3 ? ' active' : '')} onClick={() => setTapType(3)}>商家</div>
      </div>

      <div className="tab1" style={{ display: tapType === 1 ? 'block' : 'none' }}>
        <div className="tab1-banner">
          <img src={memoized_image_banner} alt="" />
        </div>
        {
          recommend &&
          <div className="tab1-tuijian">
            <p className="tab1-tuijian-title">{recommend.name}</p>
            <div className="tab1-tuijian-scroll f_l">
              <div className="tab1-tuijian-box f_l">
                {
                  recommend.items.map(item => {

                    let { item_id, name, image_path, month_sales, lowest_price, quantity } = item
                    let _image_path = getImageUrl(image_path, 'x-oss-process=image/resize,m_lfit,w_240/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp')

                    return (
                      <div className="tab1-tuijian-item" key={item_id}>
                        <img src={_image_path} alt="" />
                        <p>{name}</p>
                        <p>月售{month_sales} 好评率100%</p>
                        <div className="tab1-tuijian-item-jiage f_b_c">
                          <p>
                            <small>￥</small>
                            {lowest_price}
                          </p>
                          <AddDrop value={quantity} onChange={numberChange.bind(null, item, 1)}></AddDrop>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        }
        <div ref={mainRef} className="category-main f_l">
          {/* 分类 */}
          <div className="category-menu">
            <ul>
              {
                menu &&
                menu.map((item, index) => {
                  let { name, id } = item;
                  return (

                    <li className={`category-menu-item ${index === menuIndex ? ' active' : ''}`} key={id} onClick={positionFoods.bind(null, id, index)}>
                      <span>{name}</span>
                      <span className="category-menu-item-number">
                        {reduceCategoryFun(index)}
                      </span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          {/* 食物 */}
          <div className="category-container">
            {
              menu &&
              menu.map((item) => {
                let { name, description, foods, id } = item;
                return (
                  <dl className="food-item" key={id} id={'category_' + id} >
                    <dt>
                      <div className="f_l">
                        <strong className="food-item-name">{name}</strong>
                        <span className="food-item-desc">{description}</span>
                      </div>
                    </dt>
                    {
                      foods.map(fitem => {
                        let { name, description, image_path, lowest_price, month_sales, satisfy_rate, item_id, quantity } = fitem
                        let _image_path = getImageUrl(image_path, 'x-oss-process=image/resize,m_lfit,w_140,h_140/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp')
                        return (
                          <dd key={item_id}>
                            <div className="food-item-food f_l">
                              <img className="food-item-img" src={_image_path} alt="" />
                              <div className="food-item-info f_l">
                                <h3>{name}</h3>
                                <p>{description}</p>
                                <p>月售{month_sales}份 好评率{satisfy_rate}%</p>
                                <div className="food-item-info-numCtrl f_b_c">
                                  <p>
                                    <small>￥</small>
                                    {lowest_price}
                                  </p>
                                  <AddDrop value={quantity} onChange={numberChange.bind(null, fitem, 2)}></AddDrop>
                                </div>
                              </div>
                            </div>
                          </dd>
                        )
                      })
                    }
                  </dl>
                )
              })
            }
          </div>
        </div>

      </div>
      <div style={{ display: tapType === 2 ? 'block' : 'none' }}>
        评价
      </div>
      <div style={{ display: tapType === 3 ? 'block' : 'none' }}>
        商家
      </div>

      <Cart cart={cart} onChange={numberChange} clearCart={clearCart}></Cart>

    </div>
  )
}