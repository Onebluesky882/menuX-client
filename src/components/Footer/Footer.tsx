import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { FaHome } from "react-icons/fa";
import LanguageToggle from "./LanguageToggle";
import MobileMenu from "./MobileMenu";
const Footer = () => {
  const [lang, setLang] = useState<"en" | "th">("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenuMobile = () => {
    setMenuOpen((prev) => !prev);
  };

  const mainMenu = [
    {
      path: "dashboard",
      label: { en: "Dashboard", th: "ศูนย์กลาง" },
      potion: "top-10",
    },
    {
      path: "shops/dashboard",
      label: { en: "MyShop", th: "ร้านของฉัน" },
      potion: "top-10",
    },
    {
      path: "profile",
      label: { en: "profile", th: "ผู้ใช้" },
      potion: "top-10",
    },
    {
      path: "feedback",
      label: { en: "feedback", th: "แนะนำติชม" },
      potion: "top-10",
    },
  ];

  const shopMenu = [
    {
      path: "",
      label: { en: "Main", th: "หน้าหลัก" },
      icon: <FaHome size={24} />,
      potion: "top-10",
    },
    {
      path: `shops/dashboard`,
      label: { en: "shop center", th: "ร้านของฉัน" },
      icon: <FaHome size={24} />,
      potion: "top-10",
    },

    // {
    //   path: shopId ? `shops/${shopId}/tables` : "#",
    //   label: { en: "Tables", th: "แผนผังโต๊ะ" },
    //   potion: "top-10",
    // },
    // {
    //   path: `shops/menu`,
    //   label: { en: "menu", th: "แผนผังโต๊ะ" },
    //   potion: "top-10",
    // },
    // {
    //   path: shopId ? `shops/${shopId}/add-category` : "#",
    //   label: { en: "category", th: "หมวดหมู่" },
    //   potion: "top-10",
    // },
  ];

  return (
    <footer className={`  z-10   fixed  w-full bottom-0     `}>
      <div className=" flex justify-center ">
        <div
          className={`   w-[60%] justify-center rounded-t-md shadow-2xl ${
            location.pathname.startsWith("/shops")
              ? `bg-blue-500`
              : `bg-amber-300`
          } 
        } `}
        >
          <nav className="flex   justify-between mx-auto  not-visited: ">
            {/* Desktop Menu */}
            <div className="flex w-full gap-6  ">
              {location.pathname.startsWith("/shops") ? (
                <div className="flex">
                  {shopMenu.map((menu, index) => (
                    <Link key={index} to={`/${menu.path}`}>
                      <span
                        className={`text-md font-medium  text-blue-900  ${
                          location.pathname === `/${menu.path}`
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-white hover:text-blue-500"
                        }`}
                      >
                        <span className="m-2 flex flex-col  text-center ">
                          <span className="flex  justify-center">
                            {" "}
                            {menu.icon}
                          </span>
                          <span className="hidden sm:block text-xs mx-2">
                            {menu.label[lang]}
                          </span>
                        </span>
                      </span>
                    </Link>
                  ))}{" "}
                </div>
              ) : (
                <div>
                  {mainMenu.map((menu, index) => (
                    <Link key={index} to={`/${menu.path}`}>
                      <span
                        className={`text-sm font-medium mx-5 ${
                          location.pathname === `/${menu.path}`
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-700 hover:text-blue-500"
                        }`}
                      >
                        {menu.label[lang]}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <LanguageToggle setLang={setLang} lang={lang} />
          </nav>

          {/* Mobile Menu */}
        </div>
      </div>
      <div className="sm:hidden flex   rounded-full relative outline-1 ">
        {/* Mobile Hamburger */}

        <Button
          onClick={toggleMenuMobile}
          className=" absolute w-10 h-10 right-10 bottom-4  rounded-full p-4   bg-blue-500"
        >
          <Menu size={34} color="white" />
        </Button>
        {menuOpen && (
          <MobileMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            menus={shopMenu}
            lang={lang}
            setLang={setLang}
            toggleMenuMobile={toggleMenuMobile}
          />
        )}
      </div>
    </footer>
  );
};

export default Footer;
