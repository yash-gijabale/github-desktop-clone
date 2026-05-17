import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'commit-card',
    templateUrl: 'commit-card.component.html',
    imports:[TooltipModule, DatePipe]
})
export class CommitCardComponent {
    @Input() commit:any = null;

}