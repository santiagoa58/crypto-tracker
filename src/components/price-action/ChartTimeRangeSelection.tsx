import React, { FC } from "react";
import { HistoricalDaysRange } from "../../services/crypto_assets/AssetsServiceInterface";
import { typedObjectEntries } from "../../utils/typedObjectEntries";
import { TimeRangeSelectionItem, TimeRangeSelectionWrapper } from "./styled";

type HistoricalDaysRangeLabel = "1D" | "5D" | "1M" | "3M" | "6M" | "1Y" | "ALL";

type Intervals = {
  [interval in HistoricalDaysRangeLabel]: HistoricalDaysRange;
};

export const historicalDaysRange: Intervals = {
  "1D": 1,
  "5D": 5,
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 360,
  ALL: "max",
};
interface TimeRangeSelectionProps {
  selectedDayRange: HistoricalDaysRange;
  onSelectionChanged(selectedInterval: HistoricalDaysRange): void;
}
export const ChartTimeRangeSelection: FC<TimeRangeSelectionProps> = (props) => {
  return (
    <TimeRangeSelectionWrapper>
      {typedObjectEntries(historicalDaysRange).map(
        ([intervalLabel, intervalValue]) => (
          <TimeRangeSelectionItem
            key={intervalLabel}
            onClick={() => props.onSelectionChanged(intervalValue)}
            className={
              intervalValue === props.selectedDayRange ? "selected" : undefined
            }
          >
            {intervalLabel}
          </TimeRangeSelectionItem>
        ),
      )}
    </TimeRangeSelectionWrapper>
  );
};
