'use client'
import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export default function TransactionForm ({ email }: { email: string }) {
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");

  const createTransaction = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        email,
        accountName,
        amount: Number(amount),
        date, // User-selected date
      });

      alert(`Transaction created! ID: ${docRef.id}`);

      // Reset form
      setAccountName("");
      setAmount("");
      setDate("");
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to create transaction.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">Add Transaction</h2>

      <form onSubmit={createTransaction} className="space-y-4">
       

        <div>
          <label className="mb-1 block text-sm font-medium">
            Account Name
          </label>
          <input
            type="text"
            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Amount</label>
          <input
            type="number"
            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Date</label>
          <input
            type="date"
            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
};
