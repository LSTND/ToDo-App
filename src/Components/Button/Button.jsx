import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ text, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};
Button.propTypes = {
  text: PropTypes.string,
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
