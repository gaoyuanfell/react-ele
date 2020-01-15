import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-warp f_c_c">
        <Link className="footer-warp-item" to="/home">
          <img src="" alt="" />
          <p>首页</p>
        </Link>
        <Link className="footer-warp-item" to="/open">
          <img src="" alt="" />
          <p>发现</p>
        </Link>
        <Link className="footer-warp-item" to="/order">
          <img src="" alt="" />
          <p>订单</p>
        </Link>
        <Link className="footer-warp-item" to="/user">
          <img src="" alt="" />
          <p>我的</p>
        </Link>
      </div>
    </footer>
  );
}
