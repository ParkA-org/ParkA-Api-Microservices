import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Make } from './make-data/make.entity';
import { GetMakeByIdDto } from './make-dto/get-make-by-id.dto';

@Injectable()
export class MakeService {
  constructor(
    @InjectRepository(Make) private makeRepository: Repository<Make>,
  ) {}

  public async getMakeById(getMakeByIdDto: GetMakeByIdDto) {
    return this.makeRepository.findOne(getMakeByIdDto);
  }
}
