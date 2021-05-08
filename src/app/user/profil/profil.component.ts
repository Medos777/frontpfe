import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/tokenStorage.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: any;

  constructor(private tokenService: TokenStorageService, private router: Router,  ) { }

  ngOnInit(): void {
    this.user=this.tokenService.getUser();
  }

}
