import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { navMenuItems } from "./IMenuItem";
import Dropdown from "../shared/Dropdown";

const MenuItems = () => {
  const [hasClickedServices, setHasClickedServices] = useState(false);

  // Scroll to the section only if the user clicked the "خدمات ما" link
  useEffect(() => {
    if (location.hash === "#services" && hasClickedServices) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      // Reset the state after scrolling
      setHasClickedServices(false);
    }
  }, [location, hasClickedServices]);

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
                <a
                  href={`/${menuItem.link}`}
                  onClick={() => {
                    if (menuItem.link === "/#services") {
                      setHasClickedServices(true); // Set state when "خدمات ما" is clicked
                    }
                  }}
                >
                  {menuItem.text}
                </a>
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
          <i className="maicon-ic_sharp-sort text-lg"></i>
        </div>
        <Dropdown
          dropDownItems={navMenuItems.filter((f) => !f.link.startsWith("#"))}
          className="w-48 menu-sm mt-3"
        />
      </div>
    </nav>
  );
};

export default MenuItems;
