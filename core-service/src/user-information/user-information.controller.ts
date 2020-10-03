import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserInformationDto } from './dtos/create-user-information.dto';
import { GetUserInformationByIdDto } from './dtos/get-user-information-by-id.dto';
import { UpdateUserInformationDto } from './dtos/update-user-information.dto';
import { UserInformation } from './entities/user-information.entities';
import { UserInformationService } from './user-information.service';

@Controller('information')
export class UserInformationController {
  private logger = new Logger('UserInformationController');

  constructor(private userInformationService: UserInformationService) {}

  @MessagePattern({ type: 'get-user-information-by-id' })
  public async getUserInformationById(
    getUserInformationByIdDto: GetUserInformationByIdDto,
  ): Promise<UserInformation> {
    return this.userInformationService.getUserInformationById(
      getUserInformationByIdDto,
    );
  }

  @MessagePattern({ type: 'create-user-information' })
  public async createUserInformation(
    createUserInformationDto: CreateUserInformationDto,
  ): Promise<UserInformation> {
    this.logger.debug(
      `Received create user information with payload ${JSON.stringify(
        createUserInformationDto,
      )}`,
    );

    return this.userInformationService.createUserInformation(
      createUserInformationDto,
    );
  }

  @MessagePattern({ type: 'update-user-information' })
  public async updateUserInformation(
    updateUserInformationDto: UpdateUserInformationDto,
  ): Promise<UserInformation> {
    this.logger.debug(
      `Received update user information with payload ${JSON.stringify(
        updateUserInformationDto,
      )}`,
    );

    return this.userInformationService.updateUserInformation(
      updateUserInformationDto,
    );
  }
}
