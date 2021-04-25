import React, { ReactNode, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { theme } from "../../theme/theme";
import { formatDateTime } from "../../utils/formatters";
import { useMediaQueryMatch } from "../../utils/hooks/useMediaQueryMatch";
import { getSafeMinMax } from "../../utils/safeGetters";
import { StringKey } from "../../utils/types";
import { ChartErrorMessage } from "./ChartErrorMessage";
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
  error?: string;
}

export const Chart = <
  Data extends Record<string, any>,
  DataKey extends StringKey<Data>,
  XAxisKey extends StringKey<Data>
>(
  props: ChartProps<Data, DataKey, XAxisKey>,
) => {
  const domain = useMemo(() => getSafeMinMax(props.chartData, props.dataKey), [
    props.chartData,
    props.dataKey,
  ]);

  const hideAxis = useMediaQueryMatch();

  if (props.error) {
    return <ChartErrorMessage>{props.error}</ChartErrorMessage>;
  }

  const toolTipLabelFormatter: ToolTipLabelFormatter<Data, DataKey> = (
    label,
    payload,
  ) =>
    payload?.map((value) =>
      formatDateTime(value.payload?.[props.xAxisDataKey]),
    );

  return (
    <MainChartWrapper>
      <ResponsiveContainer width="100%" aspect={2}>
        <AreaChart
          data={props.chartData}
          margin={{
            top: 0,
            right: 0,
            bottom: 0,
            left: hideAxis ? 0 : 30,
          }}
        >
          <defs>
            <linearGradient id="primary-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.colors.primary}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={theme.colors.primaryLight}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey={props.xAxisDataKey}
            tickFormatter={props.xAxisLabelFormatter}
            tickLine={false}
            axisLine={false}
            stroke={theme.colors.fontOnBackground}
            opacity={theme.opacityDisabled}
          />
          <YAxis
            type="number"
            domain={domain}
            tickFormatter={props.valueFormatter}
            tickLine={false}
            axisLine={false}
            stroke={theme.colors.fontOnBackground}
            opacity={theme.opacityDisabled}
            hide={hideAxis}
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
            stroke={theme.colors.primary}
            fill="url(#primary-gradient)"
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
