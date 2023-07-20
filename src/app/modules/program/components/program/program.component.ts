import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgramService } from 'src/app/modules/shared/services/program.service';
import { ViewDetailPieceComponent } from '../../../shared/components/view-detail-piece/view-detail-piece.component';
import { Subject, takeUntil } from 'rxjs';
import { Program } from 'src/app/modules/shared/interfaces/program.interface';


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  programs: Program[] = [];

  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
    this.getPrograms();
  }

  getPrograms() {
    this.programService.getPrograms().subscribe((data: Program[]) => {
      this.programs = data;
    });
  }

}
