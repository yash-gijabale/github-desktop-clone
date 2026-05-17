import { Component, inject, OnInit } from "@angular/core";
import { DropDownLayoutCompoent } from "../common/dropdown-layout/dropdown-layout.component";
import { InputTextModule } from "primeng/inputtext";
import { DialogModule } from 'primeng/dialog';
import { RepositoryStoreService } from "../../store/repository-store.serveice";
import { IRepository } from "../../models/common.model";
import { RepositoryApiService } from "../../services/respository-api.service";
import { FormsModule } from "@angular/forms";


@Component({
    selector: 'repository-selection',
    templateUrl: 'repository-selection.component.html',
    imports: [
        DropDownLayoutCompoent,
        InputTextModule,
        DialogModule,
        FormsModule
    ]
})
export class RepositorySelectionComponent implements OnInit {

    private repositoryService = inject(RepositoryStoreService)
    private repositoryApiService = inject(RepositoryApiService)


    visible: boolean = false;
    isOpen: boolean = false
    repository = this.repositoryService.repository

    ngOnInit(): void {
        this.getRepositories();
    }

    getRepositories() {
        this.repositoryApiService.getAllRepositories()
            .subscribe(data => {
                let response: any = data.data;
                let repos: IRepository[] = response.map((repo: any) => ({ name: repo.repo_name, path: repo.repo_path, isPublic: false }))
                this.repositoryService.setRepositories(repos);
                let [repo] = repos;
                if (repo) {
                    this.repositoryService.setCurrentRepository(repo);
                    this.repositoryService.selectRepository(repo);
                }
            })
    }

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    handleCloseDropDownEvent(close: boolean) {
        this.isOpen = close;
    }



    showDialog() {
        this.visible = true;
    }

    repositoryPath: string = ''
    addRepository() {
        if (!this.repositoryPath) return;
        this.repositoryApiService.addRepository(this.repositoryPath)
            .subscribe(data => {
                console.log(data);
                window.location.reload()
            })
        //    this.repositoryService.addRepository(repository); 
        //    console.log(repository)
        //    console.log(this.repository())
    }

    changeRepository(repo: IRepository) {
        this.toggleDropdown();
        this.repositoryService.selectRepository(repo);
    }
}