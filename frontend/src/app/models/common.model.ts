export interface ITab {
    title: string,
    subTitle?: string | number | null,
    value: string
}

export interface IBranch {
    name: string,
    isSelected?: boolean,
    lastCommit: string,
    isDefault?: boolean,
    displayTime?:string
}

export interface IBranchGroup {
    group: string,
    branch: IBranch[]
}


export interface IRepository {
    name: string,
    path: string,
    isPublic?: boolean
}

export interface IRepositoryStore {
    currentRepo: IRepository | null,
    repositories: IRepository[],
    branches: IBranchGroup[],
    currentBranch?:IBranch
}

export interface IFileChange{
    path:string,
    status:string
}