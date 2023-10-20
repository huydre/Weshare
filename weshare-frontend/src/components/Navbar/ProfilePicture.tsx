import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Switch,
  User,
} from "@nextui-org/react";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import Link from "next/link";
import { logoutRedux } from "@/redux/reducers/auth.slice";

interface Props {
  user: any;
  image: string;
  show: () => void;
}

export const ProfilePicture = ({ image, show, user }: Props) => {
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState(() => {
    if (localStorage.getItem("theme") === "dark") return false;
    return true;
  });

  const handleTheme = () => {
    setToggle(!toggle);
    document.documentElement.classList.toggle("dark");
    if (localStorage.getItem("theme") === "light") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.remove("dark");
  } else if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  return (
    <div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
          <DropdownItem key="team_settings">
            <Link href={`/profile/${user.id}`}>My Information</Link>
          </DropdownItem>
          <DropdownItem key="settings">
            <div className="flex items-center justify-between">
              <div>Darkmode</div>
              <div>
               <Switch size="sm" isSelected={!toggle}  onClick={handleTheme}/>
              </div>
            </div>
          </DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={() => dispatch(logoutRedux())}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
