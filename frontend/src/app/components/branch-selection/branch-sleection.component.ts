import { Component, inject } from "@angular/core";
import { DropDownLayoutCompoent } from "../common/dropdown-layout/dropdown-layout.component";
import { TabComponets } from "../common/tabs/tabs.component";
import { BranchGroupsComponent } from "../branch-groups/branch-groups.component";
import { InputTextModule } from "primeng/inputtext";
import { IBranchGroup, ITab } from "../../models/common.model";
import { RepositoryStoreService } from "../../store/repository-store.serveice";

@Component({
    selector: 'branch-selection',
    templateUrl: 'branch-sleection.component.html',
    imports: [
        DropDownLayoutCompoent, 
        TabComponets, 
        BranchGroupsComponent,
        InputTextModule
    ]
})
export class BranchSelectionComponent {

    repositoryService = inject(RepositoryStoreService)

    isOpen: boolean = false
    activeTab: string = 'BRANCHS';

    tabs: ITab[] = [
        {
            title: 'Branches',
            value: 'BRANCHS'
        },
        {
            title: 'Pull requests',
            value: 'PULL_REQUESTS',
            subTitle: 2
        }
    ];

    branchGroups:IBranchGroup[] = this.repositoryService.branches();


    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    handleCloseDropDownEvent(close: boolean) {
        this.isOpen = close;
    }
}