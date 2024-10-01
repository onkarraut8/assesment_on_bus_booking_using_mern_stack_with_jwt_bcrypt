import { Link } from "react-router-dom";
import RoleNav from "./RoleNav";



const Header = () => {

  return (
    <>
      <div>
        <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
          <div class="container-fluid ">
            <img
              src=""
              width="40"
              height="40"
              class="d-inline-block align-top"
              alt=""
            />
            <Link to="/" class="navbar-brand">
              <i>
                <b className="">Home</b>
              </i>
            </Link>

            <button
              class="navbar-toggler ml-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon my-toggler"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link to="/about" class="nav-link active" aria-current="page">
                    <b className="">About Us</b>
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/contact" class="nav-link active" aria-current="page">
                    <b className="">Contact Us</b>
                  </Link>
                </li>

              </ul>

              <RoleNav />
            </div>
          </div>
        </nav>
      </div>





    </>
  );
};
/* const getSearch=Header().search; */
export default Header;
/* export{getSearch}; */
