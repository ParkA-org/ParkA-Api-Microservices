import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { GetPaymentByIdDto } from './dtos/get-payment-by-id.dto';
import { Payment } from './entities/payment.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { DeletePaymentDto } from './dtos/delete-payment.dto';
import { GetAllUserPaymentsDto } from './dtos/get-all-user-payments.dto';
@Injectable()
export class PaymentService {
  private logger = new Logger('PaymentService');

  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
  ) {}

  public async getPaymentById(
    getPaymentByIdDto: GetPaymentByIdDto,
  ): Promise<Payment> {
    this.logger.debug(
      `Received get payment by id with payload ${JSON.stringify(
        getPaymentByIdDto,
      )}`,
    );

    const result = await this.paymentRepository.findOne(getPaymentByIdDto);

    if (!result) {
      throw new RpcException('Entry not found');
    }

    return result;
  }

  public async getAllUserPayments(
    getAllUserPaymentsDto: GetAllUserPaymentsDto,
  ): Promise<Payment[]> {
    return this.paymentRepository.find(getAllUserPaymentsDto);
  }

  public async createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    this.logger.debug(
      `Received create payment with payload ${JSON.stringify(
        createPaymentDto,
      )}`,
    );

    const { card, cardHolder, cvv, digit, expirationDate } = createPaymentDto;

    const salt = await bcrypt.genSalt();
    const result = await this.hashCVV(cvv, salt);

    try {
      const payment = this.paymentRepository.create({
        id: uuid(),
        cardHolder,
        expirationDate,
        digit,
        card,
        salt,
        cvv: result,
        deleted: false,
        activated: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return await this.paymentRepository.save(payment);
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  public async deletePayment(
    deletePaymentDto: DeletePaymentDto,
  ): Promise<Payment> {
    this.logger.debug(
      `Received delete payment with payload ${JSON.stringify(
        deletePaymentDto,
      )}`,
    );

    try {
      const { id } = deletePaymentDto;

      const payment = await this.getPaymentById({ id });

      payment.deleted = true;

      payment.updatedAt = new Date().toISOString();

      return await this.paymentRepository.save(payment);
    } catch (error) {
      new RpcException('An undefined error occured');
    }
  }

  private async hashCVV(cvv: string, salt: string): Promise<string> {
    return bcrypt.hash(cvv, salt);
  }

  //TODO PROCESO DE PAGO
}
