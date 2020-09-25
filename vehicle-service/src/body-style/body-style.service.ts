import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BodyStyle } from './entities/body-style.entity';
import { CreateBodyStyleDto } from './dtos/create-body-style.dto';
import { v4 as uuid } from 'uuid';
import { GetBodyStyleByIdDto } from './dtos/get-body-style-by-id.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BodyStyleService {
  private logger = new Logger('BodyStyleService');

  constructor(
    @InjectRepository(BodyStyle)
    private bodyStyleRepository: Repository<BodyStyle>,
  ) {}

  public async getBodyStyleById(
    getBodyStyleByIdDto: GetBodyStyleByIdDto,
  ): Promise<BodyStyle> {
    this.logger.debug(
      `Received get body style by id ${JSON.stringify(getBodyStyleByIdDto)}`,
    );
    const result = await this.bodyStyleRepository.findOne(getBodyStyleByIdDto);

    if (!result) {
      throw new RpcException('Entry not found');
    }

    return result;
  }

  public async getAllBodyStyles(): Promise<BodyStyle[]> {
    this.logger.debug(`Received get all body styles`);

    return this.bodyStyleRepository.find();
  }

  public async createBodyStyle(
    createBodyStyleDto: CreateBodyStyleDto,
  ): Promise<BodyStyle> {
    this.logger.debug(
      `Received create body style with payload ${JSON.stringify(
        createBodyStyleDto,
      )}`,
    );

    const { name } = createBodyStyleDto;

    const vehicleType = this.bodyStyleRepository.create({
      id: uuid(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.bodyStyleRepository.save(vehicleType);
  }
}
