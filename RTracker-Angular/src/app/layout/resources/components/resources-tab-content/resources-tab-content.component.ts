import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../../../shared';

@Component({
    selector: 'app-resources-tab-content',
    templateUrl: './resources-tab-content.component.html',
    styleUrls: ['./resources-tab-content.component.scss']
})
export class ResourcesTabContentComponent implements OnInit {

    resourceDetails: any;
    index: any = -1;

    constructor(
        private empService: EmployeeService
    ) { }

    ngOnInit() {
        this.getDetails();
    }

    getDetails() {
        this.empService.getResourcesDetails().then(result => {
            this.resourceDetails = result.data['resources'];
        });
    }

    showEditForm(i): void {
        this.index = i;
    }

    hideForm(i): boolean {
        return this.index === i;
    }

    cancelEditForm(): void {
        this.index = -1;
    }

}
