const CustomButton = ({ text, icon, onClick }) => {
    return (
        <button className="custom-button" onClick={onClick}>
            {icon}
            {text}
        </button>
    );
};

export default CustomButton;
