import { computed, inject, Injectable, signal } from "@angular/core";
import { IBranch, IRepository, IRepositoryStore } from "../models/common.model";
import { RepositoryApiService } from "../services/respository-api.service";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class RepositoryStoreService {

    private repositoryApi = inject(RepositoryApiService)

    private _repository = signal<IRepositoryStore>({
        currentRepo: null,
        repositories: [],
        branches: []
    });

    readonly repository = computed(
        () => this._repository()
    );

    readonly branches = computed(
        () => this._repository().branches
    )

    readonly currentRepository = computed(
        () => this._repository().currentRepo
    )

    readonly currentBranch = computed(
        () => this._repository().currentBranch
    )

    setCurrentRepository(selectedRepo: IRepository) {
        this._repository.update(repo => {
            return {
                ...repo,
                currentRepo: selectedRepo,
            }
        })
    }

    setRepositories(repos: IRepository[]) {
        this._repository.update(state => ({
            ...state,
            repositories: repos,
        }))
    }

    addRepository(repository: IRepository) {
        this._repository.update(state => ({
            currentRepo: repository,
            repositories: [...state.repositories, repository],
            branches: []
        }))
    }

    async selectRepository(repo: IRepository) {

        // update selected repo immediately
        this._repository.update(state => ({
            ...state,
            currentRepo: repo
        }));

        // fetch branches
        console.log(repo.path)
        let currentBranch: IBranch | null = null;
        const response: any =
            await firstValueFrom(this.repositoryApi.getBranchOfCurrentRepo(repo.path));
        let branches: IBranch[] = response?.data?.branches?.map((branch: any) => {
            if (branch.isCurrent) {
                currentBranch = { name: branch.name, lastCommit: branch.createdOn }
            }
            return {
                name: branch.name,
                lastCommit: branch.createdOn,
                displayTime: branch.displayTime
            }
        })

        let defaultBranchBranch: IBranch = {
            name: response?.data?.defaultBranch,
            lastCommit: ''
        }

        if (currentBranch) {
            this.setCurrentBranch(currentBranch);
        }

        // update branches
        this._repository.update(state => ({
            ...state,
            branches: [
                { group: 'Default Branch', branch: [defaultBranchBranch] },
                { group: 'Other beanches', branch: branches }
            ]
        }));
    }

    setCurrentBranch(branch: IBranch) {
        this._repository.update(state => ({
            ...state,
            currentBranch: branch
        }))
    }

}