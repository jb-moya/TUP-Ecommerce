import { Link } from "react-router-dom";
import "./CSS/NavBar.css"

const LinkRoute = ({ to, image = null, text = '', className}) => {
    return (
        <Link to={to} className={className}>
            {image}
            {text}
        </Link>
    );
};

export default LinkRoute;

// className="link-route"