import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';

import { API } from '../_api/apiURL';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../_services/common.service';

@Injectable()
export class ProfileService {

    constructor(
        private http: HttpClient,
        private commonService: CommonService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    // Lấy thông tin user
    get_userinfo() {
        let username = localStorage.getItem('username');

        return this.http.get(API.PROFILE + username)
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy thông tin user!"))
            );
    }
}