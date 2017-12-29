import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTabContentComponent } from './projects-tab-content.component';

describe('ProjectsTabContentComponent', () => {
  let component: ProjectsTabContentComponent;
  let fixture: ComponentFixture<ProjectsTabContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsTabContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
