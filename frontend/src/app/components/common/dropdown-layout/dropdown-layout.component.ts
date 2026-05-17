import { NgClass } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'dropdown-layout',
    template: `
        <div class="fixed inset-0 z-40 bg-black opacity-50 top-16" (click)="closeDropDownEvent.emit(false)"></div>
        <div class="w-full absolute  border-x border-black top-16 h-[calc(100vh-4.5rem)] z-50 bg-[#2a313c]"
        [ngClass]="minWidth"
        >
                <div class="h-full">
                    <ng-content select="[dropdwon-body]"></ng-content>
                </div>
        </div>
    
    `,
    imports:[NgClass]
})
export class DropDownLayoutCompoent {

    @Output() closeDropDownEvent = new EventEmitter<boolean>();
    @Input() minWidth: string = '';
}