import { Link } from "react-router-dom";

const LinkRoute = ({ to, image = null, text = '' }) => {
    return (
        <Link to={to} className="hover:text-[#5DBAFF]">
            {image}
            {text}
        </Link>
    );
};

export default LinkRoute;
