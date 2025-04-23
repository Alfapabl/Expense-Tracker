import { expenseDraft, expenses } from "../types"
import { v4 as uuidv4 } from 'uuid'

export type budgetType = {
    budget: number
    modal: boolean
    expense: expenses[]
    editID: string
    filterID: string

}

export type budgetAction =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'open-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { formExpenses: expenseDraft } } |
    { type: 'remove-expense', payload: { id: expenses['id'] } } |
    { type: 'edit-expense', payload: { id: expenses['id'] } } |
    { type: 'reset' } |
    { type: 'filterID', payload: { id: expenses['id'] } }


export const initialValue: budgetType = {
    budget: 0,
    modal: false,
    expense: [],
    editID: '',
    filterID: ''
}

const createExpense = (expenseDraft: expenseDraft): expenses => {
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
                modal: false,
                editID: ''
            }

        case 'add-expense':
            const expenses = createExpense(action.payload.formExpenses)
            let editExpenses: expenses[] = []

            if (state.editID) {
                editExpenses = state.expense.map((expense) =>
                    state.editID === expense.id
                      ? { ...action.payload.formExpenses, id: expense.id } // ✅ retain ID
                      : expense
                  );
                  
            }
            else {
                editExpenses = [...state.expense, expenses]
            }

            return {
                ...state,
                expense: editExpenses,
                editID: ''
            }

        case 'remove-expense':
            return {
                ...state,
                expense: state.expense.filter((expense) => expense.id !== action.payload.id)
            }

        case 'edit-expense':
            return {
                ...state,
                modal: true,
                editID: action.payload.id
            }

        case 'reset':
            return {
                budget: 0,
                modal: false,
                expense: [],
                editID: '',
                filterID: ''
            }

        case 'filterID':
            return {
                ...state,
                filterID: action.payload.id
            }


        default:
            return state 
    }

}