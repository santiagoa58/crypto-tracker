import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LocationListener } from "history";

interface Config {
  onHistoryChange(path: string): void;
}
export const useRouteSubscription = ({
  onHistoryChange,
  ...config
}: Config) => {
  const history = useHistory();

  const historyChangeHandler: LocationListener = useCallback(
    (location) => {
      onHistoryChange?.(location.pathname);
    },
    [onHistoryChange],
  );

  useEffect(() => {
    const unsubscribe = history.listen(historyChangeHandler);

    console.log("history subscribed!!!");
    return () => unsubscribe();
  }, [history, historyChangeHandler]);
};
