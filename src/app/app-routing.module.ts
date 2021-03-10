import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutcategorieComponent } from './Categorie/ajoutcategorie/ajoutcategorie.component';
import { ListecategorieComponent } from './Categorie/listecategorie/listecategorie.component';
import { MenuComponent } from './menu/menu.component';
import { AjoutScategorieComponent } from './scategorie/ajout-scategorie/ajout-scategorie.component';
import { ListScategorieComponent } from './scategorie/list-scategorie/list-scategorie.component';
const routes : Routes = [
  {path: '', component:MenuComponent,children : [
 // {path: 'categories', component: ListecategorieComponent},
 // {path: 'addcategories', component: AjoutcategorieComponent},
  ]},
  {path: 'categories', component: ListecategorieComponent},
  {path: 'addcategories', component: AjoutcategorieComponent},
  {path: 'scategories', component: ListScategorieComponent},
  {path: 'addscategories', component: AjoutScategorieComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
