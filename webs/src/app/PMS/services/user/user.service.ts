import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTPResponse } from '../../model/HTTPResponse';
import { User, UserRoles } from '../../model/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUsers(organizationId:string): Observable<HTTPResponse<User[]>> {
    return this.httpClient.get<HTTPResponse<User[]>>(`${environment.server_Url}/user/admin/${organizationId}`);
  }

  createUser(user: User,organizationId:string): Observable<HTTPResponse<User>> {
    return this.httpClient.post<HTTPResponse<User>>(`${environment.server_Url}/user/admin/${organizationId}`, user);
  }

  updateUser(user: User, userId: string): Observable<HTTPResponse<User>> {
    return this.httpClient.post<HTTPResponse<User>>(`${environment.server_Url}/user/admin/updateUser/${userId}`, user);
  }

  // deleteUser(userId: string): Observable<HTTPResponse<User>> {
  //   return this.httpClient.delete<HTTPResponse<User>>(`${environment.server_Url}/user/admin/${userId}/deleteUser`);
  // }

  deleteUser(userId: string): Observable<HTTPResponse<User>> {
    return this.httpClient.delete<HTTPResponse<User>>(`${environment.server_Url}/user/slateforDeletion/${userId}`);
  }

  restoreDeletedUser(userId: string): Observable<HTTPResponse<User>> {
    return this.httpClient.delete<HTTPResponse<User>>(`${environment.server_Url}/user/unslateforDeletion/${userId}`);
  }

  getDeletedUsers(): Observable<HTTPResponse<User[]>> {
    return this.httpClient.get<HTTPResponse<User[]>>(`${environment.server_Url}/user/admin/allDeleted`);
  }

  getUserById(userId: string): Observable<HTTPResponse<User>> {
    return this.httpClient.get<HTTPResponse<User>>(`${environment.server_Url}/user/admin/getUser/${userId}`);
  }

  assignUserRole(role: {role: UserRoles}, userId: string): Observable<HTTPResponse<User>> {
    return this.httpClient.post<HTTPResponse<User>>(`${environment.server_Url}/user/admin/assignRole/${userId}`, role);
  }

  unAssignUserRole(role: {role: UserRoles}, userId: string): Observable<HTTPResponse<User>> {
    return this.httpClient.post<HTTPResponse<User>>(`${environment.server_Url}/user/admin/removeRole/${userId}`, role);
  }

  getAllUserRoles(): Observable<HTTPResponse<UserRoles[]>> {
    return this.httpClient.get<HTTPResponse<UserRoles[]>>(`${environment.server_Url}/userRole/all`);
  }

  getAllHardCodedUserRoles(): Observable<HTTPResponse<string[]>> {
    return this.httpClient.get<HTTPResponse<string[]>>(`${environment.server_Url}/user/getAvailableSystemRoles`);
  }

  createUserRole(userRole: UserRoles): Observable<HTTPResponse<UserRoles>> {
    return this.httpClient.post<HTTPResponse<UserRoles>>(`${environment.server_Url}/userRole`, userRole);
  }

  updateUserRole(userRole: UserRoles, userRoleId: string): Observable<HTTPResponse<UserRoles>> {
    return this.httpClient.post<HTTPResponse<UserRoles>>(`${environment.server_Url}/userRole/update/${userRoleId}`, userRole);
  }

  deleteUserRole(userRoleId: string): Observable<HTTPResponse<UserRoles>> {
    return this.httpClient.delete<HTTPResponse<UserRoles>>(`${environment.server_Url}/userRole/delete/${userRoleId}`);
  }

  getUserRoleById(userRoleId: string): Observable<HTTPResponse<UserRoles>> {
    return this.httpClient.get<HTTPResponse<UserRoles>>(`${environment.server_Url}/userRole/${userRoleId}`);
  }

  getUserProfile(): Observable<HTTPResponse<User>> {
    return this.httpClient.get<HTTPResponse<User>>(`${environment.server_Url}/user/profile`);
  }

  updateUserProfile(user: {}): Observable<HTTPResponse<User>> {
    return this.httpClient.post<HTTPResponse<User>>(`${environment.server_Url}/user/profile`, user);
  }

 

 
}
