import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HTTPResponse } from "../../model/HTTPResponse";
import { IPermission } from "../../model/user.model";

@Injectable({
    providedIn: "root",
})
export class PermissionService {
    constructor(private httpClient: HttpClient) {}

    getAllPermissions(): Observable<HTTPResponse<IPermission[]>> {
        return this.httpClient.get<HTTPResponse<IPermission[]>>(
            `${environment.server_Url}role/allRoles`
        );
    }

    getPermissionById(
        permissionId: string
    ): Observable<HTTPResponse<IPermission>> {
        return this.httpClient.get<HTTPResponse<IPermission>>(
            `${environment.server_Url}role/${permissionId}`
        );
    }

    createPermission(
        permission: IPermission
    ): Observable<HTTPResponse<IPermission>> {
        return this.httpClient.post<HTTPResponse<IPermission>>(
            `${environment.server_Url}role/create-role`,
            permission
        );
    }

    updatePermission(
        permissionId: string,
        permission: IPermission
    ): Observable<HTTPResponse<IPermission>> {
        return this.httpClient.patch<HTTPResponse<IPermission>>(
            `${environment.server_Url}${permissionId}`,
            permission
        );
    }

    deletePermission(
        permissionId: string
    ): Observable<HTTPResponse<IPermission>> {
        return this.httpClient.delete<HTTPResponse<IPermission>>(
            `${environment.server_Url}delete/${permissionId}`
        );
    }

    
 
}
