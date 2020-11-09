import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RpcException } from '@nestjs/microservices';
import { exception } from 'console';
import { ConfigService } from '@nestjs/config';
import { Review } from './entities/review.entity';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { CreateReviewDto } from './dtos/create-review.dto';
import { GetAllUserReviewDto } from './dtos/get-all-user-review.dto';
import { GetAllParkingReview } from './dtos/get-all-parking-review.dto';

@Injectable()
export class ReviewService {
  private logger = new Logger('ReviewService');

  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private configService: ConfigService,
  ) {}

  public async updateReview(updateReviewDto: UpdateReviewDto): Promise<Review> {
    this.logger.debug(
      `Received update review payload ${JSON.stringify(updateReviewDto)}`,
    );

    try {
      const { id, calification, review, title } = updateReviewDto;
      const reviewData = await this.getReview(id);

      lastName !== undefined ? (reviewData.lastName = lastName) : null;

      name !== undefined ? (user.name = name) : null;

      user.updatedAt = new Date().toISOString();

      user.origin = origin;

      await this.authRepository.save(user);

      return user;
    } catch (error) {
      throw new RpcException('User not Found');
    }
  }

  public async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const {
      calification,
      parking,
      reservation,
      review,
      title,
      type,
      user,
    } = createReviewDto;

    try {
      const id = uuid();
      const date = new Date();
      const result = this.reviewRepository.save({
        id,
        review,
        title,
        type,
        user,
        parking,
        calification,
        reservation,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      });
      return await result;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  public async getAllUserReview(
    getAllUserReviewDto: GetAllUserReviewDto,
  ): Promise<Review[]> {
    try {
      const { user } = getAllUserReviewDto;
      const review = this.reviewRepository.find({ user: user });
      return await review;
    } catch (error) {
      new RpcException('User Review not found');
    }
  }

  public async getAllParkingReview(
    getAllParkingReviewDto: GetAllParkingReview,
  ): Promise<Review[]> {
    try {
      const { user } = getAllUserReviewDto;
      const review = this.reviewRepository.find({ user: user });
      return await review;
    } catch (error) {
      new RpcException('User Review not found');
    }
  }

  private createToken(id: string, email: string, userInformation: string) {
    return jwt.sign(
      { id: id, email: email, userInformation: userInformation },
      this.configService.get('JWT_SECRET'),
      {
        expiresIn: '100d',
      },
    );
  }

  public async getUser(id: string): Promise<User> {
    try {
      const user = this.authRepository.findOne({ id });
      return await user;
    } catch (error) {
      throw new exception('User not Found');
    }
  }

  public async getUserByUserInformation(id: string): Promise<User> {
    try {
      const user = this.authRepository.findOne({ userInformation: id });
      return await user;
    } catch (error) {
      throw new exception('User not Found');
    }
  }

  public async signIn(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<LoginType> {
    try {
      const { email, password } = authCredentialDto;

      email.toLowerCase();
      const user = await this.authRepository.findOne({ email: email });

      const credential = await this.credentialRepository.findOne({
        email: email,
      });

      if (user) {
        const hash = await this.hashPassword(password, credential.salt);

        if (hash === credential.password) {
          const JWT = await this.createToken(
            user.id,
            user.email,
            user.userInformation,
          );

          const result = {
            user,
            JWT,
          };

          return result;
        }
      }
    } catch {
      throw new RpcException('Invalid Credentials');
    }
  }
}
