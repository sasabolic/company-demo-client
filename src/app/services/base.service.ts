import {Observable} from "rxjs/index";
import {of} from "rxjs/internal/observable/of";
import {MatSnackBar} from "@angular/material";

export class BaseService {

  constructor(protected snackBar: MatSnackBar) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // Log error to console
      console.error(error);

      let e = error.error;

      this.openSnackBar(e.message + ': ' + e.errors, "Error");

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  protected handleSuccess(message: string) {
    this.openSnackBar(message, "Success");
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition:'end'
    });
  }
}
