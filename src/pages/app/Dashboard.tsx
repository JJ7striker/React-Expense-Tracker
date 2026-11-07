import { useEffect, useState } from "react"
import { auth, db } from "../../firebase/firebase.ts"
import { Auth } from "../../context/AuthContext.tsx"
import { onSnapshot, collection, query, where } from "firebase/firestore"
import { Loader } from "lucide-react"
import type { Transaction } from "../../components/types";

const Dashboard = () => {
  // const date = new Date()
  //  const currentDate = date.toISOString().split("T")[0];
  const [data, setData] = useState<Transaction[]>([]);
  const { userInfo } = Auth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo?.uid) {
      return;
    }
    const dbCollection = collection(db, "transactions");
    const q = query(dbCollection, where("uid", "==", userInfo.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData: Transaction[] = snapshot.docs.map(data => (
        {id: data.id, ...data.data()}
      )) as Transaction[];
      setData(userData);
      setLoading(false);
    })
    return unsubscribe;
  }, [userInfo?.uid]);



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
        <h1 className="text-l mt-3 font-medium text-gray-800">{auth?.currentUser?.metadata?.creationTime === auth?.currentUser?.metadata?.lastSignInTime ? `Welcome to TaskFlow ${userInfo?.displayName?.split(" ")[0]}` : `Welcome Back ${userInfo?.displayName?.split(" ")[0]}`}</h1>
        {/* <input type="date" className="w-2/5 md:w-1/5 rounded-sm shadow-sm shadow-gray-400 p-2" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} /> */}
      </div>

      <div className="w-full h-auto flex items-center px-8 flex-col md:flex-row mt-6 justify-around gap-8">
          {cards.map(card => (
            <div className="w-full flex flex-col shadow-sm rounded-lg shadow-gray-400 gap-2 items-start px-4 py-5" key={card.title}>
              <h2 className="text-2xl font-medium">{card.title}</h2>
              <span className={`text-4xl font-medium ${card.color}`}>${loading ? <Loader className="animate-spin" /> : card.amount.toFixed(2)}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Dashboard