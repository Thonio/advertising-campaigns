import { useState } from "react"

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  return (
    <div className="p-6">
      <h1 className="text-2x1 font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-grey-500 text-sm">Total</p>
          <p className="text-3x1 font-bold mt-2">4</p>
        </div>
      </div>
    </div>
  )
}
