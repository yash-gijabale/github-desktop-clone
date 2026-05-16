import { Component } from "@angular/core";
import { RepositorySelectionComponent } from "../../components/repository-selection/repository-selection.component";
import { BranchSelectionComponent } from "../../components/branch-selection/branch-sleection.component";

@Component({
    selector: 'app-top-bar',
    templateUrl: 'top-bar.component.html',
    imports: [RepositorySelectionComponent, BranchSelectionComponent]
})
export class TopBarComponent { }