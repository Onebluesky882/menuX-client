import { useDroppable } from "@dnd-kit/core";
import TableIcon from "../../assets/table-restaurant.svg?react";

type buildingGridsProps = {
  rows: number;
  columns: number;
  onClick: (index: number) => void;
  droppedTables: { [key: number]: string };
  dragOverId: string | null;
};

const BuildingGrids = ({
  columns,
  rows,
  onClick,
  droppedTables,
  dragOverId,
}: buildingGridsProps) => {
  const grids = [];

  for (let row = 0; row < rows; row++) {
    const rowItems = [];
    for (let col = 0; col < columns; col++) {
      const index = row * columns + col;

      const { setNodeRef } = useDroppable({
        id: index.toString(),
      });

      rowItems.push(
        <div
          key={index}
          ref={setNodeRef}
          onClick={() => onClick(index)}
          onDragOver={(e) => e.preventDefault()}
          className={`flex justify-center border items-center w-8 h-8 text-center text-[6px] rounded-full ${
            dragOverId === index.toString()
              ? "bg-green-300 border-white text-black font-bold"
              : "bg-gray-50 text-gray-500"
          } hover:bg-green-200 hover:border-white hover:text-black hover:font-bold`}
        >
          {droppedTables[index] ? (
            <TableIcon className="w-6 h-6 text-blue-500 fill-current" />
          ) : (
            index
          )}
        </div>
      );
    }

    grids.push(
      <div className="flex gap-1 m-2" key={`row-${row}`}>
        {rowItems}
      </div>
    );
  }
  return <div>{grids}</div>;
};

export default BuildingGrids;
