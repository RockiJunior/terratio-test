import { EntityNames } from 'src/config/entityNames/entityNames';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(`${EntityNames.lots}`)
export class Lots {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lot_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  polygon: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  area: string;
}
