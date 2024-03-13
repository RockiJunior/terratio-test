import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CurrencyEnum, LotsEnum } from '../enum/lots-state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLotDto {
  @ApiProperty({
    description: 'Lot Name',
  })
  @IsNotEmpty({ message: 'Must be a string' })
  @IsString({
    message: 'Lot Name must be a string',
  })
  lot_name: string;

  @ApiProperty({
    description: 'Polygon',
    example: [
      [-62.1427136525986, -32.78329173054609],
      [-61.97688876246188, -32.78329173054609],
      [-61.97688876246188, -32.6663158291671],
      [-62.1427136525986, -32.6663158291671],
      [-62.1427136525986, -32.78329173054609],
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(3, {
    message: 'Must have at least 3 polygon points',
  })
  @ArrayMaxSize(256)
  polygon: any[];

  @ApiProperty({
    description: 'State of lot. Can be: available / unavailable',
    default: LotsEnum.available,
  })
  @IsEnum(LotsEnum)
  state: LotsEnum;

  @ApiProperty({
    description: 'Price',
  })
  @IsString({
    message: 'Price Must be a string',
  })
  @IsNotEmpty({
    message: 'Please Insert a Price Value',
  })
  price: string;

  @ApiProperty({
    description: 'Price Currency. Can be: ARS / USD',
    default: CurrencyEnum.USD,
  })
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @ApiProperty({
    description: 'Owner Full Name',
  })
  @IsString({
    message: 'Owner name must be a string',
  })
  owner: string;
}
