import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { DataService } from "../shared/data.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService]
})
export class UserComponent implements OnInit {
  user:{name:string};
  isLoggedIn:boolean= false;
  data:string;
  constructor(private _userService:UserService, private _dataService:DataService) { }

  ngOnInit(): void {
    this.user = this._userService.user;
    this._dataService.getDetails().then((data:string)=>{
      this.data = data;
    });
  }

  

}
