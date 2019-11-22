import React from 'react';

import './Home.scss';
import { Footer } from './Footer';
import { getImageUrl } from '../core/util';

export function Home(props) {

  const goShop = ()=> {
    props.history.push('/shop')
  }

  let productList = [
    {
      title: '美食',
      imgUrl: require('../assets/img/1.jpeg')
    },
    {
      title: '大牌惠吃',
      imgUrl: require('../assets/img/2.jpeg')
    },
    {
      title: '商超便利',
      imgUrl: require('../assets/img/3.jpeg')
    },
    {
      title: '水果',
      imgUrl: require('../assets/img/4.jpeg')
    },
    {
      title: '医药健康',
      imgUrl: require('../assets/img/5.jpeg')
    },
    {
      title: '浪漫鲜花',
      imgUrl: require('../assets/img/6.jpeg')
    },
    {
      title: '跑腿代购',
      imgUrl: require('../assets/img/7.jpeg')
    },
    {
      title: '汉堡披萨',
      imgUrl: require('../assets/img/8.jpeg')
    },
    {
      title: '厨房生鲜',
      imgUrl: require('../assets/img/9.jpeg')
    },
    {
      title: '甜品饮品',
      imgUrl: require('../assets/img/10.jpeg')
    },
    {
      title: '速食简餐',
      imgUrl: require('../assets/img/11.jpeg')
    },
    {
      title: '地方小吃',
      imgUrl: require('../assets/img/12.jpeg')
    },
    {
      title: '大牌惠吃',
      imgUrl: require('../assets/img/13.jpeg')
    },
    {
      title: '速食简餐',
      imgUrl: require('../assets/img/14.jpeg')
    },
  ]

  let business: any[] = require('../assets/json/business.json')

  return (
    <>
      <div className="header">
        <div className="header-address f_c_c">
          <svg className="header-address-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 31" ><path fill="#FFF" fillRule="evenodd" d="M22.116 22.601c-2.329 2.804-7.669 7.827-7.669 7.827-.799.762-2.094.763-2.897-.008 0 0-5.26-4.97-7.643-7.796C1.524 19.8 0 16.89 0 13.194 0 5.908 5.82 0 13 0s13 5.907 13 13.195c0 3.682-1.554 6.602-3.884 9.406zM18 13a5 5 0 1 0-10 0 5 5 0 0 0 10 0z"></path></svg>
          <span className="header-address-name" data-spm-anchor-id="a2ogi.13147251.0.i2">上海市人民政府</span>
          <svg className="header-address-jt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8" ><path fill="#FFF" fillRule="evenodd" d="M5.588 6.588c.78.78 2.04.784 2.824 0l5.176-5.176c.78-.78.517-1.412-.582-1.412H.994C-.107 0-.372.628.412 1.412l5.176 5.176z"></path></svg>
        </div>
      </div>
      <div className="search">
        <div className="search-content f_c_c">
          <svg className="search-content-search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path fillOpacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path>
          </svg>
          <span className="search-content-name">搜索饿了么商家、商品名称</span>
        </div>
      </div>
      <div className="product f_l f_w">
        {
          productList.map((item, index) => {
            return (
              <div className="product-item" key={index}>
                <img className="product-item-img" src={item.imgUrl} alt="" />
                <span className="product-item-title"> {item.title} </span>
              </div>
            )
          })
        }
      </div>

      <div className="shoplist-title f_c_c">
        推荐商家
      </div>

      <div className="filter f_c_c">
        <a className="filter-item f_c_c" href="/">
          <span>综合排序</span>
          <svg viewBox="0 0 72 32" className="dropdown-icon"><path d="M36 32l36-32h-72z"></path></svg>
        </a>
        <a className="filter-item f_c_c" href="/">
          <span>距离最近</span>
        </a>
        <a className="filter-item f_c_c" href="/">
          <span>品质联盟</span>
        </a>
        <a className="filter-item f_c_c" href="/">
          <span>筛选</span>
        </a>
      </div>

      <div className="shoplist">

        {
          business.map((item, index) => {

            let { image_path, name, rating, recent_order_num, float_delivery_fee, float_minimum_order_amount, average_cost, flavors, activities, supports, distance, order_lead_time } = item
            let activitiesAndsupports = [
              ...activities,
              ...supports
            ]

            let _image_path = getImageUrl(image_path, 'x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed')

            return (
              <div className="shoplist-item" key={ index } onClick={ goShop.bind(null) }>
                <div className="shoplist-item-top f_c_c">
                  <div className="shoplist-item-top-img">
                    <img src={ _image_path } alt="" />
                  </div>
                  <div className="shoplist-item-top-text f_l">
                    <h3>{ name }</h3>
                    <div>
                      <span>{ rating }</span>
                      <span>月售{ recent_order_num }单</span>
                    </div>
                    <div className="f_b_c">
                      <div>
                        <span>¥{ float_minimum_order_amount }起送</span>
                        <span>配送费¥{ float_delivery_fee }</span>
                        <span>{ average_cost }</span>
                      </div>
                      <div>
                        <span>{ (distance / 1000).toFixed(2) }km</span>
                        <span>{ order_lead_time }分钟</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shoplist-item-bottom">
                  <div className="shoplist-item-bottom-tips">
                    {
                      flavors.map((tag, index) => {
                        return (
                          <span key={index}>{tag.name}</span>
                        )
                      })
                    }
                  </div>
                  <div className="shoplist-item-bottom-activity f_b_c">
                    <div className="shoplist-item-bottom-activity-item">
                      {
                        activitiesAndsupports.map((aas, index) => {
                          return (
                            <p key={index}><span style={{ backgroundColor: `#${aas.icon_color}` }} className="shoplist-item-bottom-activity-icon">{aas.icon_name}</span>{aas.description}</p>
                          )
                        })
                      }
                    </div>
                    <div className="shoplist-item-bottom-activity-more f_c_c">
                      <span>{activitiesAndsupports.length}个活动</span>
                      <svg viewBox="0 0 72 32" className="dropdown-icon"><path d="M36 32l36-32h-72z"></path></svg>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>

      <Footer></Footer>

    </>
  )
}