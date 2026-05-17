import { Component, inject, OnInit } from "@angular/core";
import { DropDownLayoutCompoent } from "../common/dropdown-layout/dropdown-layout.component";
import { InputTextModule } from "primeng/inputtext";
import { DialogModule } from 'primeng/dialog';
import { RepositoryStoreService } from "../../store/repository-store.serveice";
import { IRepository } from "../../models/common.model";


@Component({
    selector: 'repository-selection',
    templateUrl: 'repository-selection.component.html',
    imports: [
        DropDownLayoutCompoent,
        InputTextModule,
        DialogModule
    ]
})
export class RepositorySelectionComponent implements OnInit {

    private repositoryService = inject(RepositoryStoreService)


    visible: boolean = false;
    isOpen: boolean = false
    repository = this.repositoryService.repository

    ngOnInit(): void {
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

    addRepository() {
       let repository:IRepository = {name:'cqra-qa-ui', path:"d/cqra", isPublic:false};
       this.repositoryService.addRepository(repository); 
       console.log(repository)
       console.log(this.repository())
    }
}