import { categories } from "../data/Categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Value } from "react-calendar/dist/esm/shared/types.js";
import { expenseDraft } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {

    const [formExpenses, setformExpenses] = useState<expenseDraft>(
        {
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date()
        }
    )

    const [error, setError] = useState('')
    
    const [prevAmount, setPrevAmount] = useState(0)

    const handleDate = (value: Value) => {
        setformExpenses(
            {
                ...formExpenses,
                date: value
            }

        )
    }

    const {dispatch, state, availableBudget} = useBudget()

    useEffect( ()=> {
        if (state.editID) {
            const modifyExpense = state.expense.find((editExpense)=> editExpense.id === state.editID)
            if (modifyExpense) {
                setformExpenses(modifyExpense)
                setPrevAmount(modifyExpense.amount)
            }
            
        }
    } 
    ,[state.editID])

    const handleInputs = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmount = ['amount'].includes(name)

        setformExpenses({
            ...formExpenses,
            [name] :  isAmount ? +value : value
        })

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (Object.values(formExpenses).some(val => val === '' || val === null || val === 0)) {
            setError('All Fields are required')
        }
        if (availableBudget < (formExpenses.amount-prevAmount)) {
            console.log(formExpenses.amount);
            console.log(prevAmount);
            
                     
            setError('Budget limit reach')
        }
        else {
            setError('')
            dispatch({type: 'add-expense', payload: {formExpenses}})
            dispatch({type: 'close-modal'})
        }
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <legend className="text-4xl font-black text-center uppercase border-b-4 border-blue-500 py-5">{state.editID ?  'Edit Expense' : 'New Expense'}</legend>
            <div className="flex flex-col my-5">
                {error && <ErrorMessage> {error} </ErrorMessage>}

                <label htmlFor="expenseName" className="text-xl my-1">Expense Name</label>
                <input
                    type="text"
                    id="expenseName"
                    name="expenseName"
                    className=" bg-gray-100 p-2"
                    onChange={handleInputs}
                    value={formExpenses.expenseName} />

                <label htmlFor="amount" className="text-xl my-1">Amount</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formExpenses.amount}
                    className=" bg-gray-100 p-2"
                    onChange={handleInputs}
                    onFocus={(e) => e.target.select()}
                    step="0.01" 
                />

                <label htmlFor="category" className="text-xl my-1">Category</label>
                <select 
                id="category" 
                className=" bg-gray-100 p-2" 
                name="category"
                value={formExpenses.category}
                onChange={handleInputs}>
                    <option value="">--Select Category--</option>
                    {categories.map(category =>
                        <option value={category.id} key={category.id} id={category.id}>{category.name}</option>
                    )}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="calendar" className="text-xl my-1">Date</label>

                <DatePicker className='bg-slate-100 p-2 border-0'
                    id="calendar"
                    value={formExpenses.date}
                    onChange={handleDate}
                />
            </div>

            <input type="submit"
                className="bg-blue-700 uppercase text-xl w-full cursor-pointer text-white text-center p-2 rounded-xl items-center mt-1.5"
                value={state.editID ? 'Update Expense' : 'Register Expense'}
            />

        </form>
    )
}
