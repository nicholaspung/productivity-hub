import React from 'react';

const Footer = () => (
  <footer className="text-center border-t-2 border-gray-200">
    <p className="p-4 font-medium text-gray-500">
      {`© ${new Date().getFullYear()}`}
    </p>
  </footer>
);

export default Footer;
