import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutcategorieComponent } from './Categorie/ajoutcategorie/ajoutcategorie.component';
import { ListecategorieComponent } from './Categorie/listecategorie/listecategorie.component';
const routes: Routes = [
  {path: 'categories', component: ListecategorieComponent},
  {path: 'Addcategories', component: AjoutcategorieComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
