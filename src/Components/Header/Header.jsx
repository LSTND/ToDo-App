import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./Header.scss";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // display current date
    const updateDate = () => {
      const currentDate = new Date();

      // If necessary, format the day, month and year using 0
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear();
      // Format the date as "dd.mm.yyyy"
      const dateFormatted = `${day}.${month}.${year}`;
      setCurrentDate(dateFormatted);
    };
    // Update date
    const intervalId = setInterval(updateDate, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="header">
      <img
        src="../../../public/icon/Logo.jpg"
        alt="Logo"
        className="header_logo"
      />
      <p className="header_date">{currentDate}</p>
    </div>
  );
};
Header.propTypes = {
  updateDate: PropTypes.func,
};
export default Header;
