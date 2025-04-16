import { useBudget } from "../hooks/useBudget"
import ExpenseDetails from "./ExpenseDetails";

export default function ExpenseList() {
    const { state } = useBudget()
    const isEmpty = state.expense.length === 0;

    return (
        <>
            <div>
                {isEmpty ? <div>ExpenseList</div> :  state.expense.map((expensearray) => 
                <ExpenseDetails
                 expense = {expensearray}
                 key={expensearray.id}
                 /> )
}
            </div>
        </>
    )
}
