import useShop from "@/hooks/useShop";
import useUsers from "@/hooks/useUsers";
import { useEffect } from "react";
import { BsShop } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const pathName = window.location.pathname;

const Header = () => {
  const navigate = useNavigate();
  const { profile, logoutUser } = useUsers();
  const { setShopById } = useShop();

  useEffect(() => {
    const getShopParam = () => {
      const match = pathName.match(/\/shops\/([0-9a-fA-F-]{36})/);
      const shopId = match ? match[1] : null;

      if (shopId) {
        setShopById(shopId);
      }
    };
    getShopParam();
  }, [pathName]);

  const handleOnclick = () => {
    navigate("/login");
  };

  // ✅ Fixed logout function
  const logout = async () => {
    try {
      // Call the logout function from your hook
      await logoutUser();

      console.log("✅ Logout completed, redirecting...");

      // Use navigate instead of window.location.pathname
      navigate("/", { replace: true });

      // Alternative: Use window.location.href for full page reload
      // window.location.href = "/";
    } catch (error) {
      console.error("❌ Logout failed:", error);
      // Even if logout fails, try to redirect
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="my-2">
      <div className="grid grid-cols-3 items-center px-6 py-4 bg-white shadow-md rounded-xl outline-1 outline-gray-100">
        <div className="cursor-pointer col-span-1 flex w-full items-center text-2xl max-sm:mr-10">
          <span className="rounded-full border-2 border-amber-100 p-3">
            <BsShop
              onClick={() => navigate("/shops/dashboard")}
              className="text-gray-600"
            />
          </span>
        </div>
        <div className="col-span-1 justify-center flex">
          <div>
            <span className="text-3xl">🍽️</span>
            <span className="text-indigo-600 text-3xl mx-2">
              <Link to={"/"}>MenuX</Link>
            </span>
          </div>
        </div>
        <div className="col-span-1 justify-end flex">
          <div className="flex items-center space-x-4"></div>
          {profile !== null ? (
            <div className="flex items-center gap-2">
              <div className="flex-col flex">
                <span className="text-start text-[12px] font-medium text-gray-500">
                  Logged as :
                </span>
                <span className="text-[15px] font-medium text-gray-700">
                  {profile.email}
                </span>
              </div>
              <DropdownMenuHeader logout={logout} />
            </div>
          ) : (
            <div className="flex">
              <span
                onClick={handleOnclick}
                className="flex items-center flex-col"
              >
                <FaUserCircle
                  className="outline-none text-gray-600"
                  size={35}
                />
                <span className="text-[12px]">For Staff</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

// ✅ Updated DropdownMenuHeader with async logout support
export function DropdownMenuHeader({
  logout,
}: {
  logout: () => Promise<void> | void;
}) {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IoIosArrowDropdownCircle size={25} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50 border-gray-100" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span onClick={handleLogout}>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
