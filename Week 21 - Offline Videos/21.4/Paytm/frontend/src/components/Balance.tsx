import React from "react";

function Balance({ value }: { value: number }) {
  return (
    <div className="flex flex-row p-2 m-2">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold text-lg ml-4">Rs:{value}</div>
    </div>
  );
}

export default Balance;
