import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';
import { CreateFeatureDto } from './dtos/create-feature.dto';
import { Feature } from './entities/feature.entity';
import { FeatureService } from './feature.service';

@Controller('feature')
export class FeatureController {
  private logger = new Logger('Feature Controller');
  constructor(private featureService: FeatureService) {}

  @MessagePattern({ type: 'get-feature' })
  public async getFeatureById(id: string): Promise<Feature> {
    this.logger.debug(
      `Received id feature message with data ${JSON.stringify(id)}`,
    );
    return await this.featureService.getFeatureById(id);
  }

  @MessagePattern({ type: 'get-features' })
  public async getFeatures(): Promise<Feature[]> {
    return await this.featureService.getFeatures();
  }

  @MessagePattern({ type: 'create-feature' })
  public async createFeature(createFeatureDto: CreateFeatureDto): Promise<Feature> {
    return await this.featureService.createFeature(createFeatureDto);
  }


}
