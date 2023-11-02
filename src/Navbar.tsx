
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/userInfo">userInfo</Link>
          </li>
          <li>
            <Link to="/logIn">logIn</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </>
  );
}

export default Navbar;