import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Make } from './entities/make.entity';
import { CreateMakeDto } from './dtos/create-make.dto';
import { GetMakeByIdDto } from './dtos/get-make-by-id.dto';
import { UpdateCarModelListDto } from './dtos/update-car-model-list.dto';
import { MakeService } from './make.service';

@Controller('make')
export class MakeController {
  constructor(private makeService: MakeService) {}

  @MessagePattern({ type: 'get-make-by-id' })
  public async getMakeById(getMakeByIdDto: GetMakeByIdDto): Promise<Make> {
    return await this.makeService.getMakeById(getMakeByIdDto);
  }

  @MessagePattern({ type: 'get-all-makes' })
  public async getAllMakes(): Promise<Make[]> {
    return await this.makeService.getAllMakes();
  }

  @MessagePattern({ type: 'create-make' })
  public async createMake(createMakeDto: CreateMakeDto): Promise<Make> {
    return await this.makeService.createMake(createMakeDto);
  }

  @MessagePattern({ type: 'update-make-model-list' })
  public async updateMakeModelList(
    updateModelListDto: UpdateCarModelListDto,
  ): Promise<Make> {
    return await this.makeService.updateModelList(updateModelListDto);
  }
}
