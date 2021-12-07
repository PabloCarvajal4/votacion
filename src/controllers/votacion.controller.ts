import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Votacion} from '../models';
import {VotacionRepository} from '../repositories';

export class VotacionController {
  constructor(
    @repository(VotacionRepository)
    public votacionRepository : VotacionRepository,
  ) {}

  @post('/votacions')
  @response(200, {
    description: 'Votacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Votacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votacion, {
            title: 'NewVotacion',
            exclude: ['id'],
          }),
        },
      },
    })
    votacion: Omit<Votacion, 'id'>,
  ): Promise<Votacion> {
    return this.votacionRepository.create(votacion);
  }

  @get('/votacions/count')
  @response(200, {
    description: 'Votacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Votacion) where?: Where<Votacion>,
  ): Promise<Count> {
    return this.votacionRepository.count(where);
  }

  @get('/votacions')
  @response(200, {
    description: 'Array of Votacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Votacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Votacion) filter?: Filter<Votacion>,
  ): Promise<Votacion[]> {
    return this.votacionRepository.find(filter);
  }

  @patch('/votacions')
  @response(200, {
    description: 'Votacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votacion, {partial: true}),
        },
      },
    })
    votacion: Votacion,
    @param.where(Votacion) where?: Where<Votacion>,
  ): Promise<Count> {
    return this.votacionRepository.updateAll(votacion, where);
  }

  @get('/votacions/{id}')
  @response(200, {
    description: 'Votacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Votacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Votacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Votacion>
  ): Promise<Votacion> {
    return this.votacionRepository.findById(id, filter);
  }

  @patch('/votacions/{id}')
  @response(204, {
    description: 'Votacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Votacion, {partial: true}),
        },
      },
    })
    votacion: Votacion,
  ): Promise<void> {
    await this.votacionRepository.updateById(id, votacion);
  }

  @put('/votacions/{id}')
  @response(204, {
    description: 'Votacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() votacion: Votacion,
  ): Promise<void> {
    await this.votacionRepository.replaceById(id, votacion);
  }

  @del('/votacions/{id}')
  @response(204, {
    description: 'Votacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.votacionRepository.deleteById(id);
  }
}
