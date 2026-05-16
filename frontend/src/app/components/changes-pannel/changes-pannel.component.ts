import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ChangedFileCardComponent } from "../changed-file-card/changed-file-card.component";
import { CommitSectionComponent } from "../commit-section/commit-section.component";


@Component({
    selector: "changes-pannel",
    templateUrl: 'changes-pannel.component.html',
    imports: [
        InputTextModule,
        FormsModule,
        CheckboxModule,
        ChangedFileCardComponent,
        CommitSectionComponent
    ]
})
export class ChangesPannelComponent {


    searchFiles: string = ''
}