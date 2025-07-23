import { useDraggable } from "@dnd-kit/core";
import TableIcon from "../../assets/table-restaurant.svg?react";

type SideBarProps = {
  activeId: string | null;
};

const SideBar = ({ activeId }: SideBarProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: "table-id",
  });
  return (
    <div>
      <h2>Objects List</h2>
      <div className="relative h-40">
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className="p-2 cursor-pointer shadow-2xl bg-white border border-gray-200 rounded-2xl inline-block"
        >
          <TableIcon
            className={`w-10 h-10 text-blue-500 fill-current transition-all duration-200 ${
              activeId === "table-id" ? "opacity-50" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
