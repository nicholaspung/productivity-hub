import React from "react";

export const Main = ({ children }) => (
  <main className="relative bg-white">{children}</main>
);

export const DisplayContainer = ({ children, classes }) => (
  <div className={`max-w-6xl mx-auto p-4 sm:px-6 ${classes ? classes : ""}`}>
    {children}
  </div>
);

export const DisplayContainerCard = ({ children, classes }) => (
  <DisplayContainer classes={classes ? classes : ""}>
    <div className="p-5 rounded-md border-2 border-gray-200">{children}</div>
  </DisplayContainer>
);

export const Button = ({ children, action }) => (
  <button
    className={
      "whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
    }
    onClick={action}
  >
    {children}
  </button>
);

export const FilledButton = ({ children, action, classes }) => (
  <span
    className={`inline-flex rounded-md shadow-sm ${classes ? classes : ""}`}
  >
    <button
      className={`whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 ${
        classes ? classes : ""
      }`}
      onClick={action}
    >
      {children}
    </button>
  </span>
);

export const smallerFilledButtonClassName =
  "py-1 px-5 rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150";

export const smallerFormInputClassName =
  "block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500";

export const formInputClassName =
  "block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500";

export const fixedDisplayContainer =
  "max-w-xl mx-auto mb-4 p-4 sm:px-6 rounded-md border-2 border-gray-200";

export const overflowDisplayContainer =
  "my-2 h-screen overflow-auto p-4 rounded-md border-2 border-gray-200";
