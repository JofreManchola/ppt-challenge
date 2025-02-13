import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Program {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
