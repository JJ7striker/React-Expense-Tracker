import { Loader, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button.tsx'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Auth } from '../context/AuthContext';
import { NativeSelect, NativeSelectOption } from './ui/native-select';
import { addDoc, collection } from "firebase/firestore"
import { db } from '../firebase/firebase';
import { serverTimestamp } from 'firebase/firestore';

const AddFormModal = ({ setIsModalOpen }) => {
  const { trasactionObj, setTransactionObj, userInfo } = Auth();
  const currentDate = new Date().toISOString().split("T")[0];
  const [loading, setLoading ] = useState(false);

  const addTransactions = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const docRef = collection(db, "transactions");
      const data = await addDoc(docRef, {...trasactionObj, createdAt: serverTimestamp(), uid: userInfo?.uid});
      console.log(data);
    } catch(err) {
      console.log("Error adding document, ", err);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setTransactionObj({
        type: "expense",
    description: "",
    amount: "",
    category: "",
    date: currentDate,
    notes: ""
      })
    }
  }



  return (
    <div className='w-full min-h-screen fixed inset-0 z-50 backdrop-blur-md flex justify-center py-5 overflow-y-auto'>
      <div className='w-11/12 max-w-lg shadow-sm relative shadow-gray-400 py-3 px-4 bg-white rounded-sm my-auto h-fit overflow-y-auto'>
      <h2 className='text-center font-medium text-xl'>Create Transaction</h2>
      <X onClick={() => setIsModalOpen(false)} className='absolute top-3 left-5' />
      <div className='w-full flex items-center gap-5 mt-4'>
        <Button className={`flex-1 shadow-sm shadow-gray-400 ${trasactionObj.type === "expense" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`} variant={"ghost"} onClick={() => setTransactionObj(prevObj => ({...prevObj, type: "expense"}))}>Expense</Button>
        <Button className={`flex-1 shadow-sm shadow-gray-400 ${trasactionObj.type === "income" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`} variant={"ghost"} onClick={() => setTransactionObj(prevObj => ({...prevObj, type: "income"}))}>Income</Button>
        <input type="hidden" onChange={(e) => setTransactionObj(prevObj => ({...prevObj, type: e.target.value}))} value={trasactionObj.type} />
      </div>
      <form className='w-full h-auto flex flex-col mt-5 items-center px-6 gap-5' onSubmit={addTransactions}>
        <div className='w-full flex flex-col items-start gap-2'>
          <label htmlFor="description" className='text-sm font-medium'>Description</label>
          <Input type='text' id='description' className='text-sm shadow-sm shadow-gray-400' onChange={(e) => setTransactionObj(prevObj => ({...prevObj, description: e.target.value}))} value={trasactionObj.description} placeholder='Enter Description' />
        </div>
        <div className='w-full flex flex-col items-start gap-2'>
          <label htmlFor="amount" className='text-sm font-medium'>Amount</label>
          <Input type='number' id='amount' className='text-sm shadow-sm shadow-gray-400' onChange={(e) => setTransactionObj(prevObj => ({...prevObj, amount: e.target.value}))} value={trasactionObj.amount} placeholder='0' />
        </div>

        <div className='w-full flex flex-col items-start gap-2'>
          <label htmlFor="amount" className='text-sm font-medium'>Category</label>
          <NativeSelect id='amount' className='w-full text-sm shadow-sm rounded-sm shadow-gray-400' onChange={(e) => setTransactionObj(prevObj => ({...prevObj, category: e.target.value}))} value={trasactionObj.category}>
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
          <NativeSelectOption value={"Job"}>Job</NativeSelectOption>
          </NativeSelect>
        </div>


        <div className='w-full flex flex-col items-start gap-2'>
          <label htmlFor="date" className='text-sm font-medium'>Date</label>
          <Input type='date' id='date' className='text-sm shadow-sm shadow-gray-400' onChange={(e) => setTransactionObj(prevObj => ({...prevObj, date: e.target.value}))} value={trasactionObj.date} placeholder='0' />
        </div>

        <div className='w-full flex flex-col items-start gap-2'>
          <label htmlFor="notes" className='text-sm font-medium'>Notes</label>
          <Textarea className='text-sm shadow-sm shadow-gray-400' onChange={(e) => setTransactionObj(prevObj => ({...prevObj, notes: e.target.value}))} value={trasactionObj.notes} placeholder='Enter Notes Here'></Textarea>
        </div>
        <Button variant={"ghost"} className={"bg-blue-600 text-white w-4/5"} type='submit'>{loading ? <Loader className='animate-spin' /> : "Add Transaction"}</Button>
      </form>
      </div>
    </div>
  )
}

export default AddFormModal