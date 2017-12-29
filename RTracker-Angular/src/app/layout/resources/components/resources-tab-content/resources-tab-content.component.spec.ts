import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesTabContentComponent } from './resources-tab-content.component';

describe('ResourcesTabContentComponent', () => {
  let component: ResourcesTabContentComponent;
  let fixture: ComponentFixture<ResourcesTabContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesTabContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
