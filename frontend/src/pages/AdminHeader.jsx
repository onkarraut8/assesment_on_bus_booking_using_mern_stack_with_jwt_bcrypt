import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  //console.log("#####%%%%%" + user.name);
  var nname = "";
  if (user !== null) {
    nname = user.name;
  }

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("jwtToken");
    navigate("/home");
    window.location.reload(false);
  };

  return (
    <ul className="navbar-nav mb-2 mb-lg-0 me-1 d-flex justify-content-end">

      <li className="nav-item">
        <Link to="/users/update" className="nav-link active">
          <b className="">Update Profile</b>
        </Link>

      </li>


      <li className="nav-item">
        <Link to="" className="nav-link active" aria-current="page" onClick={adminLogout}>
          <b className="">[{nname}] Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
