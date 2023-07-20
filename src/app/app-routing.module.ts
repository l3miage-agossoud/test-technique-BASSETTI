import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { pathMatch: 'full', path: '', redirectTo: 'program' },
  { path: 'program', loadChildren: () => import('./modules/program/program.module').then(m => m.ProgramModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
