import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { CreateConfirmEmailDto } from './dto/create-confirm-email.dto';
import { ConfirmEmail } from './entities/confirm-email.entity';
import { ValidateEmailCodeDto } from './dto/validate-email-code.dto';
import { CreateResetPasswordDto } from './dto/create-reset-password.dto';
import { ValidateResetPasswordCodeDto } from './dto/validate-reset-password-code.dto';
import { ResetPassword } from './entities/reset-password.entity';

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

  @MessagePattern({ type: 'reset-password' })
  public async resetPassword(
    createResetPasswordDto: CreateResetPasswordDto,
  ): Promise<CreateResetPasswordDto> {
    this.logger.debug(
      `Received reset password message with data ${JSON.stringify(
        createResetPasswordDto,
      )}`,
    );
    return await this.emailService.resetPassword(createResetPasswordDto);
  }

  @MessagePattern({ type: 'resend-email' })
  public async resendEmail(
    createConfirmEmailDto: CreateConfirmEmailDto,
  ): Promise<ConfirmEmail> {
    this.logger.debug(
      `Received confirm email message with data ${JSON.stringify(
        createConfirmEmailDto,
      )}`,
    );
    return await this.emailService.resendEmail(createConfirmEmailDto);
  }

  @MessagePattern({ type: 'validate-email-code' })
  public async validateEmailCode(
    validateEmailCodeDto: ValidateEmailCodeDto,
  ): Promise<ConfirmEmail> {
    this.logger.debug(
      `Received validate email code message with data ${JSON.stringify(
        validateEmailCodeDto,
      )}`,
    );
    return await this.emailService.validateEmailCode(validateEmailCodeDto);
  }

  @MessagePattern({ type: 'validate-reset-password-code' })
  public async validateResetPasswordCode(
    validateResetPasswordCodeDto: ValidateResetPasswordCodeDto,
  ): Promise<ResetPassword> {
    this.logger.debug(
      `Received validate reset password code message with data ${JSON.stringify(
        validateResetPasswordCodeDto,
      )}`,
    );
    return await this.emailService.validateResetPasswordCode(
      validateResetPasswordCodeDto,
    );
  }

  // TODO Validate Code

  // TODO Reset Password

  // TODO Validate Reset Password
}
