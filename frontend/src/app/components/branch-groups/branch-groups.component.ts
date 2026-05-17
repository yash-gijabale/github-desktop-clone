import { Component, Input } from "@angular/core";
import { IBranchGroup } from "../../models/common.model";

@Component({
    selector: 'branch-group',
    templateUrl: 'branch-groups.component.html'
})
export class BranchGroupsComponent {

    @Input() groups: IBranchGroup[] = [];

}