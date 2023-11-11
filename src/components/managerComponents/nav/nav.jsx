import React, { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";

import { MdLogout, MdHome, MdStoreMallDirectory } from "react-icons/md";
import { Avatar } from "@mui/material";
import { FaArrowUp, FaBox } from "react-icons/fa";
import { deepPurple } from "@mui/material/colors";

import "./nav.scss";
import Cookies from "js-cookie";

const Nav = (props) => {
  useEffect(() => {
    const navigation = document.querySelector(".navigation");
    const toggler = document.querySelector(".toggle");

    toggler.addEventListener("click", function () {
      this.classList.add("active");
      navigation.classList.add("active");
    });
  }, []);

  return (
    <div className="contain-manager">
      <div className="navigation-manager">
        <div className="profile-div-manager">
          <ul className="ul-profile-div-manager">
            <li>
              <Link to="profil" className="lien-manager">
                <span className="icon">
                  <Avatar sx={{ bgcolor: deepPurple[400] }}>
                    {Cookies.get("nom")[0]}
                    {Cookies.get("prenom")[0]}
                  </Avatar>
                </span>
                <span className="title">My profile</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-div-manager">
          <ul className="ul-nav-div-manager">
            <li>
              <NavLink to="dashboard" className="lien-manager">
                <span className="icon">
                  <MdHome style={{ fontSize: "30px" }} />
                </span>
                <span className="title">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="stocks" className="lien-manager">
                <span className="icon">
                  <MdStoreMallDirectory style={{ fontSize: "30px" }} />
                </span>
                <span className="title">Stocks</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="history" className="lien-manager">
                <span className="icon">
                  <FaBox style={{ fontSize: "24px" }} />
                </span>
                <span className="title">Order history</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="ravitailler" className="lien-manager">
                <span className="icon">
                  <FaArrowUp style={{ fontSize: "24px" }} />
                </span>
                <span className="title">Refuel</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="suppliers" className="lien-manager">
                <span className="icon">
                  <FaBox style={{ fontSize: "24px" }} />
                </span>
                <span className="title">Suppliers</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="logout-div-manager">
          <ul className="ul-logout-div-manager">
            <li onClick={() => props.setProps()}>
              <NavLink to="#" className="lien-manager">
                <span className="icon">
                  <MdLogout style={{ fontSize: "30px" }} />
                </span>
                <span className="title">Sign out</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="toggle"></div>
    </div>
  );
};

export default Nav;
