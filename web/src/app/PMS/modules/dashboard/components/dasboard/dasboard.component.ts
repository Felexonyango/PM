import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITask } from 'src/app/PMS/model/task.model';
import { ProjectService } from 'src/app/PMS/services/project/project.service';
import { TaskService } from 'src/app/PMS/services/task/task.service';
import { UtilService } from 'src/app/PMS/services/util/util.service';

@Component({
    selector: 'app-dasboard',
    templateUrl: './dasboard.component.html',
    styleUrls: ['./dasboard.component.scss'],
})
export class DasboardComponent implements OnInit, OnDestroy {
    subscription = new Subscription();
    tasks: ITask[] = [];
    dashboard:any
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private taskService: TaskService,
        public utilService: UtilService,
        private projectservice:ProjectService
    ) {}

    ngOnInit(): void {
        this.getsummary();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getsummary() {
        this.subscription.add(
            this.projectservice.getSummary().subscribe({
                next: (res) => {
                    this.dashboard = res.result;
                    console.log(this.dashboard)
                },
            })
        );
    }
}
