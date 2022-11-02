import {Entity, model, property} from '@loopback/repository';

@model()
export class DireccionCl extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nomenclatura: string;

  @property({
    type: 'string',
    required: true,
  })
  numero: string;

  @property({
    type: 'number',
  })
  id_cliente?: number;

  constructor(data?: Partial<DireccionCl>) {
    super(data);
  }
}

export interface DireccionClRelations {
  // describe navigational properties here
}

export type DireccionClWithRelations = DireccionCl & DireccionClRelations;
