import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkListComponent } from './components/work-list/work-list.component';
import { ManageWorksComponent } from './components/manage-works/manage-works.component';

export const routes: Routes = [
  { path: '', redirectTo: 'works', pathMatch: 'full' },
  { path: 'works', component: WorkListComponent },
  { path: 'manage', component: ManageWorksComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }