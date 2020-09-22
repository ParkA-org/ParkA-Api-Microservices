import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Make } from './make-data/make.entity';
import { CreateMakeDto } from './make-dto/create-make.dto';
import { GetMakeByIdDto } from './make-dto/get-make-by-id.dto';
import { MakeService } from './make.service';

@Controller('make')
export class MakeController {
  constructor(private makeService: MakeService) {}

  @MessagePattern({ type: 'get-make-by' })
  public async getMakeById(getMakeByIdDto: GetMakeByIdDto): Promise<Make> {
    return await this.makeService.getMakeById(getMakeByIdDto);
  }

  @MessagePattern({ type: 'create-make' })
  public async createMake(createMakeDto: CreateMakeDto): Promise<Make> {
    return await this.makeService.createMake(createMakeDto);
  }
}
