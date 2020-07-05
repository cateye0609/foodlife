import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { API } from '../_api/apiURL';

import { ImageModel } from '../_models/image.model';

@Injectable({ providedIn: 'root' })
export class CommonService {

    constructor(
        private toastr: ToastrService,
        private http: HttpClient
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

    // Upload ảnh
    upload_image(image: any, description: string) {
        let body = new FormData();
        body.append('file', image);
        body.append('description', description);
        return this.http.post<ImageModel>(API.UPLOAD_IMAGE, body)
            .pipe(
                catchError(err => this.handleError(err, "Lỗi khi upload ảnh!"))
            );
    }
}