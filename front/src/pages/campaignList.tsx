import { useEffect, useState } from "react"
import type { Campaign } from "../api/type"
import { getCampaigns } from "../api/campaigns"

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ status: '', country: '', advertiser: '' })

  const fetch = () => {
    setLoading(true)
    getCampaigns({
      status: filters.status || undefined,
      country: filters.country || undefined,
      advertiser: filters.advertiser || undefined,
    })
      .then(setCampaigns)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [])

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    completed: 'bg-blue-100 text-blue-700',
  }

  return (
    <div className="py-6">
      <h1 className="text-2x1 font-bold mb-6">Liste des campagne</h1>
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Advertiser"
          className="border rounded-lg px-3 py-2 text-sm"
          value={filters.advertiser}
          onChange={e => setFilters(f => ({ ...f, advertiser: e.target.value }))}
        />
        <input
          placeholder="Country (e.g. US)"
          className="border rounded-lg px-3 py-2 text-sm"
          value={filters.country}
          onChange={e => setFilters(f => ({ ...f, country: e.target.value }))}
        />
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={filters.status}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={fetch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          Rechercher
        </button>
      </div>
      <table className="w-full bg-white text-sm border-collapse">
        <thead>
          <tr className="bg-white rounded-xl text-center">
            <th className="p-3">Nom</th>
            <th className="p-3">Advertiser</th>
            <th className="p-3">Pays</th>
            <th className="p-3">Budget</th>
            <th className="p-3">Impressions</th>
            <th className="p-3">Statut</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map(c => (
            <tr key={c._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.advertiser}</td>
              <td className="p-3">{c.targetCountries.join(', ')}</td>
              <td className="p-3">{c.budget.toLocaleString()}</td>
              <td className="p-3">{c.impressionsServed.toLocaleString()}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
          {campaigns.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-400">
                No campaigns found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
