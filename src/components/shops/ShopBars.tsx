import { NavLink } from "react-router-dom";
import { LuSquareMenu } from "react-icons/lu";
import Clock from "../Clock";
type ShopProps = {
  id: string;
  name: string;
};

const ShopBars = ({ id, name }: ShopProps) => {
  return (
    <div className="flex relative border-gray-200 border-1 rounded-sm py-2 justify-around items-center shadow-sm bg-blue-200 mb-3">
      <div className=" -ml-20  ">
        {" "}
        <Clock />
      </div>
      <div className="flex justify-center gap-2 overflow-auto">
        <NavLink
          onClick={() => {}}
          key={id}
          to={id}
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive ? "bg-amber-300 text-white" : "bg-gray-100"
            }`
          }
        >
          {name}
        </NavLink>
      </div>
      <div className="-mr-20">
        <LuSquareMenu />
      </div>
    </div>
  );
};
export default ShopBars;
