import React from 'react'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { Auth } from '../context/AuthContext'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const BudgetModal = ({ setIsModalOpen, data }) => {
  const { setIsOpen, setEditBudgetData, editBudgetData } = Auth();

  const deleteData = async (id) => {
    try {
      const docRef = doc(db, "budgets", id);
      await deleteDoc(docRef);
    } catch(err) {
      console.log("Error deleting budget, ", err)
    }
  }

  return (
    <div className='w-auto flex items-center absolute right-3 top-3 p-4 shadow-sm shadow-gray-400 z-50 gap-2 bg-white rounded-lg'>
        <X className='size-4 absolute top-1 left-1' onClick={() => setIsModalOpen(false)} />
        <Button className={"bg-blue-600 text-white font-bold text-lg"} variant={"outline"} onClick={() => {deleteData(data?.id)}}>Delete</Button>
        <Button className={"bg-blue-600 text-white font-bold text-lg"} variant={"outline"} onClick={() => {setIsOpen(1); setIsModalOpen(false); setEditBudgetData(data)}}>Update</Button>
    </div>
  )
}

export default BudgetModal