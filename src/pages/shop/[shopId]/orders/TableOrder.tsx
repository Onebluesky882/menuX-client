import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Edit, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

// Initial sample tables data
const initialTables = [
  { id: "1", name: "A1", status: "available" },
  { id: "2", name: "A2", status: "available" },
  { id: "3", name: "A3", status: "available" },
  { id: "4", name: "B1", status: "available" },
  { id: "5", name: "B2", status: "available" },
  { id: "6", name: "VIP-1", status: "available" },
  { id: "7", name: "VIP-2", status: "available" },
];

const TableSetup = () => {
  const [tables, setTables] = useState(initialTables);
  const [editingTable, setEditingTable] = useState<string | null>(null);
  const [newTableName, setNewTableName] = useState("");

  // Function to handle editing table name
  const handleEditTable = (tableId: string, currentName: string) => {
    setEditingTable(tableId);
    setNewTableName(currentName);
  };

  // Function to save edited table name
  const handleSaveTableName = (tableId: string) => {
    if (!newTableName.trim()) {
      toast.error("Table name cannot be empty");
      return;
    }

    setTables(
      tables.map((table) =>
        table.id === tableId ? { ...table, name: newTableName } : table
      )
    );

    setEditingTable(null);
    setNewTableName("");
    toast.success("Table name updated successfully");
  };

  // Function to add new table
  const handleAddTable = () => {
    const newTable = {
      id: String(tables.length + 1),
      name: `Table ${tables.length + 1}`,
      status: "available",
    };

    setTables([...tables, newTable]);
    toast.success("New table added successfully");
  };

  // Function to delete table
  const handleDeleteTable = (tableId: string) => {
    setTables(tables.filter((table) => table.id !== tableId));
    toast.success("Table deleted successfully");
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Table Management</h1>
          <p className="text-gray-600">
            Configure your restaurant tables and QR codes
          </p>
        </div>
        <Button
          onClick={handleAddTable}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Table
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tables.map((table) => (
          <Card key={table.id} className="border border-gray-200">
            <CardContent className="p-6">
              {editingTable === table.id ? (
                <div className="space-y-3">
                  <Label htmlFor={`table-name-${table.id}`}>Table Name</Label>
                  <Input
                    id={`table-name-${table.id}`}
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    autoFocus
                  />
                  <div className="flex justify-end mt-4">
                    <Button
                      onClick={() => handleSaveTableName(table.id)}
                      size="sm"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <QrCode className="h-6 w-6 text-orange-600" />
                      </div>
                      <h3 className="text-lg font-medium">{table.name}</h3>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEditTable(table.id, table.name)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteTable(table.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg flex justify-center">
                    <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg w-full flex flex-col items-center">
                      <QrCode className="h-16 w-16 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 text-center">
                        QR Code for {table.name}
                      </p>
                      <Button variant="outline" size="sm" className="mt-3">
                        Download QR
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TableSetup;
