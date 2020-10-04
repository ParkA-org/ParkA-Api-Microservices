import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetReservationByIdDto } from 'src/reservation/dtos/get-reservation-by-id.dto';
import { CreateNationalityDto } from './dtos/create-nationality.dto';
import { UpdateNationalityDto } from './dtos/update-nationality.dto';
import { Nationality } from './entities/nationality.entity';
import { NationalityService } from './nationality.service';

@Controller('nationality')
export class NationalityController {
  private logger = new Logger('NationalityController');

  constructor(private nationalityService: NationalityService) {}

  @MessagePattern({ type: 'get-nationality-by-id' })
  public async getNationalityById(
    getNationalityByIdDto: GetReservationByIdDto,
  ): Promise<Nationality> {
    this.logger.debug(
      `Received get nationality by id with payload ${JSON.stringify(
        getNationalityByIdDto,
      )}`,
    );
    return this.nationalityService.getNationalityById(getNationalityByIdDto);
  }

  @MessagePattern({ type: 'get-all-nationalities' })
  public async getAllNationalities(): Promise<Nationality[]> {
    this.logger.debug(`Received get all nationalities`);

    return this.nationalityService.getAllNationalities();
  }

  @MessagePattern({ type: 'create-nationality' })
  public async createNationality(
    createNationalityDto: CreateNationalityDto,
  ): Promise<Nationality> {
    this.logger.debug(
      `Received create nationality with payload ${JSON.stringify(
        createNationalityDto,
      )}`,
    );

    return this.nationalityService.createNationality(createNationalityDto);
  }

  @MessagePattern({ type: 'update-nationality' })
  public async updateNationality(
    updateNationalityDto: UpdateNationalityDto,
  ): Promise<Nationality> {
    this.logger.debug(
      `Received update nationality with payload ${JSON.stringify(
        updateNationalityDto,
      )}`,
    );

    return this.nationalityService.updateNationality(updateNationalityDto);
  }
}
