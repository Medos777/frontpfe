import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjoutcategorieComponent } from './Categorie/ajoutcategorie/ajoutcategorie.component';
import { ListecategorieComponent } from './Categorie/listecategorie/listecategorie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MenuComponent } from './menu/menu.component';
import { ListScategorieComponent } from './scategorie/list-scategorie/list-scategorie.component';
import { AjoutScategorieComponent } from './scategorie/ajout-scategorie/ajout-scategorie.component';
import { AjoutArticleComponent } from './article/ajout-article/ajout-article.component';
import { ListeArticleComponent } from './article/liste-article/liste-article.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ClientComponent } from './user/client/client.component';
import { FacteurComponent } from './user/facteur/facteur.component';
import { AgentComponent } from './user/agent/agent.component';
import { AddUSerComponent } from './user/add-user/add-user.component';
const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule
];

@NgModule({
  declarations: [
    
    AppComponent,
    AjoutcategorieComponent,
    ListecategorieComponent,
    MenuComponent,
    ListScategorieComponent,
    AjoutScategorieComponent,
    AjoutArticleComponent,
    ListeArticleComponent,
    LoginComponent,
    RegisterComponent,
    ClientComponent,
    FacteurComponent,
    AgentComponent,
    AddUSerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule,
    BrowserModule,
    Ng2SearchPipeModule,
    
    
    
  ],
  providers: [DatePipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [AjoutcategorieComponent]
})
export class AppModule { }
