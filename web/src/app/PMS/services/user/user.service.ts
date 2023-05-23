import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTPResponse } from '../../model/HTTPResponse';
import { User, UserRoles } from '../../model/auth';
import { IPermission } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUsers(): Observable<HTTPResponse<User[]>> {
    return this.httpClient.get<HTTPResponse<User[]>>(`${environment.server_Url}user/all`);
  }
 
  addUserAuthItem(authItem: {}): Observable<HTTPResponse<User>> {
    return this.httpClient.post<HTTPResponse<User>>(`${environment.server_Url}/user/admin`, authItem);
  }
  // deleteUserAuthItem(authItem:{}){
    
  // }
  createUser(user: User): Observable<HTTPResponse<User>> {
    return this.httpClient.post<HTTPResponse<User>>(`${environment.server_Url}auth/create-user`, user);
  }

  updateUser(user: User, userId: string): Observable<HTTPResponse<User>> {
    return this.httpClient.patch<HTTPResponse<User>>(`${environment.server_Url}user/${userId}`, user);
  }

  // deleteUser(userId: string): Observable<HTTPResponse<User>> {
  //   return this.httpClient.delete<HTTPResponse<User>>(`${environment.server_Url}/user/admin/${userId}/deleteUser`);
  // }

  deleteUser(userId: string): Observable<HTTPResponse<User>> {
    return this.httpClient.delete<HTTPResponse<User>>(`${environment.server_Url}user/${userId}`);
  }

  restoreDeletedUser(userId: string): Observable<HTTPResponse<User>> {
    return this.httpClient.delete<HTTPResponse<User>>(`${environment.server_Url}/user/unslateforDeletion/${userId}`);
  }

  getDeletedUsers(): Observable<HTTPResponse<User[]>> {
    return this.httpClient.get<HTTPResponse<User[]>>(`${environment.server_Url}/user/admin/allDeleted`);
  }

  getUserById(userId: string): Observable<HTTPResponse<User>> {
    return this.httpClient.get<HTTPResponse<User>>(`${environment.server_Url}user/${userId}`);
  }

  assignUserRole(userId:string,role:IPermission): Observable<HTTPResponse<User>> {
    return this.httpClient.patch<HTTPResponse<User>>(`${environment.server_Url}user/assign/${userId}`, role);
  }

  unAssignUserRole(role: {role: UserRoles}, userId: string): Observable<HTTPResponse<User>> {
    return this.httpClient.post<HTTPResponse<User>>(`${environment.server_Url}user/unassign/${userId}`, role);
  }

  // getAllUserRoles(): Observable<HTTPResponse<UserRoles[]>> {
  //   return this.httpClient.get<HTTPResponse<UserRoles[]>>(`${environment.server_Url}/userRole/all`);
  // }

  // getAllHardCodedUserRoles(): Observable<HTTPResponse<string[]>> {
  //   return this.httpClient.get<HTTPResponse<string[]>>(`${environment.server_Url}/user/getAvailableSystemRoles`);
  // }



  getUserProfile(): Observable<HTTPResponse<User>> {
    return this.httpClient.get<HTTPResponse<User>>(`${environment.server_Url}/user/profile`);
  }

  updateUserProfile(user: {}): Observable<HTTPResponse<User>> {
    return this.httpClient.post<HTTPResponse<User>>(`${environment.server_Url}/user/profile`, user);
  }

 

 
}
