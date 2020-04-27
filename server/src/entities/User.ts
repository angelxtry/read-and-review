import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  @IsEmail()
  email: string | null;

  @Column({ type: 'boolean', default: false })
  verifiedEmail: boolean;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  provider: string;

  @Column({ type: 'text', nullable: true })
  snsId: string;

  @Column({ type: 'text', nullable: true })
  profilePhoto: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default User;
