import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './color-data/color.entity';
import { CreateColorDto } from './color-dto/create-color.dto';
import { GetColorByIdDto } from './color-dto/get-color-by-id.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color) private colorRepository: Repository<Color>,
  ) {}

  public async getColorById(getColorByIdDto: GetColorByIdDto): Promise<Color> {
    return await this.colorRepository.findOne(getColorByIdDto);
  }

  public async getAllColors(): Promise<Color[]> {
    return await this.colorRepository.find();
  }

  public async createColor(createColorDto: CreateColorDto): Promise<Color> {
    const { name } = createColorDto;

    const color = this.colorRepository.create({
      id: uuid(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.colorRepository.save(color);
  }
}
