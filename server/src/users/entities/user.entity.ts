import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 0 })
  experience: number;

  @Column({ default: 1 })
  level: number;
}