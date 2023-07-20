import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ViewDetailPieceComponent } from 'src/app/modules/shared/components/view-detail-piece/view-detail-piece.component';
import { Piece } from '../../interfaces/piece.interface';

@Component({
  selector: 'app-view-piece',
  templateUrl: './view-piece.component.html',
  styleUrls: ['./view-piece.component.scss']
})
export class ViewPieceComponent implements OnInit {
  @Input() pieces: Piece[] = [];
  piece?: Piece;
  private unsubscriber: Subject<void> = new Subject();


  displayedColumns: string[] = ['ID', 'sName'];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  getPiece(row: any){
    this.piece = row;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ViewDetailPieceComponent, {
      height: '500px',
      width: '600px',
      panelClass: 'pop-in-container',
      data: { piece: this.piece },
      autoFocus: false,
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscriber))
    .subscribe((result) => {
    });
  }

}
