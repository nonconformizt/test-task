  import { Component } from '@angular/core';
  import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public userService : UserService ) {}


  onUserChange(val : string) {
    // вызвать процесс смены пользователя
    this.userService.changeUser(+val);

    // подписаться на событие
    let subscr = this.userService.userChanged.subscribe((user) => {
      alert("User changed to " + user);
      subscr.unsubscribe();
    })
    
  }


}
