import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IBranch, IBranchGroup } from "../../models/common.model";
import { CommonModule, NgClass } from "@angular/common";

@Component({
    selector: 'branch-group',
    templateUrl: 'branch-groups.component.html',
    imports:[NgClass]
})
export class BranchGroupsComponent {

    @Input() groups: IBranchGroup[] = [];
    @Output() chnageBranchEvent = new EventEmitter<IBranch>();
    @Input() activeBranch?:IBranch

    changeBranch(branch:IBranch){
        this.chnageBranchEvent.emit(branch);
    }
}