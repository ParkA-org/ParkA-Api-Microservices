import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInformationDto } from './dtos/create-user-information.dto';
import { GetUserInformationByIdDto } from './dtos/get-user-information-by-id.dto';
import { UserInformation } from './entities/user-information.entities';
import { v4 as uuid } from 'uuid';
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

    const userInformation = this.userInformationRepository.create({
      id: uuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.userInformationRepository.save(userInformation);
  }
}
