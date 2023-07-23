import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MenuItem = ({ option, onClick }) => {
  const link = `${option.toLowerCase()}`;
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          to={`/${link}`}
          onClick={onClick}
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "flex items-center justify-start px-4 w-full py-2 text-sm "
          )}
        >
          {option}
        </Link>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
