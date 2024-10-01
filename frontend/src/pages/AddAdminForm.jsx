import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const AddAdminForm = () => {



  useEffect(() => {

  }, [])


  const [user, setUser] = useState({
    name: "",
    role: "ADMIN",
    email: "",
    mobileNo: "",
    password: ""
  });

  const [cpass, setCpass] = useState({
    confirmpassword: "",
  });

  const [error, setError] = useState({
    err: "",
  });

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const saveUser = () => {
    fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {

      //console.warn("result", result);
      result
        .json()
        .then((res) => {
          console.log("response", res);

          if (res.status !== 400) {
            toast.success("Registered Successfully!!!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.success(res.message, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }

        })
        .catch((error) => {
          alert("Enter Another Email and Mobile No.");
          console.log("******", error);
          alert("Registered UnSuccessfully!!! emailId or mobile no. already register:");
        });
    });

  };

  const pass = (e) => {
    e.preventDefault();
    let inputError = {
      err: ""
    };
    if (cpass.confirmpassword === user.password) {
      saveUser();
    }
    else {
      console.log("pasword: " + user.password + " Conp: " + cpass.Conpass);
      setError({ ...inputError, err: "Password and confirm pasword should be same" })
      e.preventDefault();
      return
    }
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          class="card border-color text-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="card-header text-center">
            <h5 class="card-title">Admin Registration</h5>
          </div>
          <div class="card-body">
            <form onSubmit={pass}>
              <div className="container">

                <div class="mb-3 ">
                  <label for="title" class="form-label">
                    <b> Full Name</b>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    onChange={handleUserInput}
                    value={user.name}
                    required
                  />
                </div>


                <div className="row">
                  <div className="col">
                    <div className="mb-3 ">
                      <b>
                        <label className="form-label">Mobile No.</label>
                      </b>
                      <input
                        type="tel"
                        class="form-control"
                        id="mobileNo"
                        name="mobileNo"
                        onChange={handleUserInput}
                        placeholder="Enter mobile no"
                        value={user.mobileNo}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3 ">
                      <b>
                        <label className="form-label">Email Id</label>
                      </b>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        name="email"
                        onChange={handleUserInput}
                        placeholder="Enter EmailId"
                        value={user.email}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div class="mb-3 ">
                      <b>
                        <label for="Password" class="form-label ">
                          Password
                        </label>
                      </b>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        name="password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one  number,at least one special character, one uppercase and lowercase letter, and at least 8 or more characters"
                        onChange={handleUserInput}
                        value={user.password}
                        placeholder="Enter Password"
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div class="mb-3 ">
                      <b>
                        <label for="CPassword" class="form-label ">
                          Confirm Password
                        </label>
                      </b>
                      <input
                        type="password"
                        class="form-control"
                        id="confirmpassword"
                        name="confirmpassword"
                        onChange={e => setCpass({ ...cpass, [e.target.name]: e.target.value })}
                        placeholder="Confirm Password"
                        required
                      />
                      <p className="error-message" style={{ color: "red" }}>{error.err}</p>
                    </div>
                  </div>
                </div>

              </div>
              <input
                type="submit"
                class="btn btn-primary"
                value="Register"
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdminForm;
