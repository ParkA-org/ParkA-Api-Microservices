import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { CreateConfirmEmailDto } from './dto/create-confirm-email.dto';
import { ConfirmEmail } from './entities/confirm-email.entity';

@Controller('email')
export class EmailController {
  private logger = new Logger('EmailController');
  constructor(private emailService: EmailService) {}

  @MessagePattern({ type: 'confirm-email' })
  public async confirmEmail(
    createConfirmEmailDto: CreateConfirmEmailDto,
  ): Promise<ConfirmEmail> {
    this.logger.debug(
      `Received confirm email message with data ${JSON.stringify(
        createConfirmEmailDto,
      )}`,
    );
    return await this.emailService.confirmEmail(createConfirmEmailDto);
  }

  @MessagePattern({ type: 'resend-email' })
  public async ResendEmail(
    createConfirmEmailDto: CreateConfirmEmailDto,
  ): Promise<ConfirmEmail> {
    this.logger.debug(
      `Received confirm email message with data ${JSON.stringify(
        createConfirmEmailDto,
      )}`,
    );
    return await this.emailService.ResendEmail(createConfirmEmailDto);
  }

  @MessagePattern({ type: 'validate-email-code' })
  public async ValidateEmailCode(
    createConfirmEmailDto: CreateConfirmEmailDto,
  ): Promise<ConfirmEmail> {
    this.logger.debug(
      `Received validate email code message with data ${JSON.stringify(
        createConfirmEmailDto,
      )}`,
    );
    return await this.emailService.ResendEmail(createConfirmEmailDto);
  }

  // TODO Validate Code

  // TODO Reset Password

  // TODO Validate Reset Password
}
