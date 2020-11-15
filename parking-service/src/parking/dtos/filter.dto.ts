export class FilterDto implements IFilterDto {
  start: number;
  limit: number;
  where: Record<string, any>;
}
