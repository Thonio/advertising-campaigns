import { useState } from "react"

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const cards = [
    { label: 'Total Campaigns', value: 2 },
    { label: 'Active Campaigns', value: 4 },
    { label: 'Total Impressions', value: 6 },
    { label: 'Top Advertiser', value: 8 }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2x1 font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {
          cards.map((card, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6">
              <p className="text-grey-500 text-sm">{card.label}</p>
              <p className="text-3x1 font-bold mt-2">{card.value}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
