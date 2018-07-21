import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import {WelcomePage} from "./welcome";

let fixture: ComponentFixture<WelcomePage> = null;
let instance: any = null;

describe('Pages: HelloIonic', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([WelcomePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  it('should create the welcome page page', async(() => {
    expect(instance).toBeTruthy();
  }));
});
