import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListecategorieComponent } from './Categorie/listecategorie/listecategorie.component';
const routes: Routes = [
  {path: 'categories', component: ListecategorieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
