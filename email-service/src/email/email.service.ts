import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConfirmEmailDto } from './dto/create-confirm-email.dto';
import { ConfirmEmail } from './entities/confirm-email.entity';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EmailService {
  private logger = new Logger('EmailService');

  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    @InjectRepository(ConfirmEmail)
    private confirmEmailRepository: Repository<ConfirmEmail>,
  ) {}

  public async confirmEmail(
    createConfirmEmailDto: CreateConfirmEmailDto,
  ): Promise<ConfirmEmail> {
    this.logger.debug(
      `Received create user payload ${JSON.stringify(createConfirmEmailDto)}`,
    );
    const { email, origin } = createConfirmEmailDto;

    const date = new Date();
    email.toLowerCase();

    try {
      const salt = await bcrypt.genSalt();
      const code = await this.hashCode('password', salt);

      const confirmEmail = this.confirmEmailRepository.save({
        id: uuid(),
        email,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
        completed: false,
      });

      return await confirmEmail;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  private async hashCode(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
