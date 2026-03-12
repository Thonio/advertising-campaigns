import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import z from "zod";
import { createCampaign } from "../api/campaigns";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string().min(1, 'le nom est obligatoire'),
  advertiser: z.string().min(1, 'Advertiser est obligatoire'),
  startDate: z.string().min(1, 'la date de debut est obligatoire'),
  endDate: z.string().min(1, 'la date de fin est obligatoire'),
  budget: z.coerce.number<number>().min(1, 'le budget doit etre superieur a 0'),
  targetCountries: z.string().min(1, 'Il faut au moins un pays'),
  status: z.enum(['active', 'paused', 'ended']),
});

type FormValues = z.infer<typeof schema>;

export default function CampaignForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'active' },
  });

  const onSubmit = async (values: FormValues) => {
    await createCampaign({
      ...values,
      budget: Number(values.budget),
      targetCountries: values.targetCountries.split(',').map(c => c.trim()),
    });
    navigate('/campaigns');
  };

  const fields = [
    { name: 'name', label: 'Nom de campagne', type: 'text' },
    { name: 'advertiser', label: 'Annonceur', type: 'text' },
    { name: 'startDate', label: 'Date de debut', type: 'date' },
    { name: 'endDate', label: 'Date de fin', type: 'date' },
    { name: 'budget', label: 'Budget', type: 'number' },
    { name: 'targetCountries', label: 'Pays (separer par une virgule)', type: 'text' },
  ] as const;

  return (
    <div className="py-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">New Campaign</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {fields.map(field => (
          <div key={field.name}>
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            <input
              type={field.type}
              {...register(field.name)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.name]?.message}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select {...register('status')} className="w-full border rounded-lg px-3 py-2 text-sm">
            <option value="active">Active</option>
            <option value="paused">Pause</option>
            <option value="ended">Terminer</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Creation...' : 'Ajouter la campagne'}
        </button>
      </form>
    </div>
  )
}
