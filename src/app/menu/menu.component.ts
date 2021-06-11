import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';
import { TokenStorageService } from '../service/tokenStorage.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ChatbotInterfaceComponent } from '../reclamation/chatbot-interface/chatbot-interface.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  role: any;
  user: any;
  constructor(
    private matDialog: MatDialog,
    public dialogRef:MatDialogRef<ChatbotInterfaceComponent>,
    private AuthentificationService : AuthentificationService,private tokenService: TokenStorageService, private router: Router,  ) { }

  ngOnInit(): void {
    
    if(this.tokenService.getToken())
    {
      this.role=this.tokenService.getUser().role;
      this.user=this.tokenService.getUser();
    }
    console.log(this.role);
    console.log(this.user);

  }
  public logout() {
    this.tokenService.signOut();
    this.AuthentificationService.logout();
    this.AuthentificationService.loginc = false;
    this.AuthentificationService.connected=false;
    this.router.navigate(['login']);

    
  }

  openchatbot()
{
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = false;
  dialogConfig.position = {
    'top': '28vh',
    left: '65vw'
};


  this.matDialog.open(ChatbotInterfaceComponent, dialogConfig);
}

}
