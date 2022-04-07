/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KushkiComponent } from './kushki.component';

describe('KushkiComponent', () => {
  let component: KushkiComponent;
  let fixture: ComponentFixture<KushkiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KushkiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KushkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
