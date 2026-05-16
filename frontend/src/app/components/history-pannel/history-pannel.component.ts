import { Component } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { CommitCardComponent } from "../commit-card/commit-card.component";


@Component({
    selector:'history-pannel',
    templateUrl:'history-pannel.component.html',
    imports: [InputTextModule, CommitCardComponent]
})
export class HistoryPannelComponent{


}