import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StringKey } from "../../utils/types";

interface ChartProps<T> {
  chartData: T[] | undefined;
  dataKey: StringKey<T>;
  xAxisDataKey: StringKey<T>;
}

export const Chart = <T,>(props: ChartProps<T>) => {
  return (
    <ResponsiveContainer width="50%" aspect={2}>
      <AreaChart
        data={props.chartData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={props.xAxisDataKey} tickCount={672} />
        <YAxis
          type="number"
          domain={["dataMin", "auto"]}
          tickCount={672}
          allowDataOverflow={false}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={props.dataKey}
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
