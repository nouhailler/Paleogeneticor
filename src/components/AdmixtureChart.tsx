import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { group: 'Europe', neanderthal: 2.0, denisovan: 0.1 },
  { group: 'Asie Est', neanderthal: 2.3, denisovan: 0.3 },
  { group: 'Oceanie', neanderthal: 2.1, denisovan: 4.5 }
];

export function AdmixtureChart() {
  return (
    <div className="h-80 rounded-lg border border-black/10 bg-white p-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="group" />
          <YAxis unit="%" />
          <Tooltip />
          <Bar dataKey="neanderthal" name="ADN neandertalien" fill="#0f6f73" />
          <Bar dataKey="denisovan" name="ADN denisovien" fill="#b65f25" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
