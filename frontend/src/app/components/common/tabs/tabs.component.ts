import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'tabs',
    templateUrl: 'tabs.component.html',
    imports: [NgClass]
})
export class TabComponets {

    @Input() tabs: ITab[] = [];
    @Input() activeTab: string | null = null;

    @Output() tabChangeEvent = new EventEmitter<string>();


    setTab(tab: string) {
        this.tabChangeEvent.emit(tab);
    }
}