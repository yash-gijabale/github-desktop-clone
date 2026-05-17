import { Component, inject, OnInit } from "@angular/core";
import { RepositorySelectionComponent } from "../../components/repository-selection/repository-selection.component";
import { BranchSelectionComponent } from "../../components/branch-selection/branch-sleection.component";
import { RepositoryStoreService } from "../../store/repository-store.serveice";

@Component({
    selector: 'app-top-bar',
    templateUrl: 'top-bar.component.html',
    imports: [RepositorySelectionComponent, BranchSelectionComponent]
})
export class TopBarComponent implements OnInit {

    private repositoryStore = inject(RepositoryStoreService);

    currentRepository = this.repositoryStore.currentRepository

    ngOnInit(): void {
        console.log(this.currentRepository())
    }

 }