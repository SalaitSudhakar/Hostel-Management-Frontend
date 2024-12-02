import React from "react";

const CardContainer = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 container mx-auto  py-6 ">
      {children}
    </div>
  );
};

export default CardContainer;