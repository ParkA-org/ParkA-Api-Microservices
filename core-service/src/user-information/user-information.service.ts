import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInformationDto } from './dtos/create-user-information.dto';
import { GetUserInformationByIdDto } from './dtos/get-user-information-by-id.dto';
import { UserInformation } from './entities/user-information.entities';
import { v4 as uuid } from 'uuid';
import { UpdateUserInformationDto } from './dtos/update-user-information.dto';
@Injectable()
export class UserInformationService {
  private logger = new Logger('UserInformationService');

  constructor(
    @InjectRepository(UserInformation)
    private userInformationRepository: Repository<UserInformation>,
  ) {}

  public async getUserInformationById(
    getUserInformationByIdDto: GetUserInformationByIdDto,
  ): Promise<UserInformation> {
    return this.userInformationRepository.findOne(getUserInformationByIdDto);
  }

  public async createUserInformation(
    createUserInformationDto: CreateUserInformationDto,
  ): Promise<UserInformation> {
    this.logger.debug(
      `Received create user information with payload ${JSON.stringify(
        createUserInformationDto,
      )}`,
    );

    const {
      birthDate,
      documentNumber,
      nationality,
      parkings,
      paymentInformation,
      placeOfBirth,
      telephoneNumber,
      vehicles,
    } = createUserInformationDto;

    const userInformation = this.userInformationRepository.create({
      id: uuid(),
      birthDate,
      documentNumber,
      nationality,
      parkings,
      paymentInformation,
      placeOfBirth,
      telephoneNumber,
      vehicles,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.userInformationRepository.save(userInformation);
  }

  public async updateUserInformation(
    updateUserInformationDto: UpdateUserInformationDto,
  ): Promise<UserInformation> {
    this.logger.debug(
      `Received update user information with payload ${JSON.stringify(
        updateUserInformationDto,
      )}`,
    );

    const {
      getUserInformationByIdDto,
      updateUserInformationPayloadDto,
    } = updateUserInformationDto;

    const userInformation = await this.getUserInformationById(
      getUserInformationByIdDto,
    );

    const updateFieldList = Object.keys(updateUserInformationPayloadDto);

    for (const field of updateFieldList) {
      userInformation[field] = updateUserInformationPayloadDto[field];
    }

    userInformation.updatedAt = new Date().toISOString();

    return await this.userInformationRepository.save(userInformation);
  }
}
