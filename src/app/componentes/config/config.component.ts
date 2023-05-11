import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit()
  {
    if(localStorage.getItem("usernameLS") == null)
    {
      this.router.navigate(['/login'])
    }
    else
    {
      this.router.navigate(['/config'])
    }
  }
}
