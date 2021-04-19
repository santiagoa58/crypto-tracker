import React, { ReactNode, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { formatWeekdayDateString } from "../../utils/formatters";
import { getSafeMinMax } from "../../utils/safeGetters";
import { StringKey } from "../../utils/types";
import { MainChartWrapper, ToolTipWrapper } from "./styled";

interface ChartPayload<T extends Record<string, any>, K extends keyof T>
  extends Payload<T[K], string> {
  payload?: T;
}

type ToolTipLabelFormatter<T, K extends keyof T> = (
  label: string,
  payload: ChartPayload<T, K>[],
) => ReactNode;
interface ChartProps<
  Data,
  DataKey extends keyof Data,
  XAxisKey extends keyof Data
> {
  chartData: Data[] | undefined;
  dataKey: DataKey;
  xAxisDataKey: XAxisKey;
  valueFormatter(value?: Data[DataKey]): string;
  xAxisLabelFormatter(label?: Data[XAxisKey]): string;
}

export const Chart = <
  Data extends Record<string, any>,
  DataKey extends StringKey<Data>,
  XAxisKey extends StringKey<Data>
>(
  props: ChartProps<Data, DataKey, XAxisKey>,
) => {
  const toolTipLabelFormatter: ToolTipLabelFormatter<Data, DataKey> = (
    label,
    payload,
  ) =>
    payload?.map((value) =>
      props.xAxisLabelFormatter(value.payload?.[props.xAxisDataKey]),
    );

  const domain = useMemo(() => getSafeMinMax(props.chartData, props.dataKey), [
    props.chartData,
    props.dataKey,
  ]);
  return (
    <MainChartWrapper>
      <ResponsiveContainer width="100%" aspect={2}>
        <AreaChart
          data={props.chartData}
          margin={{
            top: 30,
            right: 50,
            bottom: 30,
            left: 30,
          }}
        >
          <CartesianGrid vertical={false} opacity="0.2" />
          <XAxis
            dataKey={props.xAxisDataKey}
            tickFormatter={formatWeekdayDateString}
            tickLine={false}
          />
          <YAxis
            type="number"
            domain={domain}
            tickCount={8}
            tickFormatter={props.valueFormatter}
            tickLine={false}
            orientation="right"
          />
          <Tooltip<Data[DataKey], string>
            labelFormatter={toolTipLabelFormatter}
            content={CustomTooltip}
            formatter={(value: Data[DataKey]) => [
              props.valueFormatter(value),
              undefined,
            ]}
          />
          <Area
            type="monotone"
            dataKey={props.dataKey}
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </MainChartWrapper>
  );
};

export default Chart;

const CustomTooltip = <
  Data extends Record<string, any>,
  DataKey extends keyof Data
>(
  props: TooltipProps<Data[DataKey], string>,
) => {
  if (!props.active || !props.payload) {
    return null;
  }

  return (
    <ToolTipWrapper>
      <span className="tooltip__label">
        {props.labelFormatter?.(props.label, props.payload)}
      </span>
      <span className="tooltip__value">
        {props.formatter?.(props.payload?.[0].value)}
      </span>
    </ToolTipWrapper>
  );
};
