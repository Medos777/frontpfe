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
const routes : Routes = [
  {path: '', component:MenuComponent,children : [
  {path: 'categories', component: ListecategorieComponent},
  {path: 'addcategories', component: AjoutcategorieComponent},
  {path: 'scategories', component: ListScategorieComponent},
  {path: 'addscategories', component: AjoutScategorieComponent},
  {path: 'articles', component: ListeArticleComponent},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
