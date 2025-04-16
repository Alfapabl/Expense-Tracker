import { expenseDraft, expenses } from "../types"
import {v4 as uuidv4} from 'uuid'

export type budgetType = {
    budget: number
    modal: boolean
    expense: expenses[]
}

export type budgetAction =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'open-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: {formExpenses: expenseDraft}}

export const initialValue: budgetType = {
    budget: 0,
    modal: false,
    expense: []

}

const createExpense = (expenseDraft: expenseDraft) : expenses => {
   return {
    ...expenseDraft,
    id: uuidv4()
   }

}

export const budgetReducer = (
    state: budgetType = initialValue,
    action: budgetAction

) => {

    switch (action.type) {
        case 'add-budget':
            return {
                ...state,
                budget: action.payload.budget
            }

        case 'open-modal':
            return {
                ...state,
                modal: true
            }

        case 'close-modal':
            return {
                ...state,
                modal: false
            }

        case 'add-expense' :
            const expenses = createExpense(action.payload.formExpenses)
            
            return {
                ...state,
                expense: [...state.expense , expenses]
            }


        default:
            break;
    }

    return state
}