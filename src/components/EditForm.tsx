import { Loader, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Auth } from '../context/AuthContext';
import { NativeSelect, NativeSelectOption } from './ui/native-select';
import { doc, updateDoc } from "firebase/firestore"
import { db } from '../firebase/firebase';
import { serverTimestamp } from 'firebase/firestore';

const AddFormModal = ({ setIsFormOpen, data, setIsButtonCardOpen }) => {
  const { trasactionObj, setTransactionObj } = Auth();
  const date = new Date;
  const [loading, setLoading ] = useState(false);
  const [editForm, setEditForm] = useState({
      type: data?.type,
      description: data?.description,
      amount: data?.amount,
      category: data?.category,
      date: data?.date,
      notes: data?.notes
      
    })

  const editTransactions = async (e, id) => {
    e.preventDefault()
    setLoading(true);
    try {
      const docRef = doc(db, "transactions", id);
      const data = await updateDoc(docRef, {...editForm, lastUpdated: serverTimestamp()});
      console.log(data);
    } catch(err) {
      console.log("Error updating document, ", err);
    } finally {
      setLoading(false);
      setIsFormOpen(false)
      setIsButtonCardOpen(false);
    }
  }


  return (
    <div className='w-full min-h-screen fixed inset-0 z-50 backdrop-blur-md flex justify-center py-5 overflow-y-auto'>
      <div className='w-11/12 max-w-lg shadow-sm relative shadow-gray-400 py-3 px-4 bg-white rounded-sm my-auto h-fit overflow-y-auto'>
      <h2 className='text-center font-medium text-xl'>Edit Transaction</h2>
      <X onClick={() => setIsFormOpen(false)} className='absolute top-3 left-5' />
      <div className='w-full flex items-center gap-5 mt-4'>
        <Button className={`flex-1 shadow-sm shadow-gray-400 ${editForm.type === "expense" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`} variant={"ghost"} onClick={() => setEditForm(prevObj => ({...prevObj, type: "expense"}))}>Expense</Button>
        <Button className={`flex-1 shadow-sm shadow-gray-400 ${editForm.type === "income" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`} variant={"ghost"} onClick={() => setEditForm(prevObj => ({...prevObj, type: "income"}))}>Income</Button>
        <input type="hidden" onChange={(e) => setEditForm(prevObj => ({...prevObj, type: e.target.value}))} value={editForm.type} />
      </div>

      <form className='w-full h-auto flex flex-col mt-5 items-center px-6 gap-5' onSubmit={(e) => editTransactions(e, data?.id)}>
        <div className='w-full flex flex-col items-start gap-2'>
          <label htmlFor="description" className='text-sm font-medium'>Description</label>
          <Input type='text' id='description' className='text-sm shadow-sm shadow-gray-400' onChange={(e) => setEditForm(prevObj => ({...prevObj, description: e.target.value}))} value={editForm.description} placeholder='Enter Description' />
        </div>

        
        <div className='w-full flex flex-col items-start gap-2'>
          <label htmlFor="amount" className='text-sm font-medium'>Amount</label>
          <Input type='number' id='amount' className='text-sm shadow-sm shadow-gray-400' onChange={(e) => setEditForm(prevObj => ({...prevObj, amount: e.target.value}))} value={editForm.amount} placeholder='0' />
        </div>


        <div className='w-full flex flex-col items-start gap-2'>
          <label htmlFor="amount" className='text-sm font-medium'>Category</label>
          <NativeSelect id='amount' className='w-full text-sm shadow-sm rounded-sm shadow-gray-400' onChange={(e) => setEditForm(prevObj => ({...prevObj, category: e.target.value}))} value={editForm?.category}>
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
          <Input type='date' id='date' className='text-sm shadow-sm shadow-gray-400' onChange={(e) => setEditForm(prevObj => ({...prevObj, date: e.target.value}))} value={editForm?.date} placeholder='0' />
        </div>

        <div className='w-full flex flex-col items-start gap-2'>
          <label htmlFor="notes" className='text-sm font-medium'>Notes</label>
          <Textarea className='text-sm shadow-sm shadow-gray-400' onChange={(e) => setEditForm(prevObj => ({...prevObj, notes: e.target.value}))} value={editForm.notes} placeholder='Enter Notes Here'></Textarea>
        </div>
        <Button variant={"ghost"} className={"bg-blue-600 text-white w-4/5"} type='submit'>{loading ? <Loader className='animate-spin' /> : "Edit Transaction"}</Button>
      </form>
      </div>
    </div>
  )
}

export default AddFormModal