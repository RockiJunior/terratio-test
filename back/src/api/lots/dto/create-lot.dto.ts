import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CurrencyEnum, LotsEnum } from '../enum/lots-state.enum';

export class CreateLotDto {
  @IsString()
  lot_name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(3)
  @ArrayMaxSize(256)
  polygon: any[];

  @IsEnum(LotsEnum)
  state: LotsEnum;

  @IsString()
  price: string;

  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @IsString()
  owner: string;
}
