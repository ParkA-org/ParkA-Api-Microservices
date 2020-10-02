import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserInformationByIdDto } from './dtos/get-user-information-by-id.dto';
import { UserInformation } from './entities/user-information.entities';

@Injectable()
export class UserInformationService {
  constructor(
    @InjectRepository(UserInformation)
    private userInformationRepository: Repository<UserInformation>,
  ) {}

  public async getUserInformationById(
    getUserInformationByIdDto: GetUserInformationByIdDto,
  ): Promise<UserInformation> {
    return this.userInformationRepository.findOne(getUserInformationByIdDto);
  }
}
