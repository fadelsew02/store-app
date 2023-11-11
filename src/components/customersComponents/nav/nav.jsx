import React, { useEffect } from "react";

import { Link, NavLink } from "react-router-dom";

import { MdLogout, MdHome } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Avatar, Badge } from "@mui/material";
import { useAuth } from "../../auth/auth";
import { deepPurple } from "@mui/material/colors";

import Cookies from "js-cookie";
import "./nav.scss";

const Nav = (props) => {
  const auth = useAuth();

  useEffect(() => {
    const navigation = document.querySelector(".navigation");
    const toggler = document.querySelector(".toggle");

    toggler.addEventListener("click", function () {
      this.classList.add("active");
      navigation.classList.add("active");
    });
  }, []);

  return (
    <div className="contain">
      <div className="navigation">
        <div className="profile-div">
          <ul className="ul-profile-div">
            <li>
              <Link to="profil" className="lien">
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
        <div className="nav-div">
          <ul className="ul-nav-div">
            <li>
              <NavLink to="dashboard" className="lien">
                <span className="icon">
                  <MdHome style={{ fontSize: "30px" }} />
                </span>
                <span className="title">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="panier" className="lien">
                <span className="icon">
                  {" "}
                  {auth.badge ? (
                    <Badge color="secondary" variant="dot">
                      <ShoppingBasketIcon style={{ fontSize: "30px" }} />
                    </Badge>
                  ) : (
                    <ShoppingBasketIcon style={{ fontSize: "30px" }} />
                  )}{" "}
                </span>
                <span className="title">My Basket</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="listes+de+courses" className="lien">
                <span className="icon">
                  <FaClipboardList style={{ fontSize: "30px" }} />
                </span>
                <span className="title">Purchases List</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="logout-div">
          <ul className="ul-logout-div">
            <li onClick={() => props.setProps()}>
              <NavLink to="#" className="lien">
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
