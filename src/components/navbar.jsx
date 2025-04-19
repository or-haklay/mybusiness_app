import Logo from "./common/logo";
import { NavLink } from "react-router";
import { useAuth } from "../context/auth.context";

function NavBar() {
  const { user, userData } = useAuth();

  async () => {
    await userData;
    await user;
  };

  return (
    <nav className="navbar-dark navbar navbar-expand-lg bg-success fixed-top">
      <div className="container-fluid container">
        <NavLink to="/" className="navbar-brand">
          <Logo />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link " aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link " aria-current="page">
                About
              </NavLink>
            </li>
            <li
              className="nav-item dropdown"
              style={{ display: user?.isBusiness ? "block" : "none" }}
            >
              <NavLink to="/my-cards" className="nav-link " aria-current="page">
                My Cards
              </NavLink>
            </li>
            <li
              className="nav-item dropdown"
              style={{ display: user ? "block" : "none" }}
            >
              <NavLink
                to="/favorites"
                className="nav-link "
                aria-current="page"
              >
                Favorites
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav mr-5  pr-5">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white fw-bold d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center ">
                  <p className="text-white fw-bold mb-0 me-2">
                    {user
                      ? (userData?.name.first || "") +
                        " " +
                        (userData?.name.last || "")
                      : "Guest"}
                  </p>
                  {user ? (
                    user.isBusiness ? (
                      <img
                        src={
                          "https://cdn-icons-png.freepik.com/512/12483/12483674.png?ga=GA1.1.1178628401.1743495898"
                        }
                        alt="business profile"
                        className="rounded-circle"
                        style={{ width: "30px", height: "30px" }}
                      />
                    ) : (
                      <img
                        src={
                          "https://cdn-icons-png.freepik.com/512/12483/12483574.png?ga=GA1.1.1178628401.1743495898"
                        }
                        alt="normal profile"
                        className="rounded-circle"
                        style={{ width: "30px", height: "30px" }}
                      />
                    )
                  ) : (
                    <i className="bi bi-person-circle fs-4"></i>
                  )}
                </div>
              </a>
              <ul className="dropdown-menu">
                <li
                  className="nav-item"
                  style={{ display: user ? "none" : "block" }}
                >
                  <NavLink
                    to="/sign-in"
                    className="dropdown-item"
                    aria-current="page"
                  >
                    Sign-In
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  style={{ display: user ? "block" : "none" }}
                >
                  <NavLink
                    to="/edit-user"
                    className="dropdown-item "
                    aria-current="page"
                  >
                    Edit User
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li
                  className="nav-item"
                  style={{ display: user ? "none" : "block" }}
                >
                  <NavLink
                    to="/register"
                    className="dropdown-item "
                    aria-current="page"
                  >
                    Register
                  </NavLink>
                </li>

                <li
                  className="nav-item"
                  style={{ display: user ? "block" : "none" }}
                >
                  <NavLink
                    to="/sign-Out"
                    className="dropdown-item "
                    aria-current="page"
                  >
                    Sign-Out
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
