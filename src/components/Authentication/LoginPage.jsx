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




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import classes from "./LoginPage.module.css";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLogin, setIsLogin] = useState(true);
//   const [authenticated, setAuthenticated] = useState(false); 
//   const [name, setName] = useState("");

//   const navigate = useNavigate();

//   const navhandler = () => {
//     navigate("/Search");
//   };

//   // const handleSubmit = (e) => {
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await fetchLogin();
//       if (authenticated) {
//         console.log(
//           `Usuario autenticado. Email: ${email}, Contraseña: ${password}, Modo de inicio de sesión: ${
//             isLogin ? "Login" : "Registro"
//           }}`
//         );
//         navhandler();
//       } else {
//         console.log(
//           `Autenticacion Fallida. Email: ${email}, Contraseña: ${password}, Modo de inicio de sesión: ${
//             isLogin ? "Login" : "Registro"
//           }}`
//         );
//       }
//     } catch (error) {
//       console.log("Error:  ", error.message);
//     }
//   };
  
//   const urlLogin = "http://localhost:3000/api/login";

//   const fetchLogin = async () => {
//     try {
//       const response = await fetch(urlLogin, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });
//       const data = await response.json();
//       localStorage.setItem("authToken", data.token);
//       setAuthenticated(true);
//     } catch (error) {
//       console.log("Error:  ", error.message);

//       setAuthenticated(false);
//     }
//   };

  

//   const fetchSignup = async () => {
//     const urlSignup = "http://localhost:3000/api/signup";
//     try {
//       const response = await fetch(urlSignup, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setAuthenticated(true);
//       } else {
//         throw new Error("Error en la creación de usuario");
//       }
//     } catch (error) {
//       console.log("Error:  ", error.message);
//       setAuthenticated(false);
//     }
//   };



//   //   fetchLogin();
//   //   // Aquí puedes agregar la lógica de autenticación o registro
//   //   console.log(`Email: ${email}, Contraseña: ${password}, Modo de inicio de sesión: ${isLogin ? 'Login' : 'Registro'}`);
//   // }

//   // const urlLogin = "http://localhost:3000/api/login";

//   // const fetchLogin = async () => {
//   //   try {
//   //     const response = await fetch(urlLogin, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         email,
//   //         password,
//   //       }),
//   //     });
//   //     const data = await response.json();
//   //     localStorage.setItem("authToken", data.token)
//   //     navhandler();

//   //   } catch (error) {
//   //     console.log("Error:  ", error.message);
//   //   }
//   // };

//   return (
//     <div className={classes.container}>
//       <div className={classes.formContainer}>
//         <h1 className= {classes.h1}>{isLogin ? "User Login" : "Sign Up"}</h1>
//         <form onSubmit={handleSubmit} className={classes.form}>
//           <label className={classes.label}>
//             ✉️ Email:
//             <br />
//             <input className={classes.input}
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </label>
//           <br />
//           <label className={classes.label}>
//             🔐 Password:
//             <br />
//             <input className={classes.input}
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </label>
//           <br />
//           <button type="submit" className={classes.button}>
//             {isLogin ? "LOGIN" : "SIGN UP"}
//           </button>
//         </form>
//         <p className={classes.p} onClick={() => setIsLogin(!isLogin)}>
//           {isLogin
//             ? "Don't have an Account? Sign up"
//             : "Have an Account? Sign in"}
//         </p>
//       </div>
//       <div className="decoration-container">
//       </div>
//     </div>
//   );
// };

// export default LoginPage;






















// import { useState } from "react";

// export const ControlledForm = () => {
//   const [values, setValues] = useState({ firstName: "", lastName: "" });

//   const handleChange = (e) => {
//     const {
//       target: { name, value },
//     } = e;

//     setValues({
//       ...values,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(`${values.firstName} ${values.lastName}`, values);
//   };

//   console.log("rendering controlled form");

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{ display: "flex", flexDirection: "column", gap: "20px" }}
//     >
//       <div>
//         <label>Name: </label>
//         <input
//           type="text"
//           name="firstName"
//           value={values.firstName}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Email: </label>
//         <input
//           type="text"
//           name="lastName"
//           value={values.lastName}
//           onChange={handleChange}
//         />
//       </div>

//       <button>Submit</button>
//     </form>
//   );
// };
//
