import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTPResponse } from '../../model/HTTPResponse';
import { ITask } from '../../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  public addTask(task:{}): Observable<HTTPResponse<ITask>> {
    return this.http.post<HTTPResponse<ITask>>( `${environment.server_Url}task/create`,
    task);
  }
  public editTask(
    task: {},
    taskId: string
  ): Observable<HTTPResponse<ITask>> {
    return this.http.patch<HTTPResponse<ITask>>(
      `${environment.server_Url}task/${taskId}`,
      task
    );
  }

  public AssignTask(
    task: {},
    taskId: string
  ): Observable<HTTPResponse<ITask>> {
    return this.http.patch<HTTPResponse<ITask>>(
      `${environment.server_Url}task/assignTo/${taskId}`,
      task
    );
  }
  public UpdateTaskPercentage(
    task: {},
    taskId: string
  ): Observable<HTTPResponse<ITask>> {
    return this.http.patch<HTTPResponse<ITask>>(
      `${environment.server_Url}task/updatePercentage/${taskId}`,
      task
    );
  }
  public getTaskById(
    taskId: string
  ): Observable<HTTPResponse<ITask>> {
    return this.http.get<HTTPResponse<ITask>>(
      `${environment.server_Url}task/${taskId}`
    );
  }
  public getAllTasks():Observable<HTTPResponse<ITask[]>>{
    return this.http.get<HTTPResponse<ITask[]>>(
      `${environment.server_Url}task/all`
    )
  }
  deleteTask(taskId:string):Observable<HTTPResponse<ITask>>{
    return this.http.delete<HTTPResponse<ITask>>(
      `${environment.server_Url}delete${taskId}`
    )
  }
  public getAllMyTasks():Observable<HTTPResponse<ITask[]>>{
    return this.http.get<HTTPResponse<ITask[]>>(
      `${environment.server_Url}all/mytask`
    )
  }
}
