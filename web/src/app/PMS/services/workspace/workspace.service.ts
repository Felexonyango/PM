
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTPResponse } from '../../model/HTTPResponse';
import { IWorkspace } from '../../model/workspace.model';
@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private http: HttpClient) {}
  public addWorkspace(
    workspace: {}
  ): Observable<HTTPResponse<IWorkspace>> {
    return this.http.post<HTTPResponse<IWorkspace>>(
      `${environment.server_Url}workspace/create`,
      workspace
    );
  }
  public editWorkspace(
    workspace: {},
    workspaceId: any
  ): Observable<HTTPResponse<IWorkspace>> {
    return this.http.patch<HTTPResponse<IWorkspace>>(
      `${environment.server_Url}workspace/${workspaceId}`,
      workspace
    );
  }

  public getWorkspaceById(
    workspaceId: any
  ): Observable<HTTPResponse<IWorkspace>> {
    return this.http.get<HTTPResponse<IWorkspace>>(
      `${environment.server_Url}workspace/${workspaceId}`
    );
  }
  public getAllWorkspaceProjects(
    workspaceId: any
  ): Observable<HTTPResponse<[]>> {
    return this.http.get<HTTPResponse<[]>>(
      `${environment.server_Url}workspace/all/${workspaceId}/projects`
    );
  }
  public getAllWorkspaces(): Observable<HTTPResponse<IWorkspace[]>> {
    return this.http.get<HTTPResponse<IWorkspace[]>>(
      `${environment.server_Url}workspace/all `
    );
  }

  deleteWorkspace(
    workspaceId: string
  ): Observable<HTTPResponse<IWorkspace>> {
    return this.http.delete<HTTPResponse<IWorkspace>>(
      `${environment.server_Url}workspace/${workspaceId}`
    );
  }
  addMembersToWorkspace(workspaceId:string,members:{}):Observable<HTTPResponse<IWorkspace>> {
    return this.http.patch<HTTPResponse<IWorkspace>>(
      `${environment.server_Url}workspace/add-member/${workspaceId}`,
      members
    )

  }
}
