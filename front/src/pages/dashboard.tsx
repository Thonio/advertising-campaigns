import { useEffect, useState } from "react"
import type { Stats } from "../api/type";
import { getStats } from "../api/campaigns";

export default function Dashboard() {
  const [data, setData] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  const cards = [
    { label: 'Total Campaigns', value: data?.totalCampaigns },
    { label: 'Active Campaigns', value: data?.activeCampaigns },
    { label: 'Total Impressions', value: data?.totalImpressions },
    { label: 'Top Advertiser', value: data?.topAdvertiser }
  ];

  useEffect(() => {
    getStats()
      .then(setData)
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-6">Cahrgement...</p>;
  if (!data) return <p className="p-6 text-red-500">Erreur de chargement des donnees.</p>;

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
