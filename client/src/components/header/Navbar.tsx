import { Link } from "react-router-dom";

import Search from "../shared/Search";
import MenuItems from "./MenuItems";

import { profileMenuItems } from "./IMenuItem";

import logo from "../../assets/images/temp-logo.png";
import profilePic from "../../assets/images/mahdimahdiyani-profile-pic.png";
import Button from "../shared/Button";

const Navbar = () => {
  return (
    <header className="navbar border-b border-gray-100">
      {/* logo + menuItems */}
      <div className="flex-none">
        <img src={logo} className="w-16" alt="logo" />
        <MenuItems />
      </div>
      {/* search + register button + profile */}
      <div className="flex-1 justify-end gap-2">
        <Search />
        <Button
          text="ورود - ثبت نام"
          className="hidden xs:block btn-md btn-outline btn-primary"
        />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full border border-gray-200">
              <img alt="Tailwind CSS Navbar component" src={profilePic} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box border z-[1] mt-3 w-32 p-2 shadow"
          >
            {profileMenuItems.map((menuItem) => (
              <li
                key={menuItem.id}
                className="text-neutrals700 hover:text-neutrals500"
              >
                <Link to={menuItem.link}>{menuItem.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
