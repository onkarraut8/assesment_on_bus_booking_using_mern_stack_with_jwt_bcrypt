import { Link } from "react-router-dom";

const NormalHeader = () => {
  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link to="/register" class="nav-link active" aria-current="page">
          <b className="">Register User</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link to="/login" class="nav-link active" aria-current="page">
          <b className="">Login User</b>
        </Link>
      </li>
    </ul>
  );
};

export default NormalHeader;
