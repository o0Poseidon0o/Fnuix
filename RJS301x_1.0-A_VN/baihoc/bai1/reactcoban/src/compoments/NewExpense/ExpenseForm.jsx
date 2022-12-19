import React from "react";
import './ExpenseForm.css';
const ExpenseForm=()=>{
    const tittleChangeHandler = (event)=>{
        console.log(event.target.value)
    };
    return (
    <form>
        <div className="new-expense__controls">
            <div className="new-expense__control">
                <label>Tittle</label>
                <input type="text" onChange={tittleChangeHandler}/>
            </div>
            <div className="new-expense__control">
                <label>Amount</label>
                <input type="number" min='0.01' step='0.01' />
            </div>
            <div className="new-expense__control">
                <label>Date</label>
                <input type="date" min='2019-01-01' max='2022-01-01' />
            </div>
        </div>
        <div className="new-expense__actions">
            <button type="submit">Add Expense</button>
        </div>
    </form>)
};
export default ExpenseForm;