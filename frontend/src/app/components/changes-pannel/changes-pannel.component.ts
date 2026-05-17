import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ChangedFileCardComponent } from "../changed-file-card/changed-file-card.component";
import { CommitSectionComponent } from "../commit-section/commit-section.component";
import { IBranch, IFileChange, IRepository } from "../../models/common.model";
import { RepositoryApiService } from "../../services/respository-api.service";


@Component({
    selector: "changes-pannel",
    templateUrl: 'changes-pannel.component.html',
    imports: [
        InputTextModule,
        FormsModule,
        CheckboxModule,
        ChangedFileCardComponent,
        CommitSectionComponent
    ]
})
export class ChangesPannelComponent implements OnInit, OnChanges, OnDestroy {

    repositoryApi = inject(RepositoryApiService)
    cdk = inject(ChangeDetectorRef)

    searchFiles: string = ''

    @Input() currentRepository: IRepository | null;

    changedFiles: IFileChange[] = []

    pollingInteval: any = null

    ngOnInit(): void {
        // this.getChangedFile();
        this.startPolling();
    }

    startPolling() {
        if (this.pollingInteval) {
            clearInterval(this.pollingInteval);
        }
        this.pollingInteval = setInterval(() => {
            this.getChangedFile();
        }, 5000)
    }

    ngOnDestroy(): void {
        clearInterval(this.pollingInteval)
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['currentRepository']) {
            this.getChangedFile()
        }
    }


    getChangedFile() {
        if (this.currentRepository) {
            this.repositoryApi.getGitStatus(this.currentRepository?.path)
                .subscribe(res => {
                    this.changedFiles = [...res.result.data];
                    this.cdk.detectChanges();
                }, err => {
                    console.log(err)
                })
        }
    }
}