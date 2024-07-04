import { CategoryEntity } from 'src/categories/entities/category.entity';
import { Roles } from 'src/utility/common/users/user-roles.enum';
import { Status } from 'src/utility/common/users/user-status.enum';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ type: 'enum', enum: Status, enumName: 'status', default: Status.INACTIVE })
  status: string = Status.INACTIVE;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.CUSTOMER] })
  roles: Roles[];

  @CreateDateColumn()
  createAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @OneToMany(() => CategoryEntity, (category) => category.addedBy)
  categories: CategoryEntity[]
}
