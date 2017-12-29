import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss'],
    animations: [routerTransition()]
})
export class ResourcesComponent {

    employeeid: string;
    hideEditButton: boolean = false;
    hideTab:boolean = false;
    showTab:boolean = true;

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
           this.employeeid = params['id'];
        });
        this.showForm(0);
    }

    index: any = -1;
    showEditForm(i): void {
        this.index = i;
    }

    showForm(i): void {
        this.index = i;
        this.hideEditButton = true;
    }

    cancelEditForm(): void {
        this.index = -1;
    }

    hideForm(i): boolean {
        return this.index === i;
    }

    showProject(): void {
        this.hideTab = true;
        this.showTab = false;
    }

    showProjectTab():void {
        this.showTab = true;
        this.hideTab = false;
    }


    editResIndex: number = -1;
    showEditResForm(i): void {
        this.editResIndex = i;
    }
    
    displayEditResForm(i): boolean {
        return ( i === this.editResIndex );
    }


}
