import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-text text-white text-center p-4 flex flex-col gap-2">
      <h1 className="text-sm">
        &copy; {new Date().getFullYear()} Hajer AlKanani
      </h1>
      <h1 className="text-xs">
        Powered By
        <span
          className="text-blue-400 ml-1
        hover:underline
        font-bold
        cursor-pointer
        "
        >
          <a
            href="https://www.haithamexe.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Haitham Jalal
          </a>
        </span>
      </h1>
    </div>
  );
};

export default Footer;
