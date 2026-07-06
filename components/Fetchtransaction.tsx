"use client";

import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface Transaction {
  id: string;
  email: string;
  accountName: string;
  amount: number;
  date: string;
}

interface TransactionsProps {
  email: string;
}

const ShowTransactions = ({ email }: TransactionsProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!email) {
        setTransactions([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const q = query(
          collection(db, "transactions"),
          where("email", "==", email)
        );

        const querySnapshot = await getDocs(q);

        const data: Transaction[] = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Transaction, "id">),
        }));

        setTransactions(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setMessage("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [email]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "transactions", id));

      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
      );

      setIsError(false);
      setMessage("Transaction deleted successfully.");

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);

      setIsError(true);
      setMessage("Failed to delete transaction.");

      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) {
    return <p className="mt-6 text-center">Loading...</p>;
  }

  return (
    <div className="mx-auto mt-6 max-w-3xl">
      <h2 className="mb-6 text-2xl font-bold">Transactions</h2>

      {message && (
        <div
          className={`mb-4 rounded-md p-3 text-white ${
            isError ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {message}
        </div>
      )}

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">
          No transactions found.
        </p>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow"
            >
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Account Name:</span>{" "}
                  {transaction.accountName}
                </p>

                <p>
                  <span className="font-semibold">Amount:</span> ₦
                  {transaction.amount.toLocaleString()}
                </p>

                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {transaction.date}
                </p>

                <p className="text-sm text-gray-500">
                  {transaction.email}
                </p>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Delete Transaction
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowTransactions;