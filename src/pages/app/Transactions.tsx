import { Loader, Search } from "lucide-react"
import { useEffect, useState } from "react"
import DataRow from "../../components/DataRow";
import AddForm from "./AddForm";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const Transactions = () => {
  const [currentTab, setCurrentTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState("All");
  const [search, setSearch] = useState("");

  const example = [
    {
      date: "12th, dec, 2023",
      description: "Hello World",
      category: "Food and Dining",
      amount: "12000",
      type: "Expense"
    },
    {
      date: "12th, dec, 2023",
      description: "Hello World",
      category: "Food and Dining",
      amount: "12000",
      type: "Expense"
    },

  ]


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "transaction"), (snapshot) => {
      const data = snapshot.docs.map(data => (
        {id: data.id, ...data.data()}
      ))
      const filteredData = data.filter(data => (currentTab === "all" || currentTab === data?.type) &&  (categories === "All" || categories === data?.category) && search.includes(search.toLocaleLowerCase()));
      setData(filteredData);
      setLoading(false);
      
    })

  return unsubscribe
  }, [currentTab, categories, search])

  return (
    <div className="px-3 py-5">
      <div className="w-4/5 md:w-3/5 h-8 flex items-center gap-3 pl-3 bg-gray-100 shadow-lg shadow-gray-300 rounded-sm">
      <Search className="size-4" />
      <input type="text" className="w-4/5 md:flex-1 outline-0 border-0 py-1 px-3 h-full" placeholder="Search for transactions..." onChange={(e) => setSearch(e.target.value)} value={search} />
      </div>

      <div className="w-full flex justify-between items-center">
      <h1 className="text-lg font-medium text-gray-700 ">Transactions</h1>
      <button className="outline-0 border-0 bg-blue-700 rounded-sm px-3 py-1 text-white my-5 md:my-2 hover:bg-white hover:text-blue-700 transition-all duration-200 ease-in-out" onClick={() => setIsModalOpen(true)}>+ Create Transaction</button>
      </div>


      <div className="w-full h-9 px-3 py-2 mt-8 flex items-center gap-4">
        <div className="grid grid-cols-2 items-center gap-3 w-full md:grid-cols-3 md:px-6">
        <select name="category"
              id="category"
              className="outline-0 border-0 bg-gray-200 rounded-sm px-3 py-2" onChange={(e) => setCategories(e.target.value)} value={categories}>
              <option value="Select Category" selected disabled>
                Select Category
              </option>
              <option value="All">All</option>
              <option value="🏠 Housing">🏠 Housing</option>
              <option value="🍔 Food & Dining">🍔 Food & Dining</option>
              <option value="🚗 Transportation">🚗 Transportation</option>
              <option value="💡 Bills & Utilities">💡 Bills & Utilities</option>
              <option value="🛍️ Shopping">🛍️ Shopping</option>
              <option value="❤️ Health & Wellness">❤️ Health & Wellness</option>
              <option value="🎬 Entertainment">🎬 Entertainment</option>
              <option value="✈️ Travel">✈️ Travel</option>
              <option value="📚 Education">📚 Education</option>
        </select>
      </div>

      </div>

      <div className="w-full flex items-center justify-start mt-15 md:10">
         <button className={`h-8 w-30 px-2 py-1 shadow-sm shadow-gray-400 ${currentTab === "all" ? "shadow-0 bg-gray-300" : ""}`} onClick={() => setCurrentTab("all")} >All</button>
         <button className={`h-8 w-30 px-2 py-1 shadow-sm shadow-gray-400 ${currentTab === "income" ? "bg-gray-300 shadow-0" : ""}`} onClick={() => setCurrentTab("income")}>Income</button>
         <button className={`h-8 w-30 px-2 py-1 shadow-sm shadow-gray-400 ${currentTab === "expense" ? "shadow-0 bg-gray-300" : ""}`} onClick={() => setCurrentTab("expense")}>Expenses</button>
      </div>

      <div className="overflow-x-auto w-full h-auto">
     <table className="w-[1000px] border-spacing-8 my-7 border-separate table-fixed font-extralight">
      <tr className=" w-full ">
        <th className="text-center font-medium">Date</th>
        <th className="font-medium text-center">Description</th>
        <th className="font-medium">Category</th>
        <th className="font-medium">Amount</th>
        <th className="font-medium">Type</th>
        <th className="font-medium text-center">Actions</th>
      </tr>

      {isModalOpen && <AddForm setIsModalOpen={setIsModalOpen} />}

      {loading ? <Loader className="size-8 text-center block mx-auto animate-spin" /> : data.filter(data => data?.description.toLowerCase().includes(search.toLowerCase())).map(row => (
        <DataRow key={row?.type} row={row} />
      ))}
     </table>
     </div>
    </div>
  )
}

export default Transactions