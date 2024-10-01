import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderUser = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  var nname = "";
  if (user != null) {
    nname = user.name
  }


  const userLogout = (e) => {
    e.preventDefault();
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-user");
    sessionStorage.removeItem("jwtToken");
    navigate("/home");
    window.location.reload(false);
  };

  return (



    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">

      <li class="nav-item">
        <Link to="/home" class="nav-link active" aria-current="page">
          <b class="">Booking</b>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/users/update"
          className="nav-link active"
        >
          <b className="">Update Profile</b>
        </Link>

      </li>

      <li className="nav-item">
        <Link
          to="/user/changepass"
          className="nav-link active"
        >
          <b className=""> Change Password </b>
        </Link>
        <ToastContainer />
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <b class="">[{nname}] Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default HeaderUser;
