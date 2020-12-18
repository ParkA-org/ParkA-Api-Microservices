export interface ICreateReviewDto {
  user: string;
  reviewedUser: string;
  parking: string;
  reservation: string;
  title: string;
  review: string;
  calification: number;
  type: boolean;
}
