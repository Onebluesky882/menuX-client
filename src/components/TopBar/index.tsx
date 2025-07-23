const index = () => {
  return (
    <div className="flex gap-2 bg-amber-100 py-12 -mb-5 rounded-t-2xl  items-baseline  sm:gap-10 justify-center">
      <div className="flex  text-center  flex-col max-sm:gap-y-5 ">
        <p className="text-gray-500 text-sm">Restaurant</p>
        <h3 className="text-sm sm:text-2xl font-bold text-gray-800 ">152</h3>
      </div>

      <div className="text-center flex justify-center flex-col">
        <p className="text-gray-500 text-sm">Real time Order</p>
        <h3 className="text-sm sm:text-2xl  font-bold text-emerald-600 ">
          ฿4,290
        </h3>
      </div>
      <div className="flex flex-col text-center  max-sm:gap-y-5  ">
        <p className="text-gray-500 text-sm">Summary</p>
        <h3 className="text-sm sm:text-2xl font-bold  text-emerald-600">
          ฿4,290
        </h3>
      </div>
      <div className="text-center">
        <p className="text-gray-500 text-sm">Today's Earnings</p>
        <h3 className="text-sm sm:text-2xl  font-bold text-emerald-600">
          ฿4,290
        </h3>
      </div>
    </div>
  );
};
export default index;
