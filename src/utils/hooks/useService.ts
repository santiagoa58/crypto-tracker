import { useCallback, useEffect, useReducer, useRef } from "react";
import { Observable, Subscription } from "rxjs";
import { UseServiceActions, UseServiceActionsTypes } from "./useServiceActions";

type Service<Request, Response> = (request: Request) => Observable<Response>;

interface ServiceResponseHandler<Response> {
  onResponse?(response: Response): void;
  onError?(error: unknown): void;
}

interface ServiceState {
  status: "FETCH_REQUESTED" | "IDLE";
  request?: any;
}

const initialServiceState: ServiceState = {
  status: "IDLE",
};

const serviceReducer = (
  state = initialServiceState,
  action: UseServiceActions,
): ServiceState => {
  switch (action.type) {
    case UseServiceActionsTypes.FETCH_REQUEST:
      return { ...state, status: "FETCH_REQUESTED", request: action.payload };
    case UseServiceActionsTypes.RESET:
      return initialServiceState;
    default:
      return state;
  }
};

export const useService = <Request, Response>(
  service: Service<Request, Response>,
  handlers?: ServiceResponseHandler<Response>,
) => {
  const [serviceState, dispatch] = useReducer(
    serviceReducer,
    initialServiceState,
  );

  const handlersRef = useRef<ServiceResponseHandler<Response> | undefined>(
    handlers,
  );

  if (!handlersRef.current) {
    handlersRef.current = handlers;
  }

  useEffect(() => {
    let subscription: Subscription;
    if (serviceState.status === "FETCH_REQUESTED") {
      subscription = service(serviceState.request).subscribe({
        next(nextValue) {
          handlersRef.current?.onResponse?.(nextValue);
        },
        complete() {
          dispatch({ type: UseServiceActionsTypes.RESET });
          subscription?.unsubscribe();
        },
        error(error) {
          console.error(error);
          handlersRef.current?.onError?.(error);
          dispatch({ type: UseServiceActionsTypes.RESET });
        },
      });
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, [service, serviceState.request, serviceState.status]);

  const setRequest = useCallback(
    (request: Request) => {
      dispatch({
        type: UseServiceActionsTypes.FETCH_REQUEST,
        payload: request,
      });
    },
    [dispatch],
  );

  return setRequest;
};
