import { ReactElement } from "react";

export default function SidebarItem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex text-gray-700 py-2 items-center cursor-pointer hover:bg-gray-200 rounded-lg max-w-48 pl-4 transition-all duration-100">
      <div className="p-2">{icon}</div>
      <div className="">{text}</div>
    </div>
  );
}
