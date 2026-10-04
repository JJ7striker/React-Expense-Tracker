import { Loader, X } from "lucide-react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const AddForm = ({ setIsModalOpen }) => {
  const [transObj, setTransObj] = useState({
    date: "",
    description: "",
    category: "🏠 Housing",
    amount: "",
    type: "expense",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTransObj((prev) => ({ ...prev, [name]: value }));
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
    //   const docRef = collection(db, "transaction");
      const addedDocument = await addDoc(collection(db, "transaction"), {
        date: transObj.date,
        description: transObj.description,
        category: transObj.category,
        amount: transObj.amount,
        type: transObj.type,
      });
      console.log(addedDocument.id);
      setIsModalOpen(false);
    } catch (err) {
      console.log("Error adding transaction, ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full overflow-y-auto fixed inset-0 z-50 backdrop-blur-md flex justify-center  py-10">
      <div className="max-w-xl w-full h-auto px-3 shadow-sm shadow-gray-500 relative bg-white flex flex-col">
        <X
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 left-2 size-5"
        />
        <h2 className="font-medium text-lg text-center">Crate Transaction</h2>
        <div className="w-full flex items-center gap-5">
          <button
            className={`w-auto px-4 py-1  font-medium text-lg shadow-sm shadow-gray-500 outline-0 rounded-sm mt-5 flex-1 h-9 ${transObj.type === "expense" ? " bg-blue-600 text-white" : "text-black bg-white"}`}
            onClick={() =>
              setTransObj((prev) => ({ ...prev, type: "expense" }))
            }
          >
            Expense
          </button>
          <button
            className={`w-auto px-4 py-1 text-black shadow-sm shadow-gray-500 font-medium outline-0 text-lg rounded-sm mt-5 flex-1 h-9 ${transObj.type === "income" ? "text-white bg-blue-600" : "text-black bg-white"}`}
            onClick={() => setTransObj((prev) => ({ ...prev, type: "income" }))}
          >
            Income
          </button>
        </div>
        <input
          type="hidden"
          onChange={handleChange}
          value={transObj.type}
          name="type"
        />

        <form
          className="w-full px-4 py-5 flex flex-col items-center gap-5"
          onSubmit={addTransaction}
        >
          <div className="w-full flex flex-col items-start gap-2">
            <label htmlFor="amount" className="text-lg font-medium">
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="w-full bg-gray-300 rounded-sm py-2 px-3 oultine-0 border-0 font-medium"
              placeholder="$0"
              onChange={handleChange}
              value={transObj.amount}
            />
          </div>

          <div className="w-full flex flex-col items-start gap-2">
            <label htmlFor="description" className="text-lg font-medium">
              Description:
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="w-full bg-gray-300 rounded-sm py-2 px-3 oultine-0 border-0 font-medium"
              placeholder="Enter description"
              onChange={handleChange}
              value={transObj.description}
            />
          </div>

          <div className="w-full flex flex-col items-start gap-2">
            <label htmlFor="category" className="text-lg font-medium">
              Category:
            </label>
            <select
              name="category"
              id="category"
              className="w-full bg-gray-300 rounded-sm py-2 px-3 oultine-0 border-0 font-medium"
              onChange={handleChange}
              value={transObj.category}
            >
              <option value="Select Category" selected disabled>
                Select Category
              </option>
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

          <div className="w-full flex flex-col items-start gap-2">
            <label htmlFor="date" className="text-lg font-medium">
              Date:
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="w-full bg-gray-300 rounded-sm py-2 px-3 oultine-0 border-0 font-medium"
              placeholder="Enter description"
              onChange={handleChange}
              value={transObj.date}
            />
          </div>

          <button
            className={`w-4/5 px-4 py-1 bg-blue-600 text-white shadow-sm shadow-gray-500 font-medium outline-0 text-sm rounded-sm h-9`}
            type="submit"
          >
            {isLoading ? (
              <Loader className="size-4 text-center animate-spin" />
            ) : (
              "Create Transaction"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
