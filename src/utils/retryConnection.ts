import { Observable } from "rxjs";
import { retryWhen, tap, delay } from "rxjs/operators";

const DEFAULT_ERROR_MESSAGE = "connection failed, retrying...";
export const retryConnection = <T>(errorMessage = DEFAULT_ERROR_MESSAGE) =>
  retryWhen<T>((errors: Observable<any>) =>
    errors.pipe(
      tap(() => console.log(errorMessage)),
      delay(2000),
    ),
  );
