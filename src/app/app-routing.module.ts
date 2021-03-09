import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutcategorieComponent } from './Categorie/ajoutcategorie/ajoutcategorie.component';
import { ListecategorieComponent } from './Categorie/listecategorie/listecategorie.component';
import { MenuComponent } from './menu/menu.component';
const routes : Routes = [
  {path: '', component:MenuComponent,children : [
  {path: 'categories', component: ListecategorieComponent},
  {path: 'Addcategories', component: AjoutcategorieComponent},
  ]},
  {path: 'categories1', component: ListecategorieComponent},
  {path: 'Addcategories1', component: AjoutcategorieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
