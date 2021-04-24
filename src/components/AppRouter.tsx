import React, { FC, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { DEFAULT_ASSET_ID } from "../utils/constants";
import { PRICE_ACTION_PATH } from "../utils/routes/paths";
import { LoadingSpinner } from "./LoadingSpinner";
import { MarketOverview } from "./overview/MarketOverview";
const PriceAction = React.lazy(() => import("./price-action/PriceAction"));

export const AppRouter: FC = (props) => {
  return (
    <Switch>
      <Route path="/" exact={true}>
        <MarketOverview />
      </Route>
      <Route path={`${PRICE_ACTION_PATH}:id`}>
        <Suspense fallback={<LoadingSpinner />}>
          <PriceAction />
        </Suspense>
      </Route>
      <Route exact={true} path={`${PRICE_ACTION_PATH}`}>
        <Redirect
          to={{
            pathname: `${PRICE_ACTION_PATH}${DEFAULT_ASSET_ID}`,
          }}
        />
      </Route>
    </Switch>
  );
};
