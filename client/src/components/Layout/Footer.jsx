import React, { useContext } from "react";
import { Context } from "../../index.js";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import './Footer.css';
const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By CodeWithVishakha.</div>
      <div>
        <Link to={"#"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"#"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"#"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"#"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;