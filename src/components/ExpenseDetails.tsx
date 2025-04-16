import { categories } from "../data/Categories"
import { expenses } from "../types"


type expenseDetailProps = {
    expense : expenses
}

export default function ExpenseDetails({expense}: expenseDetailProps) {
  return (
    <>
        
        <div>{expense.expenseName}</div>
        <div>{expense.date?.toLocaleString()}</div>
        <div>{expense.amount}</div>
    </>
  )
}
