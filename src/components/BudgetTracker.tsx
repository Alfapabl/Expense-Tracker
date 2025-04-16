import DisplayAmount from "./DisplayAmount";

export default function BudgetTracker() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap 5 shadow-lg bg-white mt-10 p-10 items-center">
            <div className="flex justify-center ">
                <img src="/grafico.jpg" alt="grafico de gastos" />
            </div>
            <div>
                <button className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                    type="button"
                >
                    Reset Expenses
                </button>
                <DisplayAmount 
                label='Budget'
                amount={300}/>
                <DisplayAmount 
                label='Available'
                amount={300}/>
                <DisplayAmount 
                label='Expenses'
                amount={300}/>

            </div>
        </div>

    )
}
