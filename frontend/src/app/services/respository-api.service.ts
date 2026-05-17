import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface IResponse {
    data: {
        data: any,
        message: string
    },
    status: string
}

export interface IResponse2 {
    result: {
        data: any,
        message: string
    },
    status: string
}
@Injectable({
    providedIn: 'root'
})
export class RepositoryApiService {

    BASE_URL = 'http://localhost:3000'

    constructor(
        private http: HttpClient
    ) { }

    getAllRepositories(): Observable<IResponse> {
        return this.http.get<any>(`${this.BASE_URL}/repo/all`);
    }

    addRepository(path: string): Observable<any> {
        return this.http.get(`${this.BASE_URL}/repo/new?path=${path}`)
    }

    getBranchOfCurrentRepo(path:string):any{
        return this.http.get(`${this.BASE_URL}/exec/repo/branches?repo=${path}`)
    }

    getGitStatus(path:string):Observable<any>{
        return this.http.get<IResponse2>(`${this.BASE_URL}/exec/repo/status?repo=${path}`)
    }

    getCommitLogs(path:string, branch:string):Observable<any>{
        return this.http.get<IResponse2>(`${this.BASE_URL}/exec/repo/log?repo=${path}&branch=${branch}`)
    }

    checkoutBranch(path:string, branch:string, isStash:string, preBranchName=null){
        return this.http.get<IResponse2>(`${this.BASE_URL}/exec/repo/checkout?repo=${path}&branch=${branch}&isStash=${isStash}&preBranch=${preBranchName}`);
    }
}