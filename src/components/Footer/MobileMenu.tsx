import { Link } from "react-router-dom";

const MobileMenu = ({
  menuOpen,
  lang,
  menus,
  toggleMenuMobile,
  setLang,
}: any) => {
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click event from bubbling up and closing the menu
  };
  return (
    <div
      onClick={handleMenuClick}
      className="absolute right-4 bottom-15  min-w-24  "
    >
      <div className="bg-white/50 backdrop-blur-md outline-1 outline-gray-200 shadow-2xl mr-2 pl-3 rounded-2xl mb-2 pt-1  ">
        {menuOpen && (
          <div className="flex flex-col justify-center left-0 w-3/4 rounded-md ml-1 mt-2  ">
            {menus.map((menu: any, index: any) => (
              <Link
                key={index} // Only apply key here on the Link element
                to={`/${menu.path}`}
                onClick={toggleMenuMobile}
                className={` shadow   text-[9px] flex justify-center   text-center  text-sm font-bold rounded-full  border-1  border-gray-50 py-2 my-1  ${
                  location.pathname === `/${menu.path}`
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black "
                }`}
              >
                {menu.label[lang]}
              </Link>
            ))}
            {/* Mobile Language Toggle */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setLang("th")}
                className={`px-2 py-1 text-sm font-medium rounded ${
                  lang === "th" ? "bg-blue-600 text-white" : "text-gray-600"
                }`}
              >
                ไทย
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 text-sm font-medium rounded ${
                  lang === "en" ? "bg-blue-600 text-white" : "text-gray-600"
                }`}
              >
                ENG
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
