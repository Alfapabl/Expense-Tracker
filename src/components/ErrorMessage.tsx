import { ReactNode } from "react"

type ErrorMessageProps = {
  children: ReactNode
}

export default function ErrorMessage({children}: ErrorMessageProps ) {
  return (
    <p className="bg-red-700 text-white font-black  text-center p-2 w-full">{children}</p>
  )
}
