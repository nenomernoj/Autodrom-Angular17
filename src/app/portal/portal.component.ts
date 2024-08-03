import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss'
})
export class PortalComponent implements OnInit {
  constructor(private router: Router,
              private message: NzMessageService) {
  }
  userData: any;

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      this.router.navigate(['/']);
      this.message.error('Вы не вошли в систему или ваша сессия истекла');
    }
    this.userData = JSON.parse(userData ? userData : '');
  }

}
