import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="navbar">
            <nav></nav>
            <div className="links">
                <Link to='/welcome'>HOME</Link>
                <Link to='/main'>PRESUPUESTO</Link>
            </div>

        </div>
    );
}

export default NavBar;