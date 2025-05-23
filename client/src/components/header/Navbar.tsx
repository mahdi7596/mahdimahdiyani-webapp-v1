import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../../redux/user/userSlice";

import Search from "../shared/Search";
import MenuItems from "./MenuItems";
import Button from "../shared/Button";
import Dropdown from "../shared/Dropdown";

import { profileMenuItems } from "./IMenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo2.png";
import { useState } from "react";
import { apiFetch } from "../../utils/apiFetch";

const Navbar = () => {
  const { currentUser } = useSelector(
    (state: { user: { currentUser: any } }) => state.user
  );
  const [search, setSearch] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboardRooute = location.pathname.startsWith("/dashboard");
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await apiFetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      const params = new URLSearchParams();
      params.set("searchTerm", search.trim());

      navigate(`/search?${params.toString()}`);

      setSearch("");
    }
  };

  return (
    <header className="z-30 sticky top-0 bg-surfaceBg border-b border-surfaceBorder">
      <div
        className={`navbar ${
          isDashboardRooute ? "md:px-6" : "section-container"
        }`}
      >
        {/* logo + menuItems */}
        <div className="flex-none">
          <img src={logo} className="w-16" alt="logo" />
          <MenuItems currentUser={currentUser} />
        </div>
        {/* search + register button + profile */}
        <div className="flex-1 justify-end gap-2">
          <Search
            value={search}
            onChange={setSearch}
            onKeyDown={handleKeyDown}
            className="input-md w-full xs:w-fit xsm:w-full max-w-xs"
          />
          {currentUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border border-gray-200 relative">
                  {/* <img src={profilePic} alt="profilePic" /> */}
                  <i className="maicon-bx_user text-2xl text-neutrals500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
                </div>
              </div>
              <Dropdown
                dropDownItems={profileMenuItems}
                onAction={handleSignout}
                className="w-44 menu-sm mt-3"
              />
            </div>
          ) : (
            <Button
              link="/login"
              text="ورود - ثبت نام"
              className="hidden xs:flex btn-md btn-outline btn-primary"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
