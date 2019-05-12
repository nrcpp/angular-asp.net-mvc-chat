import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.API = 'http://localhost:33333/api';
        this.JOGGING_RECORDS_ENDPOINT = this.API + "/joggingrecords";
    }
    ApiService.prototype.getAll = function () {
        return this.http.get(this.JOGGING_RECORDS_ENDPOINT);
    };
    ApiService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ApiService);
    return ApiService;
}());
export default ApiService;
//# sourceMappingURL=api.service.js.map