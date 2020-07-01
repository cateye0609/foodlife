import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class CommonService {

    constructor(
        private toastr: ToastrService
    ) { }

    // Xử lí lỗi
    public handleError(error: HttpErrorResponse, errorText: string) {
        if (error.error instanceof ErrorEvent) {
            console.error("Client side error: ", error.error.message);
        } else {
            console.error("Server side error: ", error.error.message);
        }
        this.toastr.error(errorText);
        return throwError(error);
    }
}