import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
    Button, 
    TextField, 
    Checkbox, 
    FormControlLabel 
} from "@mui/material";
import { 
    postEntity, 
    getEntity 
} from "../../utils/requests";
import Cookies from "js-cookie";

import loginBg from "../../assets/images/bg-login.jpg";
import "./login.scss";

import { useAuth } from "../auth/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(true);

  const auth = useAuth();

  const handleSubmit = async () => {
    if (email !== "" && password !== "") {
      try {
        const response = await postEntity("users/login", {
          email: email,
          password: password,
        });
        if (response.data.success === true) {
          setEmail("");
          setPassword("");

          setTimeout(async () => {
            if (response.data.role === "owner") {
              auth.loginOkay(response.data.results, response.data.token);
              navigate("/owners", { replace: true });
            } else if (response.data.role === "manager") {
              auth.loginOkay(response.data.results, response.data.token);
              try {
                const answer = await getEntity(`stores/getStoreId/${response.data.results.id}`);
                if (answer.data.success === true) {
                  const storeID = answer.data.results;
                  Cookies.set("store_id", storeID.store_id);
                }
              } catch (error) {
                setError("Error retrieving storeID");
                console.error(error);
              }
              navigate("/manager", { replace: true });
            } else if (response.data.role === "customer") {
              auth.loginOkay(response.data.results, response.data.token);
              navigate("/customers", { replace: true });
            } else {
              navigate("*");
            }
          }, 1000);
        }
      } catch (error) {
        console.error(error);
        setError(error.data.message);
      }
    } else {
      setError("All field are required ! ");
    }
  };

  const handleChange = (e, type) => {
    switch (type) {
      case "email":
        setError("");
        setEmail(e.target.value);
        if (e.target.value === "") {
          setError("Email non renseigné");
        }
        break;
      case "password":
        setError("");
        setPassword(e.target.value);
        if (e.target.value === "") {
          setError("Mot de Passe non renseigné");
        }
        break;
      default:
    }
  };

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleNavigate = () => {
    setTimeout(() => {
      navigate("/register", { replace: true });
    }, 1000);
  };

  return (
    <section>
      <div className="imgBx">
        <img src={loginBg} alt="" />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Sign In</h2>
          <p>
            {error !== "" ? (
              <span className="error">{error}</span>
            ) : (
              <span></span>
            )}
          </p>
          <form>
            <div className="inputBx">
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                required
                value={email}
                className="textfield"
                onChange={(e) => handleChange(e, "email")}
              />
            </div>
            <div className="inputBx">
              <TextField
                label="Password"
                type="password"
                required
                value={password}
                className="textfield"
                onChange={(e) => handleChange(e, "password")}
              />
            </div>
            <div className="remember">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
                onChange={(event) => handleCheckChange(event)}
              />
            </div>
            <div className="inputBx">
              <Button
                variant="contained"
                className="buttonZone"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </div>
            <div className="inputBx">
              <Button
                variant="contained"
                className="buttonZone"
                onClick={handleNavigate}
              >
                Newer ? Sign up here!!!
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
