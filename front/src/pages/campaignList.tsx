import { useState } from "react"

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  return (
    <div className="py-6">
      <h1 className="text-2x1 font-bold mb-6">Liste des campagne</h1>
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Advertiser"
          className="border rounded-lg px-3 py-2 text-sm"
        />
        <input
          placeholder="Country (e.g. US)"
          className="border rounded-lg px-3 py-2 text-sm"
        />
        <select
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="completed">Completed</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          Rechercher
        </button>
      </div>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-white rounded-xl text-left">
            <th className="p-3">Nom</th>
            <th className="p-3">Advertiser</th>
            <th className="p-3">Pays</th>
            <th className="p-3">Budget</th>
            <th className="p-3">Impressions</th>
            <th className="p-3">Statut</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  )
}
