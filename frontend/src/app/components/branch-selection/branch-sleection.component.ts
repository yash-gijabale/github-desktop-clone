import { Component } from "@angular/core";
import { DropDownLayoutCompoent } from "../common/dropdown-layout/dropdown-layout.component";
import { TabComponets } from "../common/tabs/tabs.component";

@Component({
    selector: 'branch-selection',
    templateUrl: 'branch-sleection.component.html',
    imports: [DropDownLayoutCompoent, TabComponets]
})
export class BranchSelectionComponent {

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
    ]

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    handleCloseDropDownEvent(close: boolean) {
        this.isOpen = close;
    }
}