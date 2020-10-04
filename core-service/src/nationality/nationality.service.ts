import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNationalityDto } from './dtos/create-nationality.dto';
import { Nationality } from './entities/nationality.entity';
import { v4 as uuid } from 'uuid';
import { GetReservationByIdDto } from 'src/reservation/dtos/get-reservation-by-id.dto';
import { UpdateNationalityDto } from './dtos/update-nationality.dto';

@Injectable()
export class NationalityService {
  private logger = new Logger('NationalityService');

  constructor(
    @InjectRepository(Nationality)
    private nationalityRepository: Repository<Nationality>,
  ) {}

  public async getNationalityById(
    getNationalityByIdDto: GetReservationByIdDto,
  ): Promise<Nationality> {
    this.logger.debug(
      `Received get nationality by id with payload ${JSON.stringify(
        getNationalityByIdDto,
      )}`,
    );

    return this.nationalityRepository.findOne(getNationalityByIdDto);
  }

  public async getAllNationalities(): Promise<Nationality[]> {
    this.logger.debug(`Received get all nationalities`);
    return this.nationalityRepository.find();
  }

  public async createNationality(
    createNationalityDto: CreateNationalityDto,
  ): Promise<Nationality> {
    this.logger.debug(
      `Received create nationality with payload ${JSON.stringify(
        createNationalityDto,
      )}`,
    );

    const { name } = createNationalityDto;

    const nationality = this.nationalityRepository.create({
      id: uuid(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.nationalityRepository.save(nationality);
  }

  public async updateNationality(
    updateNationalityDto: UpdateNationalityDto,
  ): Promise<Nationality> {
    this.logger.debug(
      `Received update nationality with payload ${JSON.stringify(
        updateNationalityDto,
      )}`,
    );

    const {
      getNationalityByIdDto,
      updateNationalityPayload,
    } = updateNationalityDto;

    const nationality = await this.getNationalityById(getNationalityByIdDto);

    const fieldsToUpdateList = Object.keys(updateNationalityPayload);

    for (const field of fieldsToUpdateList) {
      nationality[field] = updateNationalityDto[field];
    }

    nationality.updatedAt = new Date().toISOString();

    return this.nationalityRepository.save(nationality);
  }
}
