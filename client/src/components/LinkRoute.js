import { Link } from "react-router-dom";
import "./CSS/LinkRoute.css"
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