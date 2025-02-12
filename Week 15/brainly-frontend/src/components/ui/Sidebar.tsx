import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
      <div className="flex text-2xl font-semibold pt-8 items-center">
        <div className="pr-2 text-purple-600">
          <Logo size="xl" />
        </div>
        Brainly
      </div>
      <div className="pt-8 pl-4">
        <SidebarItem icon={<TwitterIcon />} text="Twitter" />
        <SidebarItem icon={<YoutubeIcon />} text="Youtube" />
      </div>
    </div>
  );
}

export default Sidebar;
