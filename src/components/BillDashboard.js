import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBill, calculateHighlightedBills } from "../features/billsSlice";
import BillForm from "./BillForm";
import BillChart from "./BillChart";
import "./BillDashboard.css";

const BillDashboard = () => {
  const bills = useSelector((state) => state.bills.bills); // Get bills from Redux
  const highlightedBills = useSelector((state) => state.bills.highlightedBills); // Get highlighted bills
  const [billToEdit, setBillToEdit] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [monthlyBudget, setMonthlyBudget] = useState(""); // Budget input
  const [budgetError, setBudgetError] = useState(""); // Error for invalid budget
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the monthly budget is valid
    if (monthlyBudget && monthlyBudget > 0) {
      dispatch(calculateHighlightedBills(Number(monthlyBudget)));
      setBudgetError(""); // Clear error if budget is valid
    } else if (monthlyBudget !== "") {
      setBudgetError("Please enter a valid positive budget amount.");
      dispatch(calculateHighlightedBills(0)); // Reset highlighted bills if budget is invalid
    } else {
      dispatch(calculateHighlightedBills(0)); // Reset if no budget
    }
  }, [bills, dispatch, monthlyBudget]);

  // Filter bills based on the selected category
  const filteredBills =
    selectedCategory === "All"
      ? bills
      : bills.filter((bill) => bill.category === selectedCategory);

  const isHighlighted = (billId) => highlightedBills.includes(billId);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bill-dashboard">
      <h1>Bill Dashboard</h1>
      <BillForm billToEdit={billToEdit} setBillToEdit={setBillToEdit} />

      {/* Filters container */}
      <div className="filters-container">
        <div className="filter-item">
          <label htmlFor="monthlyBudget">Enter Monthly Budget:</label>
          <input
            type="number"
            id="monthlyBudget"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value)}
            placeholder="Enter budget"
          />
        </div>
        <div className="filter-item">
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="FoodNDining">Food & Dining</option>
            <option value="utility">Utility</option>
            <option value="shopping">Shopping</option>
            <option value="education">Education</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
      </div>

      {budgetError && <p className="error">{budgetError}</p>}

      <table className="bill-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBills.map((bill) => (
            <tr
              key={bill.id}
              className={isHighlighted(bill.id) ? "highlighted" : ""}
            >
              <td>{bill.description}</td>
              <td>${bill.amount}</td>
              <td>{bill.category}</td>
              <td>{formatDate(bill.date)}</td>
              <td className="bill-actions">
                <button onClick={() => setBillToEdit(bill)}>Edit</button>
                <button onClick={() => dispatch(deleteBill(bill.id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <BillChart bills={filteredBills} />
    </div>
  );
};

export default BillDashboard;
