import { computed, Injectable, signal } from "@angular/core";
import { IRepository, IRepositoryStore } from "../models/common.model";

@Injectable({
    providedIn: "root"
})
export class RepositoryStoreService {

    private _repository = signal<IRepositoryStore>({
        currentRepo: null,
        repositories: [],
        branches: [
            {
                group: 'Default branch',
                branch: [
                    {
                        name: 'feature/additional_details_tab',
                        lastCommit: '2 Days ago'
                    }
                ]
            },
            {
                group: 'Recent branches',
                branch: [
                    {
                        name: 'feature/data-capture-status-report',
                        lastCommit: '2 Days ago'
                    },
                    {
                        name: 'feature/get-report-users-change',
                        lastCommit: '3 Days ago'
                    }
                ]
            },
            {
                group: 'Other branches',
                branch: [
                    {
                        name: 'bugfix/edit-record-changes',
                        lastCommit: '2 Days ago'
                    },
                    {
                        name: 'feature/create-user-contractor-change',
                        lastCommit: '3 Days ago'
                    },
                    {
                        name: 'bugfix/edit-record-changes',
                        lastCommit: '2 Days ago'
                    },
                    {
                        name: 'feature/create-user-contractor-change',
                        lastCommit: '3 Days ago'
                    },
                    {
                        name: 'bugfix/edit-record-changes',
                        lastCommit: '2 Days ago'
                    },
                    {
                        name: 'feature/create-user-contractor-change',
                        lastCommit: '3 Days ago'
                    },
                    {
                        name: 'bugfix/edit-record-changes',
                        lastCommit: '2 Days ago'
                    },
                    {
                        name: 'feature/create-user-contractor-change',
                        lastCommit: '3 Days ago'
                    },
                    {
                        name: 'bugfix/edit-record-changes',
                        lastCommit: '2 Days ago'
                    },
                    {
                        name: 'feature/create-user-contractor-change',
                        lastCommit: '3 Days ago'
                    },
                    {
                        name: 'bugfix/edit-record-changes',
                        lastCommit: '2 Days ago'
                    },
                    {
                        name: 'feature/create-user-contractor-change',
                        lastCommit: '3 Days ago'
                    },
                    {
                        name: 'bugfix/edit-record-changes',
                        lastCommit: '2 Days ago'
                    },
                    {
                        name: 'feature/create-user-contractor-change',
                        lastCommit: '3 Days ago'
                    }
                ]
            }
        ]
    });

    readonly repository = computed(
        () => this._repository()
    );

    readonly branches = computed(
        () => this._repository().branches
    )

    setCurrentRepository(selectedRepo: IRepository) {
        this._repository.update(repo => {
            return {
                ...repo,
                currentRepo: selectedRepo,
            }
        })
    }

    addRepository(repository: IRepository) {
        this._repository.update(state => ({
            currentRepo: repository,
            repositories: [...state.repositories, repository],
            branches:[]
        }))
    }

}