import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import AddBudgetForm from "../../components/AddBudgetForm";
import BudgetCard from "../../components/BudgetCard";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Auth } from "../../context/AuthContext";
import EditBudget from "../../components/EditBudget";
import { Loader } from "lucide-react";

const Budgets = () => {
  const [totalData, setTotalData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isOpen, setIsOpen, userInfo } = Auth();

  const transactionRef = collection(db, "transactions");
  const budgetsRef = collection(db, "budgets");

  useEffect(() => {
    const q = query(transactionRef, where("uid", "==", userInfo?.uid))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map((data) => ({
        id: data.id,
        ...data.data(),
      }));
      setTotalData(userData);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(budgetsRef, where("uid", "==", userInfo?.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map((data) => ({
        id: data.id,
        ...data.data(),
      }));
      setBudgetData(userData);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const categoryAmt = (category: string) => {
    const categoryArr = totalData.filter(
      (data) => data?.category === category && data?.type === "expense",
    );
    const categoryAmtValue = categoryArr.reduce((total, data) => {
      const amt = Number(data?.amount);
      return total + amt;
    }, 0);
    return categoryAmtValue;
  };

  return (
    <div className="w-full min-h-screen px-5 py-6">
      <div className="w-full flex justify-between gap-4 items-center">
        <div className="flex items-start flex-col gap-1">
          <h2 className="text-xl font-medium">Budget</h2>
          <p className="text-sm">
            Set a spending limit for a category and track your progress
          </p>
        </div>
        <Button
          className={"bg-blue-600 text-white w-auto md:w-[15%]"}
          variant={"outline"}
          onClick={() => setIsOpen(0)}
        >
          + Add Budget
        </Button>
        {isOpen === 0 && <AddBudgetForm setIsOpen={setIsOpen} />}
        {isOpen === 1 && (
          <EditBudget budgetData={budgetData} setIsOpen={setIsOpen} />
        )}
      </div>

      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center mt-6 px-5">
        {loading ? (
          <Loader className="animate-spin" />
        ) : budgetData.length === 0 && !loading ? (
          <p>Create A Budget...</p>
        ) : (
          budgetData.map((data) => (
            <BudgetCard
              data={data}
              key={data?.id}
              loading={loading}
              spent={categoryAmt}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Budgets;
