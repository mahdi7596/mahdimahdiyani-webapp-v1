import { Link } from "react-router-dom";

interface Props<T> {
  dropDownItems: T[];
  className: string;
}

const Dropdown = <T,>({ dropDownItems, className }: Props<T>) => {
  return (
    <ul
      tabIndex={0}
      className={
        "menu dropdown-content rounded-box z-[1] p-2 shadow " + className
      }
    >
      {dropDownItems.map((menuItem) => (
        <li
          key={menuItem.id}
          className="text-neutrals700 hover:text-neutrals500"
        >
          <Link to={(menuItem as { link: string }).link}>{menuItem.text}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
