import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


const UserLoginFrom = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    email: "",
    password: "",
  });


  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      ///implentation
      // console.log('proceed');
      fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      }).then((res) => {
        return res.json();
      }).then((resp) => {
        console.log(resp);
        console.log(resp.token);
        console.log(resp.user);
        console.log("Email: " + resp.user.email);
        if (resp.user.email === loginRequest.email.toLowerCase()) {
          toast.success('Success');
          if (resp.user.role.toUpperCase() === "ADMIN") {
            console.log("Working fine:");
            sessionStorage.setItem("jwtToken", resp.token);
            sessionStorage.setItem("active-admin", JSON.stringify(resp.user));
            navigate('/admin');

          } else if (resp.user.role.toUpperCase() === "USER") {
            sessionStorage.setItem("jwtToken", resp.token);
            sessionStorage.setItem("active-user", JSON.stringify(resp.user));
            navigate('/home');

          }

          window.location.reload(false);
        } else {
          toast.error('Please Enter valid credentials');
        }
      }).catch(() => {
        toast.error('Login Failed due to incorrect password :');
      });
    }
  }


  const validate = () => {
    let result = true;
    if (loginRequest.email === '' || loginRequest.email === null) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (loginRequest.password === '' || loginRequest.password === null) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  }

  return (
    <div style={{ minHeight: "30rem", }}>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card "
          style={{ width: "25rem" }}
        >
          <div className="card-header ">
            <h4 className="card-title">Login</h4>
          </div>
          <div className="card-body">
            <form onSubmit={ProceedLogin}>

              <div className="mb-3 ">
                <label for="email" class="form-label">
                  <b>Email Id</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter EmailId"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Enter Valid email"
                  onChange={handleUserInput}
                  value={loginRequest.email}
                />

              </div>
              <div className="mb-3">
                <label for="password" className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[!@#$%^&*+`~=?\|<>/]).{8,}"
                  title="Must contain at least one  number,at least one special character, one uppercase and lowercase letter, and at least 8 or more characters"
                  onChange={handleUserInput}
                  placeholder="Enter Password"
                  value={loginRequest.password}
                  autoComplete="on"

                />

              </div>
              <button
                type="submit"
                className="btn btn-primary mt-4 mb-4"
              >
                Login
              </button>
              <ToastContainer />
              <div align="justify" class="container-fluid navbar-bar mt-3">
                <ul class="navbar mb-1 me-auto">
                  {/* <li class="nav-link">
                    <Link to="/user/login/forgotpass" class="nav-link active" aria-current="page">
                      <b className=" btn btn-light ">Forgot Password click here</b>
                    </Link></li> */}
                  <li class="nav-link">
                    <Link to="/register" class="nav-link active" aria-current="page">
                      <b className="btn btn-light">Register</b>
                    </Link></li></ul></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginFrom;
