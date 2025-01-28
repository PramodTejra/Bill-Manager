import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bills: [],
  budget: 50000, // Default Monthly budget
  highlightedBills: [], // Bills that meet the condition
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    setBills(state, action) {
      state.bills = action.payload;
    },
    addBill(state, action) {
      state.bills.push(action.payload);
    },
    updateBill(state, action) {
      const index = state.bills.findIndex(
        (bill) => bill.id === action.payload.id
      );
      if (index !== -1) {
        state.bills[index] = action.payload;
      }
    },
    deleteBill(state, action) {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload);
    },
    // Calculate the highlighted bills based on the user-provided budget
    calculateHighlightedBills(state, action) {
      const userBudget = action.payload; // User's budget from the input

      // Filter bills where the amount is less than or equal to the budget
      const selectedBills = state.bills
        .filter((bill) => bill.amount <= userBudget)
        .map((bill) => bill.id); // Get the bill IDs to highlight

      state.highlightedBills = selectedBills; // Update highlighted bills
    },
  },
});

export const {
  setBills,
  addBill,
  updateBill,
  deleteBill,
  calculateHighlightedBills,
} = billsSlice.actions;

export default billsSlice.reducer;
