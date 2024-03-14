import { EntityNames } from 'src/config/entityNames/entityNames';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CurrencyEnum, LotsEnum } from '../enum/lots-state.enum';

@Entity(`${EntityNames.lots}`)
export class Lots {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lot_name: string;

  @Column({ type: 'jsonb', nullable: true })
  polygon: any;

  @Column({ type: 'varchar', length: 255, nullable: true })
  square_meters: string;

  @Column({ type: 'varchar', nullable: true })
  hectares: string;

  @Column({
    type: 'enum',
    enum: LotsEnum,
    default: LotsEnum.available,
  })
  state: LotsEnum;

  @Column({ type: 'varchar', length: 255, nullable: true })
  price: string;

  @Column({ type: 'enum', enum: CurrencyEnum, default: CurrencyEnum.USD })
  currency: CurrencyEnum;

  @Column({ type: 'varchar', length: 255, nullable: true })
  owner: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_deleted: boolean;

  // -------------------------------- created_at
  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;
  @BeforeInsert()
  async createDateAt() {
    this.created_at = new Date();
  }

  // -------------------------------- updated_at
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
  @BeforeInsert()
  @BeforeUpdate()
  async updateDateAt() {
    this.updated_at = new Date();
  }

  // ------------------------------ deleted_at
  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
