import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Color } from './entities/color.entity';
import { CreateColorDto } from './dtos/create-color.dto';
import { GetColorByIdDto } from './dtos/get-color-by-id.dto';
import { ColorService } from './color.service';

@Controller('color')
export class ColorController {
  constructor(private colorService: ColorService) {}

  @MessagePattern({ type: 'get-color-by-id' })
  public async getColorById(getColorByIdDto: GetColorByIdDto): Promise<Color> {
    return await this.colorService.getColorById(getColorByIdDto);
  }

  @MessagePattern({ type: 'get-all-colors' })
  public async getAllColors(): Promise<Color[]> {
    return await this.colorService.getAllColors();
  }

  @MessagePattern({ type: 'create-color' })
  public async createColor(createColorDto: CreateColorDto) {
    return await this.colorService.createColor(createColorDto);
  }
}
