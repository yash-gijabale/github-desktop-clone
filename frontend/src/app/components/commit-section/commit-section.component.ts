import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from "primeng/button";
import { NgClass } from "@angular/common";

@Component({
    selector: 'commit-section',
    templateUrl: 'commit-section.component.html',
    imports: [
    FormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    NgClass
]
})
export class CommitSectionComponent {


    commitMessage: string = '';
    description: string = '';


    addCommit(){
        console.log(this.commitMessage)
    }
}