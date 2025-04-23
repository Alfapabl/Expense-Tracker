import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {



    const [budget, setBudget] = useState(0)
    const {dispatch} = useBudget()

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)      
    }

    const isDisable = useMemo(() => {return isNaN(budget) || budget <= 0}, [budget])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch({type: 'add-budget' , payload: {budget}})
      setBudget(0)
    }
    

  return (
    <form action="" className="my-5 items-center justify-center shadow-lg bg-white mt-10 p-10" onSubmit={handleSubmit}>
        <div className="flex flex-col text-center bg-white-400  my-5">
            
            <label htmlFor="budget" className="text-blue-600 text-3xl my-5 font-black">Set Budget</label>
            <input 
            type="number" 
            id="budget" 
            name='budget' 
            placeholder="set budget" 
            className="border-gray-200 p-2 border w-full"
            onChange={onChange}
            value={budget}
            onFocus={(e) => e.target.select()}
            min='0' 
            />
            <input type="submit" className="p-2 my-5 bg-blue-700 text-1xl text-white disabled:opacity-40" value='Define Budget' disabled={isDisable}/>
        </div>

    </form>
  )
}
