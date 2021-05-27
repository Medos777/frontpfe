import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule  } from '@angular/forms';
import { MatDialogModule,MatDialogRef, } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule  } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AjoutcategorieComponent } from './Categorie/ajoutcategorie/ajoutcategorie.component';
import { ListecategorieComponent } from './Categorie/listecategorie/listecategorie.component';
import { MenuComponent } from './menu/menu.component';
import { AjoutScategorieComponent } from './scategorie/ajout-scategorie/ajout-scategorie.component';
import { ListScategorieComponent } from './scategorie/list-scategorie/list-scategorie.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListeArticleComponent } from './article/liste-article/liste-article.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AgentComponent } from './user/agent/agent.component';
import { FacteurComponent } from './user/facteur/facteur.component';
import { ClientComponent } from './user/client/client.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AddDestinationComponent } from './destination/add-destination/add-destination.component';
import { ListDestinationComponent } from './destination/list-destination/list-destination.component';
import { ListTarifComponent } from './tarif/list-tarif/list-tarif.component';
import { ListDepotComponent } from './depot/list-depot/list-depot.component';
import { AddDepotComponent } from './depot/add-depot/add-depot.component';

import { AddCollecteComponent } from './collecte/add-collecte/add-collecte.component';
import { ListCollecteComponent } from './collecte/list-collecte/list-collecte.component';

import { ProfilComponent } from './user/profil/profil.component';
import { DetailFactureComponent } from './facture/detail-facture/detail-facture.component';

import { AddTarifComponent } from './tarif/add-tarif/add-tarif.component';
import { ListVoitureComponent } from './voiture/list-voiture/list-voiture.component';
import { AddVoitureComponent } from './voiture/add-voiture/add-voiture.component';
import { ListChauffeurComponent } from './chauffeur/list-chauffeur/list-chauffeur.component';
import { AddChauffeurComponent } from './chauffeur/add-chauffeur/add-chauffeur.component';

import { AddFactureComponent } from './facture/add-facture/add-facture.component';
import { ListFactureComponent } from './facture/list-facture/list-facture.component';

import { ListReclamationComponent } from './reclamation/list-reclamation/list-reclamation.component';
import { AddReclamationComponent } from './reclamation/add-reclamation/add-reclamation.component';
import { ChatbotInterfaceComponent } from './reclamation/chatbot-interface/chatbot-interface.component';
const routes : Routes = [
  {path: '', component:MenuComponent,children : [
  {path: 'categories', component: ListecategorieComponent},
  {path: 'addcategories', component: AjoutcategorieComponent},
  {path: 'scategories', component: ListScategorieComponent},
  {path: 'addscategories', component: AjoutScategorieComponent},
  {path: 'articles', component: ListeArticleComponent},
  {path: 'agents',component:AgentComponent},
  {path: 'facteurs',component:FacteurComponent},
  {path: 'clients',component:ClientComponent},

  {path: 'destinations', component: ListDestinationComponent},
  {path: 'adddestination', component: AddDestinationComponent},
  {path: 'addtarif', component: AddTarifComponent},
  {path: 'tarifs', component: ListTarifComponent},

  {path: 'profil', component: ProfilComponent},
  {path: 'listreclamation', component: ListReclamationComponent},
  {path: 'addreclamation', component: AddReclamationComponent},
  {path: 'chatbot', component: ChatbotInterfaceComponent},

  {path: 'addfactures', component: AddFactureComponent},
  {path: 'factures', component: ListFactureComponent},

  {path: 'adddepot', component: AddDepotComponent},
  {path: 'depots', component: ListDepotComponent},

  {path: 'addcollectes', component: AddCollecteComponent},
  {path: 'collectes', component: ListCollecteComponent},
  
  {path: 'voitures', component: ListVoitureComponent},
  {path: 'addvoitures', component: AddVoitureComponent},
  {path: 'chauffeurs', component: ListChauffeurComponent},
  {path: 'addchauffeur', component: AddChauffeurComponent},
  ]},
    {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'accueil', component: AccueilComponent},
  {path: 'facturedetail', component: DetailFactureComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
