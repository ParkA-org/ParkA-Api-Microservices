import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateReviewDto } from './dtos/create-review.dto';
import { GetAllParkingReviewDto } from './dtos/get-all-parking-review.dto';
import { GetAllUserReviewDto } from './dtos/get-all-user-review.dto';
import { GetReviewByIdDto } from './dtos/get-review-by-id.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  private logger = new Logger('ReviewController');
  constructor(private reviewService: ReviewService) {}

  @MessagePattern({ type: 'get-review-by-id' })
  public async getReviewById(
    getReviewByIdDto: GetReviewByIdDto,
  ): Promise<Review> {
    this.logger.debug(
      `Received id review message with data ${JSON.stringify(
        getReviewByIdDto,
      )}`,
    );
    return await this.reviewService.getReviewById(getReviewByIdDto);
  }

  @MessagePattern({ type: 'get-all-user-review' })
  public async getAllUserReview(
    getAllUserReviewDto: GetAllUserReviewDto,
  ): Promise<Review[]> {
    this.logger.debug(
      `Received id user message with data ${JSON.stringify(
        getAllUserReviewDto,
      )}`,
    );
    return await this.reviewService.getAllUserReview(getAllUserReviewDto);
  }

  @MessagePattern({ type: 'get-all-parking-review' })
  public async getAllParkingReview(
    getAllParkingReviewDto: GetAllParkingReviewDto,
  ): Promise<Review[]> {
    return await this.reviewService.getAllParkingReview(getAllParkingReviewDto);
  }

  @MessagePattern({ type: 'create-review' })
  public async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    return await this.reviewService.createReview(createReviewDto);
  }

  @MessagePattern({ type: 'update-review' })
  public async updateReview(updateReviewDto: UpdateReviewDto): Promise<Review> {
    this.logger.debug(
      `Received Update Review message with data ${JSON.stringify(
        updateReviewDto,
      )}`,
    );
    return await this.reviewService.updateReview(updateUserDto);
  }
}
