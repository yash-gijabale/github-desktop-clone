import { Component } from "@angular/core";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { SideBarComoponent } from "./side-bar/side-bar.component";

@Component({
    selector:'app-layout',
    templateUrl:'layout.component.html',
    imports: [TopBarComponent, SideBarComoponent]
})
export class LayoutComponent{


}