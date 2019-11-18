import React, { useState, useEffect } from 'react'
import './Shop.scss'

export function Shop() {

  const getImgSuffix = (url: string) => {
    let ms = url.match(/png|jpeg/)
    if (!ms) return ''
    return `.${ms[0]}`
  }

  const [tapType, setTapType] = useState<any>(1)
  const [recommend, setRecommend] = useState<any>(null)
  const [info, setInfo] = useState<any>({})

  useEffect(() => {
    const recommend = require('../assets/json/recommend.json')
    setRecommend(recommend)
  },[])

  useEffect(() => {
    const info = require('../assets/json/info.json')
    info._image_hash = `https://cube.elemecdn.com/${info.shop_sign.image_hash.substr(0, 1)}/${info.shop_sign.image_hash.substr(1, 2)}/${info.shop_sign.image_hash.substr(3)}${getImgSuffix(info.shop_sign.image_hash)}?x-oss-process=image/format,webp/resize,w_770`
    info._image_path = `https://cube.elemecdn.com/${info.image_path.substr(0, 1)}/${info.image_path.substr(1, 2)}/${info.image_path.substr(3)}${getImgSuffix(info.image_path)}?x-oss-process=image/format,webp/resize,w_150`
    setInfo(info)
  },[])

  useEffect(() => {
    console.info('ok')
  },[])


  return (
    <div className="shop">
      <div className="shop-nav" style={{ backgroundImage: 'url('+ info._image_hash +')' }}></div>
      <div className="shop-info f_l">
        <div className="shop-info-img">
          <img src={ info._image_path } alt="" />
        </div>
        <div className="shop-info-title">
          <h2 className="shop-info-title-text1 f_c_c">
            <span>{info.name}</span>
            <i></i>
          </h2>
          <p className="shop-info-title-text2">
            <span>评价 { info.rating }</span>
            <span>月售{ info.recent_order_num }单</span>
            <span>蜂鸟快送约{ info.order_lead_time }分钟</span>
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
                  <span key={ index }>{ item.text }</span>
                )
              })
            }
          </div>
          <div className="shop-info-manjian-more">
            { info.activities ? info.activities.length : 0 }个优惠
          </div>
        </div>

        <p className="shop-info-gonggao">
          公告：{ info.promotion_info }
        </p>

      </div>

      <div className="shop-tab f_c_c">
        <div className={'shop-tab-item' + (tapType === 1 ? ' active' : '')} onClick={() => setTapType(1)}>点餐</div>
        <div className={'shop-tab-item' + (tapType === 2 ? ' active' : '')} onClick={() => setTapType(2)}>评价</div>
        <div className={'shop-tab-item' + (tapType === 3 ? ' active' : '')} onClick={() => setTapType(3)}>商家</div>
      </div>

      <div className="tab1" style={{ display: tapType === 1 ? 'block' : 'none' }}>
        <div className="tab1-banner">
          <img src="https://cube.elemecdn.com/3/05/f9fa007ad45410d09d450e5843f66png.png?x-oss-process=image/format,webp/resize,w_686" alt="" />
        </div>
        {
          recommend &&
          <div className="tab1-tuijian">
            <p className="tab1-tuijian-title">{recommend.name}</p>
            <div className="tab1-tuijian-scroll f_l">
              <div className="tab1-tuijian-box f_l">
                {
                  recommend.items.map(item => {

                    let { item_id, name, image_path, month_sales, lowest_price } = item
                    let _image_path = `https://cube.elemecdn.com/${image_path.substr(0, 1)}/${image_path.substr(1, 2)}/${image_path.substr(3)}${getImgSuffix(image_path)}?x-oss-process=image/resize,m_lfit,w_240/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp`

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
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        }
      </div>
      <div style={{ display: tapType === 2 ? 'block' : 'none' }}>
        评价
      </div>
      <div style={{ display: tapType === 3 ? 'block' : 'none' }}>
        商家
      </div>

    </div>
  )
}