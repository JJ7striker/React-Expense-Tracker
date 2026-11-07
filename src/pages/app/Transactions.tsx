import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import AddFormModal from "../../components/AddFormModal";
import { Input } from "../../components/ui/input";
import { Loader, Search } from "lucide-react";
import {
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import {
  NativeSelect,
  NativeSelectOption,
} from "../../components/ui/native-select";
import ButtonModal from "../../components/ButtonModal";
import { Auth } from "../../../context/AuthContext";

interface TransactionData {
  amount: string,
  category: string,
  createdAt: string,
  date: string,
  description: string,
  notes: string,
  type: string
}

const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [select, setSelect] = useState("all");

  const { userInfo } = Auth();

  const dbCollection = collection(db, "transactions");

  useEffect(() => {
    if (!userInfo?.uid) {
      return;
    }
    const q = query(dbCollection, where("uid", "==", userInfo?.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map((data) => ({
        id: data?.id,
        ...data?.data(),
      }));
      setData(userData);
      setLoading(false);
    });
    return unsubscribe;
  }, [userInfo?.uid]);

  const deleteItem = async (id: string) => {
    try {
      const docRef = doc(db, "transactions", id);
      await deleteDoc(docRef);
    } catch (err) {
      console.log("Error deleting document ", err);
    }
  };

  const searchedArr = () => {
    const filteredData = data?.filter(
      (data) =>
        data?.description.toLowerCase().includes(search.toLowerCase()) &&
        (select !== "all" ? data?.category === select : data) &&
        (type !== "all" ? data?.type === type : data),
    );
    return filteredData;
  };

  const filteredData: TransactionData[] = searchedArr();

  return (
    <div className="w-full min-h-screen py-4 px-3">
      <div className="w-full h-auto flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800">Transactions</h2>
        <Button
          className="bg-blue-600 text-white hover:text-blue-600 font-medium"
          variant={"ghost"}
          onClick={() => setIsModalOpen(true)}
        >
          + Add Transaction
        </Button>
      </div>
      {isModalOpen && <AddFormModal setIsModalOpen={setIsModalOpen} />}

      <div className="w-full flex flex-col md:flex-row mt-4 gap-5 items-center justify-between">
        <div className="w-full h-7 flex items-center gap-3">
          <label htmlFor="search">
            <Search className="size-4 border-0" />
          </label>
          <Input
            id="search"
            placeholder="Search for transactions..."
            className="flex-1"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <NativeSelect
          className="w-full"
          onChange={(e) => setSelect(e.target.value)}
          value={select}
        >
          <NativeSelectOption value={"all"}>All</NativeSelectOption>
          <NativeSelectOption value={"🏠 Housing"}>
            🏠 Housing
          </NativeSelectOption>
          <NativeSelectOption value={"🍔 Food & Dining"}>
            🍔 Food & Dining
          </NativeSelectOption>
          <NativeSelectOption value={"🚗 Transportation"}>
            🚗 Transportation
          </NativeSelectOption>
          <NativeSelectOption value={"💡 Bills & Utilities"}>
            💡 Bills & Utilities
          </NativeSelectOption>
          <NativeSelectOption value={"🛍️ Shopping"}>
            🛍️ Shopping
          </NativeSelectOption>
          <NativeSelectOption value={"🎬 Entertainment"}>
            🎬 Entertainment
          </NativeSelectOption>
          <NativeSelectOption value={"✈️ Travel"}>✈️ Travel</NativeSelectOption>
          <NativeSelectOption value={"📚 Education"}>
            📚 Education
          </NativeSelectOption>
          <NativeSelectOption value={"💻 Work & Business"}>
            💻 Work & Business
          </NativeSelectOption>
          <NativeSelectOption value={"💳 Financial"}>
            💳 Financial
          </NativeSelectOption>
          <NativeSelectOption value={"Job"}>Job</NativeSelectOption>
        </NativeSelect>
      </div>

      <div className="w-full flex items-center justify-center md:justify-start gap-2 mt-10">
        <Button
          className={`md:flex-1 shadow-sm shadow-gray-500 text-sm ${type === "all" ? "bg-white text-black hover:bg-white hover:text-black" : "text-white bg-blue-600 hover:text-white hover:bg-blue-600"}`}
          onClick={() => setType("all")}
        >
          All
        </Button>
        <Button
          className={`md:flex-1 shadow-sm shadow-gray-500 text-sm ${type === "income" ? "bg-white text-black hover:bg-white hover:text-black" : "text-white bg-blue-600 hover:text-white hover:bg-blue-600"}`}
          onClick={() => setType("income")}
        >
          Income
        </Button>

        <Button
          className={`md:flex-1 shadow-sm shadow-gray-500 text-sm ${type === "expense" ? "bg-white text-black hover:bg-white hover:text-black" : "text-white bg-blue-600 hover:text-white hover:bg-blue-600"}`}
          variant={"ghost"}
          onClick={() => setType("expense")}
        >
          Expense
        </Button>
      </div>

      <div className="w-full overflow-x-auto h-auto mt-5">
        {!loading && filteredData.length === 0 ? (
          <p className="text-center text-lg font-medium text-blue-600">Enter Transactions Here...</p>
        ) : loading ? (
          <Loader className="aimate-spin" />
        ) : (
          filteredData?.map((data) => (
            <table
              className="grid h-auto overflow-x-hidden grid-cols-6 border-collapse  table-fixed w-[1000px] py-8"
              key={data?.id}
            >
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Actions</th>
              <td className="text-center">{data?.date}</td>
              <td className="text-center">{data?.description}</td>
              <td className="text-center">{data?.category}</td>
              <td className="text-center">$ {data?.amount}</td>
              <td className="text-center">{data?.type}</td>
              <ButtonModal deleteItem={deleteItem} id={data?.id} data={data} />
            </table>
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;
