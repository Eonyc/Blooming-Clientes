import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Cliente, ClienteRelations, DireccionCl, UsuarioCliente} from '../models';
import {DireccionClRepository} from './direccion-cl.repository';
import {UsuarioClienteRepository} from './usuario-cliente.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly direccionCl: HasOneRepositoryFactory<DireccionCl, typeof Cliente.prototype.id>;

  public readonly usuarioCliente: HasOneRepositoryFactory<UsuarioCliente, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('DireccionClRepository') protected direccionClRepositoryGetter: Getter<DireccionClRepository>, @repository.getter('UsuarioClienteRepository') protected usuarioClienteRepositoryGetter: Getter<UsuarioClienteRepository>,
  ) {
    super(Cliente, dataSource);
    this.usuarioCliente = this.createHasOneRepositoryFactoryFor('usuarioCliente', usuarioClienteRepositoryGetter);
    this.registerInclusionResolver('usuarioCliente', this.usuarioCliente.inclusionResolver);
    this.direccionCl = this.createHasOneRepositoryFactoryFor('direccionCl', direccionClRepositoryGetter);
    this.registerInclusionResolver('direccionCl', this.direccionCl.inclusionResolver);
  }
}
