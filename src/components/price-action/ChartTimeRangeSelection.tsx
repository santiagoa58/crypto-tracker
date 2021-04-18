import React, { FC } from "react";
import { HistoricalPriceInterval } from "../../services/crypto_assets/AssetsServiceInterface";
import { typedObjectEntries } from "../../utils/typedObjectEntries";
import { TimeRangeSelectionItem, TimeRangeSelectionWrapper } from "./styled";

type Intervals = {
  [interval in HistoricalPriceInterval]: string;
};
const priceIntervals: Intervals = {
  m1: "1M",
  m5: "5M",
  m15: "15M",
  m30: "30M",
  h1: "1H",
  h2: "2H",
  h6: "6H",
  h12: "12H",
  d1: "1D",
};

interface TimeRangeSelectionProps {
  selectedPriceInterval: HistoricalPriceInterval;
  onSelectionChanged(selectedInterval: HistoricalPriceInterval): void;
}
export const ChartTimeRangeSelection: FC<TimeRangeSelectionProps> = (props) => {
  return (
    <TimeRangeSelectionWrapper>
      {typedObjectEntries(priceIntervals).map(([intervalKey, interval]) => (
        <TimeRangeSelectionItem
          key={intervalKey}
          onClick={() => props.onSelectionChanged(intervalKey)}
          className={
            intervalKey === props.selectedPriceInterval ? "selected" : undefined
          }
        >
          {interval}
        </TimeRangeSelectionItem>
      ))}
    </TimeRangeSelectionWrapper>
  );
};
