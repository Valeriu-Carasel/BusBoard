import React from "react";
import {Link} from "react-router-dom";

interface NavBarProps{
    randomNumber: number
}
export const NavBar: React.FC<NavBarProps> = () => {
    return (<div>
        <li>
            <Link to="/history">history</Link>
        </li>
        <li>
            <Link to="/busses">busses</Link>
        </li>
        <li>
            <Link to="https://www.google.com/">Google</Link>
        </li>
    </div>);
}
export default NavBar;