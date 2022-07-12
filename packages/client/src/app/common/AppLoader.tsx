import React from "react";

const AppLoader = () => {
  return (
    <div className="flex justify-center">
      <span className="circle animate-loader" />
      <span className="circle animate-loader animation-delay-200" />
      <span className="circle animate-loader animation-delay-400" />
    </div>
  );
};

export default AppLoader;
