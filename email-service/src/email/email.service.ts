import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConfirmEmailDto } from './dto/create-confirm-email.dto';
import { ConfirmEmail } from './entities/confirm-email.entity';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { RpcException } from '@nestjs/microservices';
import { sendEmail } from './utils/sendEmail';
import { exception } from 'console';
import { ValidateEmailCodeDto } from './dto/validate-email-code.dto';
import { CreateResetPasswordDto } from './dto/create-reset-password.dto';
import { ResetPassword } from './entities/reset-password.entity';

@Injectable()
export class EmailService {
  private logger = new Logger('EmailService');

  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    @InjectRepository(ConfirmEmail)
    private confirmEmailRepository: Repository<ConfirmEmail>,
    @InjectRepository(ResetPassword)
    private resetPasswordRepository: Repository<ResetPassword>,
  ) {}

  public async confirmEmail(
    createConfirmEmailDto: CreateConfirmEmailDto,
  ): Promise<ConfirmEmail> {
    this.logger.debug(
      `Received create confirm email payload ${JSON.stringify(
        createConfirmEmailDto,
      )}`,
    );
    const { email, origin } = createConfirmEmailDto;

    const date = new Date();
    email.toLowerCase();

    try {
      var salt;
      if (origin == 'web') {
        salt = origin;
      } else {
        salt = await bcrypt.genSalt();
      }
      const message = await this.generateCode(origin);
      const code = await this.hashCode(message, salt);
      const confirmEmail = this.confirmEmailRepository.save({
        id: uuid(),
        email,
        salt,
        origin,
        code,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
        completed: false,
      });

      await sendEmail(email, message, origin, 0);
      return await confirmEmail;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  public async resetPassword(
    createResetPasswordDto: CreateResetPasswordDto,
  ): Promise<ResetPassword> {
    this.logger.debug(
      `Received reset password payload ${JSON.stringify(
        createResetPasswordDto,
      )}`,
    );
    const { email, origin } = createResetPasswordDto;
    email.toLowerCase();
    const resetPassword = await this.resetPasswordRepository.findOne({
      email: email,
    });

    if (resetPassword) {
      return await this.updateResetPassword(
        resetPassword,
        createResetPasswordDto,
      );
    } else {
      return await this.createResetPassword(createResetPasswordDto);
    }
  }

  public async updateResetPassword(
    resetPassword: ResetPassword,
    createResetPasswordDto: CreateResetPasswordDto,
  ): Promise<ResetPassword> {
    try {
      const { email, origin } = createResetPasswordDto;
      resetPassword.updatedAt = new Date().toISOString();
      resetPassword.origin = origin;

      var salt;
      if (origin == 'web') {
        salt = origin;
      } else {
        salt = await bcrypt.genSalt();
      }
      const message = await this.generateCode(origin);
      const code = await this.hashCode(message, salt);

      resetPassword.code = code;
      resetPassword.salt = salt;

      this.resetPasswordRepository.save(resetPassword);

      await sendEmail(email, message, origin, 1);

      return resetPassword;
    } catch (error) {
      throw new RpcException('Invalid Process');
    }
  }

  public async createResetPassword(
    createResetPasswordDto: CreateResetPasswordDto,
  ): Promise<ResetPassword> {
    const { email, origin } = createResetPasswordDto;
    const date = new Date();
    email.toLowerCase();

    try {
      var salt;
      if (origin == 'web') {
        salt = origin;
      } else {
        salt = await bcrypt.genSalt();
      }
      const message = await this.generateCode(origin);
      const code = await this.hashCode(message, salt);
      const resetPassword = this.resetPasswordRepository.save({
        id: uuid(),
        email,
        salt,
        origin,
        code,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
        completed: false,
      });

      await sendEmail(email, message, origin, 1);
      return await resetPassword;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  public async resendEmail(
    createConfirmEmailDto: CreateConfirmEmailDto,
  ): Promise<ConfirmEmail> {
    this.logger.debug(
      `Received resend confirm email payload ${JSON.stringify(
        createConfirmEmailDto,
      )}`,
    );

    const { email, origin } = createConfirmEmailDto;
    email.toLowerCase();

    try {
      const confirmEmail = await this.getConfirmEmail(email);
      confirmEmail.updatedAt = new Date().toISOString();
      confirmEmail.origin = origin;

      var salt;
      if (origin == 'web') {
        salt = origin;
      } else {
        salt = await bcrypt.genSalt();
      }
      const message = await this.generateCode(origin);
      const code = await this.hashCode(message, salt);

      confirmEmail.code = code;
      confirmEmail.salt = salt;

      this.confirmEmailRepository.save(confirmEmail);

      await sendEmail(email, message, origin, 0);

      return confirmEmail;
    } catch (error) {
      throw new RpcException('Invalid Process');
    }
  }

  public async validateEmailCode(
    validateEmailCodeDto: ValidateEmailCodeDto,
  ): Promise<ConfirmEmail> {
    this.logger.debug(
      `Received validate email code payload ${JSON.stringify(
        validateEmailCodeDto,
      )}`,
    );

    const { email, origin, code } = validateEmailCodeDto;

    if (origin == 'mobile') {
      try {
        const confirmEmail = await this.getConfirmEmail(email);
        const result = await this.validateCode(code, confirmEmail.salt);
        if (result == confirmEmail.code) {
          confirmEmail.updatedAt = new Date().toISOString();
          confirmEmail.completed = true;
          const user = await this.authRepository.findOne(confirmEmail.email);
          user.confirmed = true;
          user.updatedAt = new Date().toISOString();

          await this.authRepository.save(user);
          await this.confirmEmailRepository.save(confirmEmail);
        } else {
          throw new RpcException('Invalid Code');
        }
        return confirmEmail;
      } catch (error) {
        throw new RpcException('Invalid Code');
      }
    } else {
      try {
        const result = await this.validateCode(code, origin);
        const confirmEmail = await this.confirmEmailRepository.findOne({
          code: result,
        });
        confirmEmail.updatedAt = new Date().toISOString();
        confirmEmail.completed = true;
        await this.confirmEmailRepository.save(confirmEmail);
        console.log(confirmEmail);
        const email2 = confirmEmail.email;
        const user = await this.authRepository.findOne({ email: email2 });
        user.confirmed = true;
        user.updatedAt = new Date().toISOString();

        await this.authRepository.save(user);

        return confirmEmail;
      } catch (error) {
        throw new RpcException('Invalid Code');
      }
    }
  }

  public async validateResetPasswordCode(
    validateResetPasswordCode: ValidateResetPasswordCode,
  ): Promise<ResetPassword> {
    this.logger.debug(
      `Received validate email code payload ${JSON.stringify(
        validateEmailCodeDto,
      )}`,
    );

    const { email, origin, code, newPassword } = validateEmailCodeDto;

    if (origin == 'mobile') {
      try {
        const confirmEmail = await this.getConfirmEmail(email);
        const result = await this.validateCode(code, confirmEmail.salt);
        if (result == confirmEmail.code) {
          confirmEmail.updatedAt = new Date().toISOString();
          confirmEmail.completed = true;
          const user = await this.authRepository.findOne(confirmEmail.email);
          user.confirmed = true;
          user.updatedAt = new Date().toISOString();

          await this.authRepository.save(user);
          await this.confirmEmailRepository.save(confirmEmail);
        } else {
          throw new RpcException('Invalid Code');
        }
        return confirmEmail;
      } catch (error) {
        throw new RpcException('Invalid Code');
      }
    } else {
      try {
        const result = await this.validateCode(code, origin);
        const confirmEmail = await this.confirmEmailRepository.findOne({
          code: result,
        });
        confirmEmail.updatedAt = new Date().toISOString();
        confirmEmail.completed = true;
        await this.confirmEmailRepository.save(confirmEmail);
        console.log(confirmEmail);
        const email2 = confirmEmail.email;
        const user = await this.authRepository.findOne({ email: email2 });
        user.confirmed = true;
        user.updatedAt = new Date().toISOString();

        await this.authRepository.save(user);

        return confirmEmail;
      } catch (error) {
        throw new RpcException('Invalid Code');
      }
    }
  }

  public async validateCode(code: string, salt: string) {
    return await this.hashCode(code, salt);
  }

  public async getConfirmEmail(email: string): Promise<ConfirmEmail> {
    try {
      const confirm = await this.confirmEmailRepository.findOne({
        email: email,
      });
      return await confirm;
    } catch (error) {
      throw new exception('Email dont exist');
    }
  }

  private async hashCode(code: string, salt: string): Promise<string> {
    if (salt == 'web') return code;
    console.log('quizas');
    return bcrypt.hash(code, salt);
  }

  private async generateCode(origin: string): Promise<string> {
    if (origin == 'mobile') {
      return (await this.getRandomInt()).toString();
    }
    return uuid();
  }

  private async getRandomInt(): Promise<number> {
    let result = 0;
    const min = 99999;
    const max = 1000000;
    do {
      result = Math.floor(Math.random() * Math.floor(max));
    } while (result < min && result > max);
    return result;
  }
}
