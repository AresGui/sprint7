import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav className="navbar"></nav>
            <div className="links">
                <Link to='/welcome'>Home</Link>
                <Link to='/main'>Presupuesto</Link>
            </div>

        </div>
    );
}

export default NavBar;