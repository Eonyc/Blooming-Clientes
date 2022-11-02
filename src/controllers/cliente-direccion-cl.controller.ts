import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  DireccionCl,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteDireccionClController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/direccion-cl', {
    responses: {
      '200': {
        description: 'Cliente has one DireccionCl',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DireccionCl),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DireccionCl>,
  ): Promise<DireccionCl> {
    return this.clienteRepository.direccionCl(id).get(filter);
  }

  @post('/clientes/{id}/direccion-cl', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(DireccionCl)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DireccionCl, {
            title: 'NewDireccionClInCliente',
            exclude: ['id'],
            optional: ['id_cliente']
          }),
        },
      },
    }) direccionCl: Omit<DireccionCl, 'id'>,
  ): Promise<DireccionCl> {
    return this.clienteRepository.direccionCl(id).create(direccionCl);
  }

  @patch('/clientes/{id}/direccion-cl', {
    responses: {
      '200': {
        description: 'Cliente.DireccionCl PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DireccionCl, {partial: true}),
        },
      },
    })
    direccionCl: Partial<DireccionCl>,
    @param.query.object('where', getWhereSchemaFor(DireccionCl)) where?: Where<DireccionCl>,
  ): Promise<Count> {
    return this.clienteRepository.direccionCl(id).patch(direccionCl, where);
  }

  @del('/clientes/{id}/direccion-cl', {
    responses: {
      '200': {
        description: 'Cliente.DireccionCl DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DireccionCl)) where?: Where<DireccionCl>,
  ): Promise<Count> {
    return this.clienteRepository.direccionCl(id).delete(where);
  }
}
