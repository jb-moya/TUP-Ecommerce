import { Link } from "react-router-dom";
import "./LinkRoute.css"
const LinkRoute = ({ to, image = null, text = '' }) => {
    return (
        <Link to={to} className="link-route">
            {image}
            {text}
        </Link>
    );
};

export default LinkRoute;
