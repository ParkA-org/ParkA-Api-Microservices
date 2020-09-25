import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Make } from './make-entities/make.entity';
import { CreateMakeDto } from './make-dto/create-make.dto';
import { GetMakeByIdDto } from './make-dto/get-make-by-id.dto';
import { v4 as uuid } from 'uuid';
import { UpdateCarModelListDto } from './make-dto/update-car-model-list.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MakeService {
  private logger = new Logger('MakeService');

  constructor(
    @InjectRepository(Make) private makeRepository: Repository<Make>,
  ) {}

  public async getMakeById(getMakeByIdDto: GetMakeByIdDto): Promise<Make> {
    this.logger.debug(
      `Received get make by id with payload ${JSON.stringify(getMakeByIdDto)}`,
    );

    const result = await this.makeRepository.findOne(getMakeByIdDto);

    if (!result) {
      throw new RpcException('Entry not found');
    }

    return result;
  }

  public async getAllMakes(): Promise<Make[]> {
    this.logger.debug(`Received get all makes`);
    return this.makeRepository.find();
  }

  public async createMake(createMakeDto: CreateMakeDto): Promise<Make> {
    this.logger.debug(
      `Received create make with payload ${JSON.stringify(createMakeDto)}`,
    );
    const { icon, models, name } = createMakeDto;

    const make = this.makeRepository.create({
      id: uuid(),
      icon,
      name,
      models,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.makeRepository.save(make);
  }

  public async updateModelList(
    updateModelListDto: UpdateCarModelListDto,
  ): Promise<Make> {
    this.logger.debug(
      `Received update model list with payload ${JSON.stringify(
        updateModelListDto,
      )}`,
    );
    const { makeId, modelId } = updateModelListDto;

    const make = await this.getMakeById({ id: makeId });

    make.models = [...make.models, modelId];
    make.updatedAt = new Date().toISOString();

    return this.makeRepository.save(make);
  }
}
