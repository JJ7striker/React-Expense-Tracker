import { Button } from "./ui/button"
import { useState } from "react";
import EditForm from "../components/EditForm"
import { X } from "lucide-react";
import type { Budget } from "./types";

interface ButtonModalProps {
  deleteItem: (id: string) => void;
  id: string;
  data: Budget;
}

const ButtonModal = ({ deleteItem, id, data }: ButtonModalProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
   const [isButtonCardOpen, setIsButtonCardOpen] = useState(false);
  return (
      <td className="text-center relative">
          <span className="font-medium "  onClick={() => setIsButtonCardOpen(true)}>...</span>

        {isButtonCardOpen && <div className="absolute right-1 bg-white z-50 shadow-sm rounded-sm shadow-gray-400 h-auto flex items-center gap-4 px-6 py-4">  
          <X className="absolute top-1 left-1 size-5 rounded-full p-0.5 border-2 border-gray-700" onClick={() => setIsButtonCardOpen(false)} />   
      <Button className={"bg-red-500 text-white"} variant={"ghost"} onClick={() => deleteItem(id)}>Delete</Button>
      <Button className={"bg-green-500 text-white"} variant={"ghost"} onClick={() => setIsFormOpen(true)}>Update</Button>
      </div>}
      {isFormOpen && <EditForm setIsFormOpen={setIsFormOpen} setIsButtonCardOpen={setIsButtonCardOpen} data={data} />}
      </td>
    
  )
}

export default ButtonModal