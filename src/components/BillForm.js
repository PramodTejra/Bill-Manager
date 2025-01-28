import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBill, updateBill } from "../features/billsSlice";
import "./BillForm.css"; // Import custom CSS

const BillForm = ({ billToEdit, setBillToEdit }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  // Populate form fields when editing a bill
  useEffect(() => {
    if (billToEdit) {
      setDescription(billToEdit.description);
      setAmount(billToEdit.amount);
      setCategory(billToEdit.category);
      setDate(billToEdit.date);
    }
  }, [billToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBill = {
      id: billToEdit ? billToEdit.id : Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      date,
    };

    if (billToEdit) {
      dispatch(updateBill(newBill)); // Dispatch update action
    } else {
      dispatch(addBill(newBill)); // Dispatch add action
    }

    // Reset form and clear editing state
    setDescription("");
    setAmount("");
    setCategory("");
    setDate("");
    setBillToEdit(null);
  };

  return (
    <form className="bill-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">{billToEdit ? "Update Bill" : "Add Bill"}</button>
    </form>
  );
};

export default BillForm;
