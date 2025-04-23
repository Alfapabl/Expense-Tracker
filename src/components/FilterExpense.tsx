import { categories } from "../data/Categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterExpense() {
    const {dispatch} = useBudget()
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'filterID', payload: {id: e.target.value}})
    }
    return (
        <>
            <div className="bg-white shadow-lg rounded-lg p-10 mt-10">
                <form action="">
                    <div className="flex flex-col md:flex-row md:items-center gap-5">
                        <label htmlFor="filter">Filter Expenses:</label>
                        <select 
                        name="" 
                        id="filter" 
                        className="bg-slate-100 flex-1 p-3 rounded md:w-max"
                        onChange={handleChange}
                        >
                            <option value="">--Select Category--</option>
                            {categories.map(categories => 
                                <option value={categories.id} key={categories.id} id={categories.id}>{categories.name}   </option>
                            )}
                        </select>
                    </div>
                </form>

            </div>
        </>
    )
}
