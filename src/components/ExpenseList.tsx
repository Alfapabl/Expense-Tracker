import { useBudget } from "../hooks/useBudget"
import ExpenseDetails from "./ExpenseDetails";

export default function ExpenseList() {
    const { state } = useBudget()
    const filterExpenses = state.filterID ? state.expense.filter((expenses)=> expenses.category === state.filterID) : state.expense
    const isEmpty = filterExpenses.length === 0;
    

    return (
        <>
        <div className="rounded-lg bg-white shadow-lg p-5 mt-10">
            {isEmpty ? (
                <div className="font-black text-2xl mt-5 mb-5">No Expenses</div>
            ) : (
                <>
                    <h1 className="font-black text-2xl mt-5 mb-5">Expense list:</h1>
                    {filterExpenses.map((expensearray) => (
                        <ExpenseDetails
                            expense={expensearray}
                            key={expensearray.id}
                        />
                    ))}
                </>
            )}
        </div>
    </>
    
    )
}
