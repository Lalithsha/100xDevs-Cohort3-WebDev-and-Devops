function SendMoney({ user }) {
  return (
    <div className="flex flex-col justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center items-center">
        <div className="h-min max-w-md p-4 space-y-4 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center ">Send Money</h2>
          </div>
          <div className="pb-6 pl-6 pr-6">
            <div className="flex flex-row items-center space-x-4">
              <div className="rounded-full bg-green-300 flex flex-col justify-center items-center w-12 h-12 ">
                <span className="text-2xl font-medium">U</span>
              </div>
              <h3 className="text-2xl font-semibold">Friend's name</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-10" htmlFor="">
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button className="flex justify-center rounded-md text-sm font-medium bg-green-500 ring-offset-4 transition-colors h-10 px-4 py-2 w-full text-white cursor-pointer">
                Initiate transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendMoney;
