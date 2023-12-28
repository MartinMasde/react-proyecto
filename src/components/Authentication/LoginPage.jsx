import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [isLogin, setIsLogin] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  const navHandler = () => {
    navigate("/Search");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetchAuth();
      if (authenticated) {
        console.log(
          `Usuario autenticado. Email: ${formData.email}, Contraseña: ${formData.password}, Modo de inicio de sesión: ${
            isLogin ? "Login" : "Registro"
          }`
        );
        navHandler();
      } else {
        console.log(
          `Autenticacion Fallida. Email: ${formData.email}, Contraseña: ${formData.password}, Modo de inicio de sesión: ${
            isLogin ? "Login" : "Registro"
          }`
        );
         navigate("/login");
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const fetchAuth = async () => {
    const url = isLogin
      ? "http://localhost:3000/api/login"
      : "http://localhost:3000/api/signup";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        setAuthenticated(true);

      } else {
        throw new Error("Error en la autenticación o creación de usuario");
      }
    } catch (error) {
      console.log("Error: ", error.message);
      setAuthenticated(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <h1 className={classes.h1}>{isLogin ? "User Login" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit} className={classes.form}>
          <label className={classes.label}>
            ✉️ Email:
            <br />
            <input
              className={classes.input}
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          {isLogin || ( // Mostrar el campo "name" solo en el registro
            <label className={classes.label}>
              🧑 Name:
              <br />
              <input
                className={classes.input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
          )}
          <br />
          <label className={classes.label}>
            🔐 Password:
            <br />
            <input
              className={classes.input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit" className={classes.button}>
            {isLogin ? "LOGIN" : "SIGN UP"}
          </button>
        </form>
        <p className={classes.p} onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an Account? Sign up"
            : "Have an Account? Sign in"}
        </p>
      </div>
      <div className="decoration-container"></div>
    </div>
  );
};

export default LoginPage;

