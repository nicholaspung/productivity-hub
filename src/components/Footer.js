import React from "react";

const Footer = () => (
  <footer>
    <div>© {new Date().getFullYear()}</div>
    <div>
      Icon made by{" "}
      <a
        href="https://www.flaticon.com/authors/freepik"
        target="_blank"
        rel="noopener noreferrer"
      >
        Freepik
      </a>{" "}
      from{" "}
      <a
        href="https://www.flaticon.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        www.flaticon.com
      </a>
    </div>
  </footer>
);

export default Footer;
