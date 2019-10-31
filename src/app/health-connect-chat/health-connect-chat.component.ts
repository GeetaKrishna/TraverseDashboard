import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-connect-chat',
  templateUrl: './health-connect-chat.component.html',
  styleUrls: ['./health-connect-chat.component.css']
})
export class HealthConnectChatComponent implements OnInit {

  constructor() { }
  chat1 = [{ message: 'Hi ', time: '4/12/19 @ 4:30PM' }, { message: "I need help", time: '4/12/19 @ 4:32PM' }, { message: "What can I do for you", time: '4/12/19 @ 4:35PM' }]
  chat2 = [{ message: 'Hello', time: '4/12/19 @ 4:31PM' }, { message: "What can I do for you", time: '4/12/19 @ 4:34PM' }]
  ngOnInit() {
  }

}