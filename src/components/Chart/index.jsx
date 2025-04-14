import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = [
  "#5B6F44", // RN
  "#97A77C", // P
  "#A3B18A", // M
  "#F5F0E7", // G
  "#4A5C37", // XG
];

export default function ChartPie({ data }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <PieChart width={250} height={150}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Legenda à direita */}
      <div className="ml-4 ">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="ml-2">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
