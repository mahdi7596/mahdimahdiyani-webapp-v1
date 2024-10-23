const Dropdown = () => {
  return (
    <div className="hidden dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full border border-gray-200">
          {/* <img alt="Tailwind CSS Navbar component" src={profilePic} /> */}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content rounded-box border z-[1] mt-3 w-32 p-2 shadow"
      >
        {/* {profileMenuItems.map((menuItem) => (
          <li
            key={menuItem.id}
            className="text-neutrals700 hover:text-neutrals500"
          >
            <Link to={menuItem.link}>{menuItem.text}</Link>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default Dropdown;
