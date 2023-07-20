import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgramService } from '../../services/program.service';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { Piece } from '../../interfaces/piece.interface';
import { Material } from '../../interfaces/material.interface';

class P {
  masseVolumique: Array<{ temperature: number; value: string }> = [];
  coeffPoisson: Array<{ temperature: number; value: string }> = [];

  constructor(
    masseVolumique: Array<{ temperature: number; value: string }>,
    coeffPoisson: Array<{ temperature: number; value: string }>
  ) {
    this.masseVolumique = masseVolumique;
    this.coeffPoisson = coeffPoisson;
  }
}

@Component({
  selector: 'app-view-detail-piece',
  templateUrl: './view-detail-piece.component.html',
  styleUrls: ['./view-detail-piece.component.scss'],
})
export class ViewDetailPieceComponent implements OnInit {
  displayedColumns: string[] = ['masseVolumique', 'coeffPoisson'];
  dataSourcePiece: MatTableDataSource<P> = new MatTableDataSource<P>();

  piece?: Piece;
  material?: Material;
  temperatureTable: P[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private programService: ProgramService
  ) {}

  ngOnInit(): void {
    this.piece = this.data.piece;

    this.programService
      .getMaterial(this.data.piece?.idMaterial)
      .pipe(
        map((material: Material) => {
          this.material = material;
          const temperatures1 =
            material.masseVolumique[0].data[0].Temperature.map(
              (temperature: string) => parseInt(temperature)
            ).sort((a: number, b: number) => a - b);
          const temperatures2 =
            material.coeffPoisson[0].data[0].Temperature.map(
              (temperature: string) => parseInt(temperature)
            ).sort((a: number, b: number) => a - b);

          const densities1 = material.masseVolumique[0].data[1].Densite || [];
          const densities2 = material.coeffPoisson[0].data[1].Densite || [];

          const nuX1 = material.masseVolumique[0].data[1].nuX || [];
          const nuX2 = material.coeffPoisson[0].data[1].nuX || [];

          let data: Array<{ temperature: number; value: string }> = [];

          data = this.zipTemperaturesAndValues(
            temperatures1,
            densities1,
            nuX1 || []
          );

          let data1: Array<{ temperature: number; value: string }> = [];

          data1 = this.zipTemperaturesAndValues(
            temperatures2,
            densities2 || [],
            nuX2
          );

          console.log(data);

          this.temperatureTable.push(new P(data, data1));

          this.dataSourcePiece.data = this.temperatureTable;
        })
      )
      .subscribe();
  }

  private getMasseVolumicCoeffPoissonData(material: Material) {
    let temperatures: number[];
    let densities: string[];
    let nuX: string[];
    let data3: Array<{ temperature: number; value: string }> = [];
    let data4: Array<{ temperature: number; value: string }> = [];
    material.masseVolumique.map((data) => {
      data.data.map((data1) => {
        if(data1.Densite) {
          densities = data1.Densite;
        }
        if(data1.nuX) {
          nuX = data1.nuX;
        }
        if(data1.Temperature) {
          temperatures = data1.Temperature.map(
            (temperature: string) => parseInt(temperature)
            ).sort((a: number, b: number) => a - b);
        }
        data3 = this.zipTemperaturesAndValues(
          temperatures,
          densities,
          nuX
        );
      });
    });
    material.coeffPoisson.map((data) => {
      data.data.map((data1) => {
        if(data1.Densite) {
          densities = data1.Densite;
        }
        if(data1.nuX) {
          nuX = data1.nuX;
        }
        if(data1.Temperature) {
          temperatures = data1.Temperature.map(
            (temperature: string) => parseInt(temperature)
            ).sort((a: number, b: number) => a - b);
        }
        data3 = this.zipTemperaturesAndValues(
          temperatures,
          densities,
          nuX
        );
      });
    });
    return data3 || data4;
  }

  private zipTemperaturesAndValues(
    temperatures: number[],
    values1: string[],
    values2: string[]
  ): Array<{ temperature: number; value: string }> {
    const data: Array<{ temperature: number; value: string }> = [];
    for (let i = 0; i < temperatures.length; i++) {
      const temperature = temperatures[i];
      const value = values1 || values2 ? values1[i] || values2[i] : '';
      data.push({ temperature, value });
    }
    return data;
  }
}
