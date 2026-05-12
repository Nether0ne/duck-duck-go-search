import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetSearchDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  q: string;
}

export class PostSearchDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  q: string;
}
