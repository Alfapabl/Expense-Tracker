import { createContext, useReducer, Dispatch, ReactNode } from "react"
import { budgetReducer, budgetType, initialValue, budgetAction } from "../reducers/BudgetReducer"

type budgetContextProps = {
    state: budgetType,
    dispatch: Dispatch<budgetAction>
}

type budgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<budgetContextProps>(null!)

export const BudgetProvider = ({children}: budgetProviderProps)=> {

    const [state, dispatch] = useReducer(budgetReducer, initialValue)

    return (
        <BudgetContext.Provider
        value={{
            state,
            dispatch
        }}>
            {children}

        </BudgetContext.Provider>

    )
}