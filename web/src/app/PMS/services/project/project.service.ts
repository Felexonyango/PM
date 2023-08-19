
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HTTPResponse } from '../../model/HTTPResponse';
import { IProject } from '../../model/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  project!:IProject
 
  constructor(private http: HttpClient) {}
  public addProject(project:{}): Observable<HTTPResponse<IProject>> {
    return this.http.post<HTTPResponse<IProject>>( `${environment.server_Url}project/create`,
    project);
  }
  public editProject(
    project: {},
    projectId: string
  ): Observable<HTTPResponse<IProject>> {
    return this.http.patch<HTTPResponse<IProject>>(
      `${environment.server_Url}project/${projectId}`,
      project
    );
  }

  public AssignProject(
    project: {},
    projectId: string
  ): Observable<HTTPResponse<IProject>> {
    return this.http.patch<HTTPResponse<IProject>>(
      `${environment.server_Url}project/assignTo/${projectId}`,
      project
    );
  }
  public UpdateProjectPercentage(
    project: {},
    projectId: string
  ): Observable<HTTPResponse<IProject>> {
    return this.http.patch<HTTPResponse<IProject>>(
      `${environment.server_Url}project/updatePercentage/${projectId}`,
      project
    );
  }
  public getProjectById(
    projectId: string
  ): Observable<HTTPResponse<IProject>> {
    return this.http.get<HTTPResponse<IProject>>(
      `${environment.server_Url}project/${projectId}`
    );
  }

  public getAllProjectsByWorkspaceId(workspaceId:string): Observable<HTTPResponse<IProject[]>> {
    return this.http.get<HTTPResponse<IProject[]>>(
      `${environment.server_Url}project/workspace/all/${workspaceId}`
    );
  }
  public getAllProjects(): Observable<HTTPResponse<IProject[]>> {
    return this.http.get<HTTPResponse<IProject[]>>(
      `${environment.server_Url}project/all`
    );
  }
  public getAllCompletedProjects(): Observable<HTTPResponse<IProject[]>> {
    return this.http.get<HTTPResponse<IProject[]>>(
      `${environment.server_Url}project/all/completed`
    );
  }
  public getAllOnProjects(): Observable<HTTPResponse<IProject[]>> {
    return this.http.get<HTTPResponse<IProject[]>>(
      `${environment.server_Url}project/onhold`
    );
  }
  public getAllOngoing(): Observable<HTTPResponse<IProject[]>> {
    return this.http.get<HTTPResponse<IProject[]>>(
      `${environment.server_Url}project/ongoing`
    );
  }
  public getAllPendingProjects(): Observable<HTTPResponse<IProject[]>> {
    return this.http.get<HTTPResponse<IProject[]>>(
      `${environment.server_Url}project/pending`
    );
  }
  public getAllProjectsAssignedTome(): Observable<HTTPResponse<IProject[]>> {
    return this.http.get<HTTPResponse<IProject[]>>(
      `${environment.server_Url}project/all/myprojects`
    );
  }
 
  deleteProject(projectId: string): Observable<HTTPResponse<IProject>> {
    return this.http.delete<HTTPResponse<IProject>>(
      `${environment.server_Url}project/${projectId}`
    );
  }

  public getSummary(): Observable<HTTPResponse<any>> {
    return this.http.get<HTTPResponse<any>>(
      `${environment.server_Url}project/dashboard/user/totals`
    );
  }
 
}