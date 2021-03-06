/**
 * Created by colinmoore-hill on 11/04/2017.
 */
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { AboutPage }          from './about';
let fixture: ComponentFixture<AboutPage> = null;
let instance: any = null;
describe('Pages: AboutIonic', () => {
  beforeEach(async(() => TestUtils.beforeEachCompiler([AboutPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));
  it('should create the hello ionic page', async(() => {
    expect(instance).toBeTruthy();
  }));
  it('should return a welcome message', () =>{
    const expected = "Hello World"
    let actual = instance.getWelcomeMessage();
    expect(actual).toBe(expected);
  });
  it('should had a main title of Civic Reactor', () => {
    const expected = ["A", "B", "C"];
    let actual = instance.getFireBaseArray();
    expect(actual).toContain("B");
  })

});
