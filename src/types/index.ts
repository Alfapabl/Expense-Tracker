export type expenses = {
    id: string,
    expenseName: string,
    amount: number,
    category: string,
    date: Value
}

export type expenseDraft = Omit<expenses,'id'>

export type categoriesType = {
    id: string,
    name: string,
    icon: string
}



type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];