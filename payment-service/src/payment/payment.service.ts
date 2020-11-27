import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { GetPaymentByIdDto } from './dtos/get-payment-by-id.dto';
import { Payment } from './entities/payment.entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { DeletePaymentDto } from './dtos/delete-payment.dto';
import { GetAllUserPaymentsDto } from './dtos/get-all-user-payments.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
@Injectable()
export class PaymentService {
  private logger = new Logger('PaymentService');

  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    @InjectConnection() private readonly connection: Connection,
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
    const { userInformation } = getAllUserPaymentsDto;
    return this.paymentRepository.find({
      deleted: false,
      userInformation: userInformation,
    });
  }

  public async updatePayment(
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    this.logger.debug(
      `Received update payment with payload ${JSON.stringify(
        updatePaymentDto,
      )}`,
    );

    const { updatePaymentPayload, userInformationPayload } = updatePaymentDto;
    const { id } = updatePaymentPayload;
    const { userInformation } = userInformationPayload;

    const payment = await this.paymentRepository.findOne({
      userInformation: userInformation,
      id: id,
    });

    if (!payment) {
      throw new RpcException('Payment not found');
    }

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const updateFieldList = Object.keys(updatePaymentPayload);

      for (const field of updateFieldList) {
        payment[field] = updatePaymentPayload[field];
      }

      payment.updatedAt = new Date().toISOString();

      await queryRunner.manager.save(payment);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new RpcException('An undefined error occured');
    }
  }

  public async createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    this.logger.debug(
      `Received create payment with payload ${JSON.stringify(
        createPaymentDto,
      )}`,
    );

    const { createPaymentPayload, userInformationPayload } = createPaymentDto;
    const {
      card,
      cardHolder,
      cvv,
      digit,
      expirationDate,
    } = createPaymentPayload;
    const { userInformation } = userInformationPayload;

    const salt = await bcrypt.genSalt();
    const result = await this.hashCVV(cvv, salt);

    try {
      const payment = this.paymentRepository.create({
        id: uuid(),
        cardHolder,
        userInformation,
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
