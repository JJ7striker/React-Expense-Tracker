import { useState } from "react";
import BudgetModal from "./BudgetModal";

const BudgetCard = ({ data, loading, spent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    
  const spentInfo = spent(data?.category);


  return (
    <div className="w-full py-3 px-10 flex flex-col gap-4 shadow-sm relative shadow-gray-300 rounded-lg">
      <div className="w-full flex items-center justify-between ">
              <h2 className="text-lg text-blue-600 font-medium text-center">{data?.category}</h2>
              <span className="text-lg font-bold cursor-pointer" onClick={() => setIsModalOpen(true)}>...</span>
              {isModalOpen && <BudgetModal data={data} setIsModalOpen={setIsModalOpen} />}
              </div>

              <div className="w-full flex items-center justify-between gap-10">
                <span className="text-sm font-bold">Monthly Budget</span>
                <span className="text-lg text-blue-600 font-medium">${data?.amount}</span>
              </div>

              <div className="w-full flex items-center justify-between gap-10">
                <span className="text-sm font-bold">Spent</span>
                <span className="text-2xl text-blue-600 font-medium">${spentInfo}</span>
              </div>



            </div>
  )
}

export default BudgetCard