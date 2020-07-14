import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

// describe('UserComponent', () => {
//   let component: UserComponent;
//   let fixture: ComponentFixture<UserComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ UserComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(UserComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

describe('Component:User',()=>{
 beforeEach(()=>{
   TestBed.configureTestingModule({
     declarations:[UserComponent]
   })
 });

 it('Should create the app',()=>{
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
 });

 it('Should use username from the service',()=>{
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.user.name).toEqual(app.user.name);
  });

  it('Should display the username if user is logged in',()=>{
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    app.isLoggedIn = true;
    //let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(app.user.name);
  });

  it("Shouldn't display the username if user is not logged in",()=>{
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    //app.isLoggedIn = false;
    //let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(app.user.name);
  });

  it("Shouldn't fetch data successfully if not called asynchronously",()=>{
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    //app.isLoggedIn = false;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy =spyOn(dataService,'getDetails')
    .and.returnValue(Promise.resolve('Data'))
    fixture.detectChanges();
    expect(app.data).toBe(undefined);
  });


  it("Should fetch data successfully if called asynchronously", async(()=>{
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    //app.isLoggedIn = false;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy =spyOn(dataService,'getDetails')
    .and.returnValue(Promise.resolve('Data'))
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(app.data).toBe('Data');
    });
  }));

  it("Should fetch data successfully if called asynchronously", fakeAsync(()=>{
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    //app.isLoggedIn = false;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy =spyOn(dataService,'getDetails')
    .and.returnValue(Promise.resolve('Data'))
    fixture.detectChanges();
    tick();
    expect(app.data).toBe('Data');
  }));


});






