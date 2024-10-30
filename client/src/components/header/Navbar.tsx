import Search from "../shared/Search";
import MenuItems from "./MenuItems";
import Button from "../shared/Button";
import Dropdown from "../shared/Dropdown";

import { profileMenuItems } from "./IMenuItem";

import logo from "../../assets/images/temp-logo.png";
import profilePic from "../../assets/images/mahdimahdiyani-profile-pic.png";

const Navbar = () => {
  return (
    <header className="section-container navbar border-b border-surfaceBorder">
      {/* logo + menuItems */}
      <div className="flex-none">
        <img src={logo} className="w-16" alt="logo" />
        <MenuItems />
      </div>
      {/* search + register button + profile */}
      <div className="flex-1 justify-end gap-2">
        <Search />
        <Button
          link="/signup"
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
              <img src={profilePic} alt="profilePic" />
            </div>
          </div>
          <Dropdown
            dropDownItems={profileMenuItems}
            className="w-44 menu-sm mt-3"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
