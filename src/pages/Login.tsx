import React from 'react';

import './Login.scss';

export function Login(props) {

  const { history } = props

  const loginBtn = (str, event)=>{
    history.push('/home')
  }


  return (
    <div className="container-login">

      <div className="login-img f_c_c">
        <img src={require('../assets/img/logo.png')} alt="" />
      </div>

      <form className="form-box">
        <div className="input-ctrl f_l">
          <input type="tel" maxLength={11} placeholder="手机号" />
          <button disabled={ true } className="code-btn">获取验证码</button>
        </div>
        <div className="input-ctrl f_l">
          <input type="tel" maxLength={8} placeholder="验证码" />
        </div>
      </form>

      <p className="login-xy">
        新用户登录即自动注册，并表示已同意
        <a href="/"> 《用户服务协议》 </a>
        和
        <a href="/"> 《隐私权政策》 </a>
      </p>

      <button className="login-btn" onClick={ loginBtn.bind(null, '1')  }>
        登录
      </button>

      <p className="login-about">关于我们</p>

    </div>
  )
}