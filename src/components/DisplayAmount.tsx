import { formatCurrency } from "../Helpers/Currency"

type DisplayAmountProps = {
    label: string,
    amount: number
}

export default function DisplayAmount({label, amount}: DisplayAmountProps) {
  return (
    <p className="text-2xl text-blue-500 mt-5 font-bold">
        {label}: {''}
        <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}
