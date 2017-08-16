
// Created by Dean Foulds  16 Aug 2017

import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { AccountPage }          from './account';
let fixture: ComponentFixture<AccountPage> = null;
let instance: any = null;
describe('Pages: Account', () => {
  beforeEach(async(() => TestUtils.beforeEachCompiler([AccountPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));
  it('should create user account page', async(() => {
    expect(instance).toBeTruthy();
  }));
});
