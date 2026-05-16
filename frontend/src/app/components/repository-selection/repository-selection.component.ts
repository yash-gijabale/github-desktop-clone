import { Component } from "@angular/core";
import { DropDownLayoutCompoent } from "../common/dropdown-layout/dropdown-layout.component";

@Component({
    selector: 'repository-selection',
    templateUrl: 'repository-selection.component.html',
    imports:[DropDownLayoutCompoent]
})
export class RepositorySelectionComponent {


    isOpen: boolean = false

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    handleCloseDropDownEvent(close:boolean){
        this.isOpen=close;
    }   
}