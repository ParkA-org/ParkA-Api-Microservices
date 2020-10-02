import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetUserInformationByIdDto } from './dtos/get-user-information-by-id.dto';
import { UserInformation } from './entities/user-information.entities';
import { UserInformationService } from './user-information.service';

@Controller('information')
export class UserInformationController {
  constructor(private userInformationService: UserInformationService) {}

  @MessagePattern({ type: 'get-user-information-by-id' })
  public async getUserInformationById(
    getUserInformationByIdDto: GetUserInformationByIdDto,
  ): Promise<UserInformation> {
    return this.userInformationService.getUserInformationById(
      getUserInformationByIdDto,
    );
  }
}
