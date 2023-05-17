
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
    return this.http.post<HTTPResponse<IProject>>(
      `${environment.server_Url}/${projectId}project`,
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
      `${environment.server_Url}/${workspaceId}`
    );
  }
  public getAllProjects(): Observable<HTTPResponse<IProject[]>> {
    return this.http.get<HTTPResponse<IProject[]>>(
      `${environment.server_Url}project`
    );
  }
 
  deleteProject(projectId: string): Observable<HTTPResponse<IProject>> {
    return this.http.delete<HTTPResponse<IProject>>(
      `${environment.server_Url}project/${projectId}`
    );
  }

 
 
}