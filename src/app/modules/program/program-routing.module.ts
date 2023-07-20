import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramComponent } from './components/program/program.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    component: ProgramComponent,
    children: [
      { path: '', component: ProgramComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
