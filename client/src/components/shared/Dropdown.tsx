import { Link } from "react-router-dom";

import { IMenuItem } from "../header/IMenuItem";

interface Props {
  dropDownItems: IMenuItem[];
  className: string;
}

const Dropdown = ({ dropDownItems, className }: Props) => {
  return (
    <ul
      tabIndex={0}
      className={
        "menu dropdown-content rounded-box z-[1] p-2 border shadow " + className
      }
    >
      {dropDownItems.map((menuItem) => (
        <li
          key={menuItem.id}
          className="text-neutrals700 hover:text-neutrals500"
        >
          <Link to={menuItem.link}>{menuItem.text}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
