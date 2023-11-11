import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import loginBg from "../../assets/images/bg-login.jpg";
import "./loading.scss";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
  }, []);

  return (
    <section>
      <div className="imgBx">
        <img src={loginBg} alt="" />
      </div>
      <div className="contentBx">
        <div className="content-loading">
          <div className="cercle"></div>
          <div className="cercle"></div>
          <div className="cercle"></div>
          <div className="loading"> Wait a few seconds ...</div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
