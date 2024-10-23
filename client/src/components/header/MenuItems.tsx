import { Link } from "react-router-dom";
import { navMenuItems } from "./IMenuItem";

const MenuItems = () => {
  return (
    <nav className="flex">
      {/* desktop */}
      <ul className="hidden lg:flex menu menu-horizontal">
        {navMenuItems.map((menuItem) => (
          <li
            key={menuItem.id}
            className="text-neutrals700 hover:text-neutrals500"
          >
            <Link to={menuItem.link}>{menuItem.text}</Link>
          </li>
        ))}
      </ul>
      {/* mobile */}
      <div className="lg:hidden dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          {navMenuItems.map((menuItem) => (
            <li key={menuItem.id}>
              <Link to={menuItem.link}>{menuItem.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MenuItems;
