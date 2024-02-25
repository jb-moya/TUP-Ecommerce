const Button = ({ text, icon, onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            {icon}
            {text}
        </button>
    );
};

export default Button;
