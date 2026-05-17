import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { DropDownLayoutCompoent } from "../common/dropdown-layout/dropdown-layout.component";
import { TabComponets } from "../common/tabs/tabs.component";
import { BranchGroupsComponent } from "../branch-groups/branch-groups.component";
import { InputTextModule } from "primeng/inputtext";
import { IBranch, IBranchGroup, ITab } from "../../models/common.model";
import { RepositoryStoreService } from "../../store/repository-store.serveice";
import { RepositoryApiService } from "../../services/respository-api.service";
import { firstValueFrom } from "rxjs";
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from "primeng/radiobutton";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'branch-selection',
    templateUrl: 'branch-sleection.component.html',
    imports: [
        DropDownLayoutCompoent,
        TabComponets,
        BranchGroupsComponent,
        InputTextModule,
        DialogModule,
        RadioButtonModule,
        FormsModule
    ]
})
export class BranchSelectionComponent {

    repositoryService = inject(RepositoryStoreService)

    repositoryApiService = inject(RepositoryApiService)

    cdr = inject(ChangeDetectorRef);

    isOpen: boolean = false
    activeTab: string = 'BRANCHS';

    isMoveToStash: 'STASH' | 'BRING' = 'STASH';

    tabs: ITab[] = [
        {
            title: 'Branches',
            value: 'BRANCHS'
        },
        {
            title: 'Pull requests',
            value: 'PULL_REQUESTS',
            subTitle: 2
        }
    ];

    // branchGroups:IBranchGroup[] = this.repositoryService.branches();

    branchGroups = this.repositoryService.branches;
    currentRepository = this.repositoryService.currentRepository;
    currentBranch = this.repositoryService.currentBranch;

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    handleCloseDropDownEvent(close: boolean) {
        this.isOpen = close;
    }

    handleChangeBranchEvent(branch: IBranch) {
        if (!branch) return;
        this.handleChangeBranch(branch);
    }

    nextBranch: IBranch
    async handleChangeBranch(brach: IBranch) {
        this.nextBranch = brach;
        try {
            const repo = this.currentRepository();
            if (!repo) {
                console.error('Repository not found!')
                return;
            }
            let changeFiles = await firstValueFrom(this.repositoryApiService.getGitStatus(repo.path));
            if (changeFiles.result.data && changeFiles.result.data.length) {
                console.log("Stash changes before switch")
                this.showDialog()
                this.cdr.detectChanges();
                return;
            } else {
                this.changeBranch()
            }
        } catch (error) {

        }
    }

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    changeBranch() {
        let path = this.currentRepository().path;
        let isStash = this.isMoveToStash == 'STASH' ? true : false;
        this.repositoryApiService.checkoutBranch(path, this.nextBranch.name, this.isMoveToStash, this.currentBranch().name)
            .subscribe(data => {
                console.log(data)
                this.repositoryService.setCurrentBranch(this.nextBranch);
                this.visible=false;
                this.toggleDropdown();
                this.cdr.detectChanges();
            })
    }
}