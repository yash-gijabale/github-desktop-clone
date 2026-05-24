import { Component, inject } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { ChangesPannelComponent } from "../../components/changes-pannel/changes-pannel.component";
import { HistoryPannelComponent } from "../../components/history-pannel/history-pannel.component";
import { TabComponets } from "../../components/common/tabs/tabs.component";
import { ITab } from "../../models/common.model";
import { RepositoryStoreService } from "../../store/repository-store.serveice";

type SIDE_BAR_TAB = 'CHANGES' | 'HISTORY'

@Component({
    selector: 'app-side-bar',
    templateUrl: 'side-bar.component.html',
    imports: [ButtonModule, ChangesPannelComponent, HistoryPannelComponent, TabComponets, TabComponets]
})
export class SideBarComoponent {

    repositoryStore = inject(RepositoryStoreService);

    activeTab: string = 'HISTORY';

    currentReposotory = this.repositoryStore.currentRepository;
    currentBranch = this.repositoryStore.currentBranch;

    setTab(tab: string) {
        this.activeTab = tab;
    }

    tabs: ITab[] = [
        {
            title: 'Changes',
            value: 'CHANGES',
            // subTitle: 2
        },

        {
            title: 'History',
            value: 'HISTORY'
        }
    ]
}