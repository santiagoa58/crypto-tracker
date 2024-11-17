import { Observable } from "rxjs";
import { delay, retryWhen } from "rxjs/operators";

const DEFAULT_ERROR_MESSAGE = "connection failed, retrying...";
export const retryConnection = <T>(errorMessage = DEFAULT_ERROR_MESSAGE) =>
  retryWhen<T>((errors: Observable<any>) => errors.pipe(delay(2000)));
