import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Make } from './make-entities/make.entity';
import { CreateMakeDto } from './make-dto/create-make.dto';
import { GetMakeByIdDto } from './make-dto/get-make-by-id.dto';
import { v4 as uuid } from 'uuid';
import { UpdateCarModelListDto } from './make-dto/update-car-model-list.dto';

@Injectable()
export class MakeService {
  constructor(
    @InjectRepository(Make) private makeRepository: Repository<Make>,
  ) {}

  public async getMakeById(getMakeByIdDto: GetMakeByIdDto): Promise<Make> {
    return this.makeRepository.findOne(getMakeByIdDto);
  }

  public async getAllMakes(): Promise<Make[]> {
    return this.makeRepository.find();
  }

  public async createMake(createMakeDto: CreateMakeDto): Promise<Make> {
    const { icon, models, name } = createMakeDto;

    const make = this.makeRepository.create({
      id: uuid(),
      icon,
      name,
      models,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.makeRepository.save(make);
  }

  public async updateModelList(
    updateModelListDto: UpdateCarModelListDto,
  ): Promise<Make> {
    const { makeId, modelId } = updateModelListDto;

    const make = await this.getMakeById({ id: makeId });

    make.models.push(modelId);
    make.updatedAt = new Date().toISOString();

    return this.makeRepository.save(make);
  }
}
