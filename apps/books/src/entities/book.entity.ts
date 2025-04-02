import { User } from 'apps/users/src/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'int' })
  rating: number;

  @ManyToOne(() => User, (user) => user.id)
  author: User;
}
