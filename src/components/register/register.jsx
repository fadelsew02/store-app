import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postEntity } from "../../utils/requests";

import { Button, TextField, MenuItem, Select } from "@mui/material";

import loginBg from "../../assets/images/bg-login.jpg";
import "./register.scss";

const Register = () => {
  const naviget = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(1);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (
      nom !== "" &&
      prenom !== "" &&
      email !== "" &&
      username !== "" &&
      password !== ""
    ) {
      const data = {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        username: username,
      };

      try {
        const response = await postEntity("users/register", data);

        if (response.data.success === true) {
          setTimeout(() => {
            naviget("/loading");
          }, 500);
        }
      } catch (error) {
        setError(error.data.message);
        console.error(error);
      }
    } else {
      setError("All field are required ! ");
    }
  };

  const handleChange = (e, type) => {
    switch (type) {
      case "username":
        setError("");
        setUsername(e.target.value);
        if (e.target.value === "") {
          setError("Username not specified");
        }
        break;
      case "password":
        setError("");
        setPassword(e.target.value);
        if (e.target.value === "") {
          setError("Password not specified");
        }
        break;
      case "nom":
        setError("");
        setNom(e.target.value);
        if (e.target.value === "") {
          setError("Name not specified");
        }
        break;
      case "prenom":
        setError("");
        setPrenom(e.target.value);
        if (e.target.value === "") {
          setError("Name not specified");
        }
        break;
      case "email":
        setError("");
        setEmail(e.target.value);
        if (e.target.value === "") {
          setError("Email not specified");
        }
        break;
      default:
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <section>
      <div className="imgBx">
        <img src={loginBg} alt="" />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Sign Up </h2>
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
                label="LastName"
                variant="outlined"
                type="text"
                required
                value={nom}
                className="textfield"
                onChange={(e) => handleChange(e, "nom")}
              />
            </div>
            <div className="inputBx">
              <TextField
                label="FirstName"
                type="text"
                required
                value={prenom}
                className="textfield"
                onChange={(e) => handleChange(e, "prenom")}
              />
            </div>
            <div className="inputBx">
              <TextField
                label="Email"
                type="email"
                required
                value={email}
                className="textfield"
                onChange={(e) => handleChange(e, "email")}
              />
            </div>
            <div className="inputBx">
              <TextField
                label="Username"
                type="text"
                required
                value={username}
                className="textfield"
                onChange={(e) => handleChange(e, "username")}
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
            <div className="inputBx">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                autoWidth
                label="Role"
                onChange={(event) => handleRoleChange(event)}
              >
                <MenuItem value={1}>Customer</MenuItem>
              </Select>
            </div>
            <div className="inputBx">
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                className="buttonZone"
              >
                Sign up{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
