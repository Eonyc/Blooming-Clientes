import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {DireccionCl, DireccionClRelations} from '../models';

export class DireccionClRepository extends DefaultCrudRepository<
  DireccionCl,
  typeof DireccionCl.prototype.id,
  DireccionClRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(DireccionCl, dataSource);
  }
}
