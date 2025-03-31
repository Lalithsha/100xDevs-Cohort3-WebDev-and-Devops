import React from "react";

function Appbar() {
  return (
    <div className="flex flex-row justify-between rounded-md shadow h-14 ">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex ">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex flex-col justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl items-center">
            U
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
