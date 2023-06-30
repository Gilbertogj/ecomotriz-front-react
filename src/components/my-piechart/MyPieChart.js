import React, { useMemo } from "react";
import {
  PieChart,
  Tooltip,
  Pie,
  Legend,
  Cell,
  Text,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#212C56", "#00C08B"];

export const MyPieChart = ({ title, data, dataKeyString, nameKeyString }) => {
  const sumaValores = useMemo(
    () => data.reduce((accu, obj) => accu + obj.value, 0),
    [data]
  );

  return (
    <>
      <h5 className="text-center">{title}</h5>
      <ResponsiveContainer height={300}>
        <PieChart>
          <Legend formatter={renderBlackLegendText} />
          <Tooltip />
          <Pie
            data={data}
            dataKey={dataKeyString}
            nameKey={nameKeyString}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={renderCustomizedLabel}
            labelLine={true}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <p>
        <strong>Total: </strong>
        {sumaValores}
      </p>
    </>
  );
};

const renderCustomizedLabel = ({ percent, value, x, y }) => {
  return (
    <Text x={x} y={y} textAnchor="middle" verticalAnchor="middle">
      {`${value} (${(percent * 100).toFixed(0)}%)`}
    </Text>
  );
};

const renderBlackLegendText = (value) => {
  return <span style={{ color: "black" }}>{value}</span>;
};
