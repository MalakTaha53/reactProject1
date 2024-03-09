import React from "react";
import { RotatingLines } from "react-loader-spinner";
import Style from "../Loader/Loader.module.css";
function Loader() {
  return (
    <>
      <div className="pt-4 pb-5 bg-secondary-subtle d-flex justify-content-center align-items-center">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="gray"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}

export default Loader;
