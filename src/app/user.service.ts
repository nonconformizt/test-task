import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class UserService {

  // фейковое апи
  // установил небольшую задержку для реалистичности
  apiUrl: string = "https://reqres.in/api/users/228?delay=1";
  logs: string = "";

  // текущий пользователь
  user : number = 1; 

  // событие, уведомляющее о том, что пользоваель изменился
  userChanged : EventEmitter<number> = new EventEmitter();



  constructor(private http: HttpClient) { }

  changeUser(newUser: number) {

    this.logs = `User change started...\n`;

    var userData = {
      "name": "some name",
      "job": "web-developer",
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.logs += `Sending first request...\n`;


    // можно применть другие способы для последовательных запросов
    // но это самый удобный в данном случае метод

    this.http.put<Object>(this.apiUrl, userData, httpOptions).subscribe(
      (userData) => {
        // тело нового запроса - ответ на предыдущий
        this.logs += `Responce: \n${JSON.stringify(userData)}\n`;
        this.logs += `Sending second request...\n`;

        this.http.put<Object>(this.apiUrl, userData, httpOptions).subscribe(
          (userData) => {
            this.logs += `Responce: \n${JSON.stringify(userData)}\n`;
            this.logs += `Sending third request...\n`;

            this.http.put<Object>(this.apiUrl, userData, httpOptions).subscribe(
              (userData) => {
                this.logs += `Responce: \n${JSON.stringify(userData)}\n`;
                this.logs += `USER CHANGED TO ${newUser}`;

                this.user = newUser;
                this.userChanged.emit(this.user);
              }
            )
          }
        )
      }
    )
  }

}
