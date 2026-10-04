import { Pen, Trash } from "lucide-react"

interface Row {
    date: string,
    description: string,
    category: string,
    amount: string,
    type: string
}

interface RowInfo {
    row: Row
}

const DataRow = ({ row }: RowInfo) => {
  return (
    <tr>
        <td className="text-center font-medium">{row?.date}</td>
        <td className="text-center font-medium">{row?.description}</td>
        <td className="text-center font-medium">{row?.category}</td>
        <td className="text-center font-medium">${row?.amount}</td>
        <td className="text-center font-medium">{row?.type}</td>
        <td className="flex items-center justify-center gap-2 text-center">
          <Pen className="text-blue-700 hover:scale-108 transition-all duration-150 ease-in-out" />
          <Trash className="text-red-700 hover:scale-108 transition-all duration-180 ease-in-out" />
        </td>
    </tr>
  )
}

export default DataRow