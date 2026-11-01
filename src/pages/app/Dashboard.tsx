import { useEffect, useState } from "react"
import { auth, db } from "../../../firebase/firebase"
import { Auth } from "../../../context/AuthContext"
import { onSnapshot, collection } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { Loader } from "lucide-react"

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { userInfo } = Auth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "transactions"), (snapshot) => {
      const userData = snapshot.docs.map(data => (
        {id: data.id, ...data.data()}
      ))
      setData(userData);
      setLoading(false);
    })
    return unsubscribe;
  }, [])



  const filteredIncome = data?.filter(data => data?.type === "income");
  const filteredExpense = data?.filter(data => data?.type === "expense");

  const reducedIncome = filteredIncome.reduce((total, data) => {
    const amount = Number(data?.amount);
    return total + amount;
  }, 0)

    const reducedExpense = filteredExpense.reduce((total, data) => {
    const amount = Number(data?.amount);
    return total + amount;
  }, 0)

  const balance = reducedIncome - reducedExpense;

  const cards = [
    {
      title: "Total Balance",
      amount: balance,
      color: "text-blue-700"
    },
    {
      title: "Total Income",
      amount: reducedIncome,
      color: "text-green-700"
    },
    {
      title: "Total Expenses",
      amount: reducedExpense,
      color: "text-red-700"
    }
  ]
  

  return (
    <div className="w-full min-h-screen px-2 py-3">
      <h2 className="text-lg font-medium text-gray-700">Dashboard</h2>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-l mt-3 font-medium text-gray-800">{auth?.currentUser?.metadata?.creationTime === auth?.currentUser?.metadata?.lastSignInTime ? `Welcome to TaskFlow ${userInfo?.displayName.split(" ")[0]}` : `Welcome Back ${userInfo?.displayName.split(" ")[0]}`}</h1>
        <input type="date" className="w-2/5 md:w-1/5 rounded-sm shadow-sm shadow-gray-400 p-2" />
      </div>

      <div className="w-full h-auto flex items-center px-8 flex-col md:flex-row mt-6 justify-around gap-8">
          {cards.map(card => (
            <div className="w-full flex flex-col shadow-sm rounded-lg shadow-gray-400 gap-2 items-start px-4 py-5" key={card.title}>
              <h2 className="text-2xl font-medium">{card.title}</h2>
              <span className={`text-4xl font-medium ${card.color}`}>${loading ? <Loader className="animate-spin" /> : card.amount}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Dashboard