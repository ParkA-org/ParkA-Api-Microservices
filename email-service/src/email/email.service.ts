import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConfirmEmailDto } from './dtos/create-confirm-email.dto';
import { ConfirmEmail } from './entities/confirm-email.entity';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { RpcException } from '@nestjs/microservices';
import { sendEmail } from './utils/sendEmail';
import { exception } from 'console';
import { ValidateEmailCodeDto } from './dtos/validate-email-code.dto';
import { CreateResetPasswordDto } from './dtos/create-reset-password.dto';
import { ResetPassword } from './entities/reset-password.entity';
import { ValidateResetPasswordCodeDto } from './dtos/validate-reset-password-code.dto';
import { Credential } from './entities/credential.entity';

@Injectable()
export class EmailService {
  private logger = new Logger('EmailService');

  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    @InjectRepository(ConfirmEmail)
    private confirmEmailRepository: Repository<ConfirmEmail>,
    @InjectRepository(ResetPassword)
    private resetPasswordRepository: Repository<ResetPassword>,
    @InjectRepository(Credential)
    private credentialRespository: Repository<Credential>,
  ) {}

  public async confirmEmail(
    createConfirmEmailDto: CreateConfirmEmailDto,
  ): Promise<ConfirmEmail> {
    this.logger.debug(
      `Received create confirm email payload ${JSON.stringify(
        createConfirmEmailDto,
      )}`,
    );
    let { email, origin } = createConfirmEmailDto;
    const date = new Date();
    email = email.toLowerCase();
    origin = origin.toLowerCase();
    try {
      let salt;
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
    let { email } = createResetPasswordDto;
    email = email.toLowerCase();
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
      let { email, origin } = createResetPasswordDto;
      email = email.toLowerCase();
      origin = origin.toLowerCase();
      resetPassword.updatedAt = new Date().toISOString();
      resetPassword.origin = origin;

      let salt;
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
    let { email, origin } = createResetPasswordDto;
    const date = new Date();
    email = email.toLowerCase();
    origin = origin.toLowerCase();

    try {
      let salt;
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

    let { email, origin } = createConfirmEmailDto;
    email = email.toLowerCase();
    origin = origin.toLowerCase();
    try {
      const confirmEmail = await this.getConfirmEmail(email);
      confirmEmail.updatedAt = new Date().toISOString();
      confirmEmail.origin = origin;

      let salt;
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
      throw new RpcException(
        'Invalid Process this email maybe dont exist in ParkA Services',
      );
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

    let { email, origin, code } = validateEmailCodeDto;
    origin = origin.toLowerCase();

    if (origin == 'mobile') {
      try {
        const confirmEmail = await this.getConfirmEmail(email);
        const result = await this.validateCode(code, confirmEmail.salt);
        if (result == confirmEmail.code) {
          confirmEmail.updatedAt = new Date().toISOString();
          confirmEmail.completed = true;
          const user = await this.authRepository.findOne({
            email: confirmEmail.email,
          });
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
    validateResetPasswordCodeDto: ValidateResetPasswordCodeDto,
  ): Promise<ResetPassword> {
    this.logger.debug(
      `Received validate email code payload ${JSON.stringify(
        validateResetPasswordCodeDto,
      )}`,
    );

    let { email, origin, code, newPassword } = validateResetPasswordCodeDto;
    origin = origin.toLowerCase();
    if (origin == 'mobile') {
      try {
        const resetPassword = await this.getResetPassword(email);
        const result = await this.validateCode(code, resetPassword.salt);
        if (result == resetPassword.code) {
          resetPassword.updatedAt = new Date().toISOString();
          const user = await this.authRepository.findOne({
            email: resetPassword.email,
          });
          await this.updateCredential(user.credential, newPassword);
          resetPassword.completed = true;
          await this.resetPasswordRepository.save(resetPassword);
        } else {
          throw new RpcException('Invalid Code');
        }
        return resetPassword;
      } catch (error) {
        throw new RpcException('Invalid Code');
      }
    } else {
      try {
        const resetPassword = await this.resetPasswordRepository.findOne({
          code: code,
        });
        resetPassword.updatedAt = new Date().toISOString();
        const user = await this.authRepository.findOne({
          email: resetPassword.email,
        });
        await this.updateCredential(user.credential, newPassword);
        resetPassword.completed = true;
        await this.resetPasswordRepository.save(resetPassword);
        return resetPassword;
      } catch (error) {
        throw new RpcException('Invalid Code');
      }
    }
  }

  public async updateCredential(
    id: string,
    newPassword: string,
  ): Promise<Credential> {
    const credential = await this.getCredential(id);
    const salt = await bcrypt.genSalt();
    newPassword = await this.hashCode(newPassword, salt);
    credential.password = newPassword;
    credential.salt = salt;
    credential.updatedAt = new Date().toISOString();
    await this.credentialRespository.save(credential);
    return credential;
  }

  public async validateCode(code: string, salt: string) {
    return await this.hashCode(code, salt);
  }

  public async getCredential(id: string): Promise<Credential> {
    try {
      const credential = await this.credentialRespository.findOne({
        id: id,
      });
      return await credential;
    } catch (error) {
      throw new exception('Email dont exist');
    }
  }

  public async getConfirmEmail(email: string): Promise<ConfirmEmail> {
    try {
      email = email.toLowerCase();
      const confirm = await this.confirmEmailRepository.findOne({
        email: email,
      });
      return await confirm;
    } catch (error) {
      throw new exception('Email dont exist');
    }
  }

  public async getResetPassword(email: string): Promise<ResetPassword> {
    try {
      email = email.toLowerCase();
      const reset = await this.resetPasswordRepository.findOne({
        email: email,
      });
      return await reset;
    } catch (error) {
      throw new exception('Email dont exist');
    }
  }

  private async hashCode(code: string, salt: string): Promise<string> {
    if (salt == 'web') return code;
    return await bcrypt.hash(code, salt);
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
