import { Link } from "react-router-dom";
import { navMenuItems } from "./IMenuItem";
import Dropdown from "../shared/Dropdown";

const MenuItems = () => {
  return (
    <nav className="flex">
      {/* desktop */}
      <ul className="hidden lg:flex menu menu-horizontal">
        {navMenuItems
          .filter((menuItem) => !menuItem.mobileOnly)
          .map((menuItem) => (
            <li
              key={menuItem.id}
              className="text-neutrals500 hover:text-neutrals"
            >
              {menuItem.link.startsWith("#") ? (
                <a href={menuItem.link}>{menuItem.text}</a>
              ) : (
                <Link to={menuItem.link}>{menuItem.text}</Link>
              )}
            </li>
          ))}
      </ul>
      {/* mobile */}
      <div className="lg:hidden dropdown">
        {/* hamburgermenu */}
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <i className="maicon-hamburgermenu text-lg"></i>
        </div>
        <Dropdown dropDownItems={navMenuItems} className="w-48 menu-sm mt-3" />
      </div>
    </nav>
  );
};

export default MenuItems;
