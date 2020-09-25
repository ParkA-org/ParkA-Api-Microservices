import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateBodyStyleDto } from './dtos/create-body-style.dto';
import { GetBodyStyleByIdDto } from './dtos/get-body-style-by-id.dto';
import { BodyStyle } from './entities/body-style.entity';
import { BodyStyleService } from './body-style.service';

@Controller('vehicle-type')
export class BodyStyleController {
  constructor(private vehicleTypeService: BodyStyleService) {}

  @MessagePattern({ type: 'get-vehicle-type-by-id' })
  public async getBodyStyleById(
    getBodyStyleByIdDto: GetBodyStyleByIdDto,
  ): Promise<BodyStyle> {
    return await this.vehicleTypeService.getBodyStyleById(getBodyStyleByIdDto);
  }

  @MessagePattern({ type: 'get-vehicle-all-types' })
  public async getAllBodyStyles(): Promise<BodyStyle[]> {
    return await this.vehicleTypeService.getAllBodyStyles();
  }

  @MessagePattern({ type: 'create-vehicle-all-types' })
  public async createBodyStyles(
    createBodyStyleDto: CreateBodyStyleDto,
  ): Promise<BodyStyle> {
    return await this.vehicleTypeService.createBodyStyle(createBodyStyleDto);
  }
}
