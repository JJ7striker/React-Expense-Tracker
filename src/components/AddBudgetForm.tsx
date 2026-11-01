import { Loader, X } from "lucide-react"
import { NativeSelect, NativeSelectOption } from "./ui/native-select"
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const AddBudgetForm = ({ setIsOpen }) => {
   const date = new Date;
  const currentDate = date.toISOString().split("T")[0];
  const [budgetInfo, setBudgetInfo] = useState({
    category: "",
    amount: "",
    date: currentDate
  })
   const [isLoading, setIsLoading] = useState(false);
 
  const addBudgetData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const docRef = collection(db, "budgets");
      await addDoc(docRef, budgetInfo);
    } catch(err) {
      console.log("Error creating buget ", err);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }

  return (
    <div className='w-full min-h-screen fixed inset-0 z-50 backdrop-blur-md flex justify-center py-5 overflow-y-auto'>
    <div className="w-11/12 h-auto max-w-lg py-3 px-8 relative shadow-sm shadow-gray-700 bg-white rounded-sm">
    <X className="absolute top-2 left-3" onClick={() => setIsOpen(null)} />
        <h2 className="text-lg text-center font-medium">Add Budget</h2>
        <form className="w-full h-auto flex flex-col items-center gap-5 my-5" onSubmit={addBudgetData}>
            <div className="flex items-start flex-col gap-2 w-full">
                <label htmlFor="category" className="text-sm">Category</label>
                <NativeSelect id='category' className='w-full text-sm shadow-sm rounded-sm shadow-gray-400' onChange={(e) => setBudgetInfo(prevBudgetInfo => ({...prevBudgetInfo, category: e.target.value}))} value={budgetInfo.category}>
          <NativeSelectOption value={""}>Select Category</NativeSelectOption>
          <NativeSelectOption value={"🏠 Housing"}>🏠 Housing</NativeSelectOption>
          <NativeSelectOption value={"🍔 Food & Dining"}>🍔 Food & Dining</NativeSelectOption>
          <NativeSelectOption value={"🚗 Transportation"}>🚗 Transportation</NativeSelectOption>
          <NativeSelectOption value={"💡 Bills & Utilities"}>💡 Bills & Utilities</NativeSelectOption>
          <NativeSelectOption value={"🛍️ Shopping"}>🛍️ Shopping</NativeSelectOption>
          <NativeSelectOption value={"🎬 Entertainment"}>🎬 Entertainment</NativeSelectOption>
          <NativeSelectOption value={"✈️ Travel"}>❤️ Health & Wellness</NativeSelectOption>
          <NativeSelectOption value={"📚 Education"}>📚 Education</NativeSelectOption>
          <NativeSelectOption value={"💻 Work & Business"}>💻 Work & Business</NativeSelectOption>
          <NativeSelectOption value={"💳 Financial"}>💳 Financial</NativeSelectOption>
          </NativeSelect>
            </div>

            <div className="flex items-start flex-col gap-2 w-full">
              <label htmlFor="amount">
                Monthly Budget
              </label>
              <Input type="number" id="amount" className="w-full shadow-sm shadow-gray-500" placeholder="0" onChange={(e) => setBudgetInfo(prevBudgetInfo => ({...prevBudgetInfo, amount: e.target.value}))} value={budgetInfo.amount} />
            </div>

            <div className="flex items-start flex-col gap-2 w-full">
              <label htmlFor="date">
                Date
              </label>
              <Input type="date" id="date" className="w-full shadow-sm shadow-gray-500" placeholder="0" onChange={(e) => setBudgetInfo(prevBudgetInfo => ({...prevBudgetInfo, date: e.target.value}))} value={budgetInfo.date} />
            </div>
            <Button className={"w-3/5 bg-blue-600 text-white"} variant={"outline"} type="submit">{isLoading ? <Loader className="animate-spin" /> : "Create Budget"}</Button>
        </form>
    </div>
    </div>
  )
}

export default AddBudgetForm