export interface Material {
  id: number;
  name: string;
  masseVolumique: MasseVolumicData[];
  coeffPoisson: CoeffPoissonData[];

}

export interface MasseVolumicData {
  data: Property[];
}

export interface CoeffPoissonData {
  data: Property[];
}


export interface Property {
  Temperature: string[];
  Densite?: string[];
  nuX?: string[];
}
