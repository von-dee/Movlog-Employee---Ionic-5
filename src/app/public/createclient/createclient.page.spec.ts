import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateclientPage } from './createclient.page';

describe('CreateclientPage', () => {
  let component: CreateclientPage;
  let fixture: ComponentFixture<CreateclientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateclientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateclientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
