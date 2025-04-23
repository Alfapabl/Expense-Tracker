import { createContext, useReducer, Dispatch, ReactNode, useMemo } from "react"
import { budgetReducer, budgetType, initialValue, budgetAction } from "../reducers/BudgetReducer"

type budgetContextProps = {
    state: budgetType
    dispatch: Dispatch<budgetAction>
    totalExpenses: number
    availableBudget: number
}

type budgetProviderProps = {
    children: ReactNode
}



export const BudgetContext = createContext<budgetContextProps>(null!)

export const BudgetProvider = ({ children }: budgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialValue)
    const totalExpenses = useMemo(() => state.expense.reduce((total, expensesList) => expensesList.amount + total, 0), [state.expense])
    const availableBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                availableBudget
            }}>
            {children}

        </BudgetContext.Provider>

    )
}