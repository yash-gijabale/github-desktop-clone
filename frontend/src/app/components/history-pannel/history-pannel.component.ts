import { ChangeDetectorRef, Component, inject, Input, SimpleChanges } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { CommitCardComponent } from "../commit-card/commit-card.component";
import { RepositoryApiService } from "../../services/respository-api.service";
import { IBranch, IRepository } from "../../models/common.model";


@Component({
    selector: 'history-pannel',
    templateUrl: 'history-pannel.component.html',
    imports: [InputTextModule, CommitCardComponent]
})
export class HistoryPannelComponent {

    repositoryApi = inject(RepositoryApiService)
    cdk = inject(ChangeDetectorRef)

    searchFiles: string = ''

    @Input() currentRepository: IRepository | null;
    @Input() currentBranch?:IBranch;

    commitLogs = []

    ngOnInit(): void {
        // this.getChangedFile();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['currentRepository'] || changes['currentBranch']) {
            this.getCommitLogs()
        }
    }


    getCommitLogs() {
        if (this.currentRepository) {
            this.repositoryApi.getCommitLogs(this.currentRepository?.path, this.currentBranch.name)
                .subscribe(res => {
                    this.commitLogs = res.data.result;
                    console.log(this.commitLogs)
                    this.cdk.detectChanges();
                }, err => {
                    console.log(err)
                })
        }
    }

}