import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Make } from './make-data/make.entity';
import { CreateMakeDto } from './make-dto/create-make.dto';
import { GetMakeByIdDto } from './make-dto/get-make-by-id.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MakeService {
  constructor(
    @InjectRepository(Make) private makeRepository: Repository<Make>,
  ) {}

  public async getMakeById(getMakeByIdDto: GetMakeByIdDto) {
    return this.makeRepository.findOne(getMakeByIdDto);
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
}
