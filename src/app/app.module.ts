import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

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
import { AccueilComponent } from './accueil/accueil.component';
import { AddDestinationComponent } from './destination/add-destination/add-destination.component';
import { ListDestinationComponent } from './destination/list-destination/list-destination.component';
import { ListTarifComponent } from './tarif/list-tarif/list-tarif.component';
import { AddTarifComponent } from './tarif/add-tarif/add-tarif.component';
import { ListDepotComponent } from './depot/list-depot/list-depot.component';
import { ListVoitureComponent } from './voiture/list-voiture/list-voiture.component';
import { AddVoitureComponent } from './voiture/add-voiture/add-voiture.component';
import { ListChauffeurComponent } from './chauffeur/list-chauffeur/list-chauffeur.component';
import { AddChauffeurComponent } from './chauffeur/add-chauffeur/add-chauffeur.component';
import { AddDepotComponent } from './depot/add-depot/add-depot.component';
import { AddlDepotComponent } from './depot/addl-depot/addl-depot.component';
import { ListlDepotComponent } from './depot/listl-depot/listl-depot.component';
import { ListFactureComponent } from './facture/list-facture/list-facture.component';
import { AddFactureComponent } from './facture/add-facture/add-facture.component';
import { ListLfactureComponent } from './facture/list-lfacture/list-lfacture.component';
import { AddLfactureComponent } from './facture/add-lfacture/add-lfacture.component';
import { ProfilComponent } from './user/profil/profil.component';
import { DetailFactureComponent } from './facture/detail-facture/detail-facture.component';
import { UpdateprofilComponent } from './user/updateprofil/updateprofil.component';
import { ListReclamationComponent } from './reclamation/list-reclamation/list-reclamation.component';
import { AddReclamationComponent } from './reclamation/add-reclamation/add-reclamation.component';
import { ChatbotInterfaceComponent } from './reclamation/chatbot-interface/chatbot-interface.component';
import { AddCollecteComponent } from './collecte/add-collecte/add-collecte.component';
import { ListCollecteComponent } from './collecte/list-collecte/list-collecte.component';
import { AddLcollecteComponent } from './collecte/add-lcollecte/add-lcollecte.component';
import { ListLcollecteComponent } from './collecte/list-lcollecte/list-lcollecte.component';
import { AddReglementComponent } from './reglement/add-reglement/add-reglement.component';
import { ListReglementComponent } from './reglement/list-reglement/list-reglement.component';
import { AddLreglementComponent } from './reglement/add-lreglement/add-lreglement.component';
import { ListEnvoisComponent } from './envoi/list-envois/list-envois.component';
import { AddEnvoisComponent } from './envoi/add-envois/add-envois.component';
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
    AddUSerComponent,
    AccueilComponent,
    AddDestinationComponent,
    ListDestinationComponent,
    ListTarifComponent,
    AddTarifComponent,
    ListDepotComponent,
    ListVoitureComponent,
    AddVoitureComponent,
    ListChauffeurComponent,
    AddChauffeurComponent,
    AddDepotComponent,
    AddlDepotComponent,
    ListlDepotComponent,
    ListFactureComponent,
    AddFactureComponent,
    ListLfactureComponent,
    AddLfactureComponent,
    ProfilComponent,
    DetailFactureComponent,
    UpdateprofilComponent,
    ListReclamationComponent,
    AddReclamationComponent,
    ChatbotInterfaceComponent,
    AddCollecteComponent,
    ListCollecteComponent,
    AddLcollecteComponent,
    ListLcollecteComponent,
    AddReglementComponent,
    ListReglementComponent,
    AddLreglementComponent,
    ListEnvoisComponent,
    AddEnvoisComponent
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
    FormsModule
    
    
    
  ],
  providers: [DatePipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [AjoutcategorieComponent,
    AjoutArticleComponent,
    AddUSerComponent,
    AddlDepotComponent,
    AddLfactureComponent,
    UpdateprofilComponent,
    AddLcollecteComponent,
    AddReglementComponent,
    AddReclamationComponent,
  ]
})
export class AppModule { }
