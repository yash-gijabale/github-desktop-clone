import { NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { ChangesPannelComponent } from "../../components/changes-pannel/changes-pannel.component";
import { HistoryPannelComponent } from "../../components/history-pannel/history-pannel.component";

type SIDE_BAR_TAB = 'CHANGES' | 'HISTORY'

@Component({
    selector: 'app-side-bar',
    templateUrl: 'side-bar.component.html',
    imports: [NgClass, ButtonModule, ChangesPannelComponent, HistoryPannelComponent]
})
export class SideBarComoponent {

    activeTab: SIDE_BAR_TAB = 'HISTORY';

    setTab(tab: SIDE_BAR_TAB) {
        this.activeTab = tab;
    }
}