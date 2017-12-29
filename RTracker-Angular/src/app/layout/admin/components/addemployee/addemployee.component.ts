import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-addemployee',
    templateUrl: './addemployee.component.html',
    styleUrls: ['./addemployee.component.scss']
})

export class AddEmployeeComponent implements OnInit {

    action: string = "addition";

    constructor() {}

    ngOnInit(): void {

    }

}
