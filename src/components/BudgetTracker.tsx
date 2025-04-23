import { useBudget } from "../hooks/useBudget";
import DisplayAmount from "./DisplayAmount";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
export default function BudgetTracker() {

    const {state, totalExpenses, availableBudget, dispatch } = useBudget()
    const percentage = +(totalExpenses/state.budget * 100).toFixed(2)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 shadow-lg bg-white mt-10 p-10 rounded-lg">
            <div className="flex justify-center ">
                <CircularProgressbar 
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage >= 80 ? '#DC2626' : '#3b82f6',
                        trailColor: '#F5F5F5',
                        textSize: 8
                    })}
                    text={`${percentage}% Budget Used`}
                
                />
            </div>
            <div>
                <button className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                    type="button"
                    onClick={()=> dispatch({type: 'reset'})}
                >
                    Reset Expenses
                </button>
                <DisplayAmount 
                label='Budget'
                amount={state.budget}/>
                <DisplayAmount 
                label='Available'
                amount={availableBudget}/>
                <DisplayAmount 
                label='Expenses'
                amount={totalExpenses}/>

            </div>
        </div>

    )
}
