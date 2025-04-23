import { categories } from "../data/Categories"
import { formatCurrency, formatDate } from "../Helpers/Currency"
import { useBudget } from "../hooks/useBudget";
import { expenses } from "../types"
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';


type expenseDetailProps = {
  expense: expenses
}


export default function ExpenseDetails({ expense }: expenseDetailProps) {

  const iconCategory = categories.find((cat) => cat.id === expense.category)
  const {dispatch} = useBudget()

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => {dispatch({type: 'edit-expense', payload: {id: expense.id}})}}>
        Update
      </SwipeAction>
    </LeadingActions>
  );
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {dispatch({type: 'remove-expense', payload: {id: expense.id}})}}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      
      <SwipeableListItem
      leadingActions={leadingActions()}
      trailingActions={trailingActions()}
      >

        <div className="flex gap-5   shadow-lg p-5 items-center w-full bg-white border-gray-200 border-b">
          <img src={`/icono_${iconCategory!.icon}.svg`} alt="Icon Representing the expense category" className="w-20" />

          <div className="flex-1 space-y-3">
            <p className="text-slate-600 text-sm uppercase font-bold">{iconCategory?.name}</p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
            <p className="text-sm text-slate-400 italic">← swipe to edit or delete →</p>
          </div>

          <div
            className="font-black text-black text-2xl">{formatCurrency(expense.amount)}
          </div>
        </div>

      </SwipeableListItem>
    </SwipeableList>
  )
}
