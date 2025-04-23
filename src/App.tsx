import { useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterExpense from "./components/FilterExpense"


function App() {

  const {state} = useBudget()
  const budgetCheck = useMemo(()=> state.budget > 0 , [state.budget])  

  return (
    <>
    <header className=" bg-blue-500 text-center">
      <h1 className=" text-4xl mx-full text-white py-5 uppercase font-black"> Expense Tracker</h1>
    </header>
    <div className="mx-auto h-screen max-w-3xl">
      {budgetCheck ?  <><BudgetTracker /> <FilterExpense /> <ExpenseList/></> : <BudgetForm /> }
    </div>
      {budgetCheck && (<ExpenseModal />)}
    </>
  )
}

export default App
