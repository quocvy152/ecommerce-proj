import { BrandEntity } from 'src/brands/entities/brand.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ImageEntity } from 'src/images/entities/image.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { BaseEntity } from 'src/types/base-schema';
import { Roles } from 'src/utility/common/users/user-roles.enum';
import { Status } from 'src/utility/common/users/user-status.enum';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
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

  @OneToMany(() => CategoryEntity, (category) => category.addedBy)
  categories: CategoryEntity[]

  @OneToMany(() => BrandEntity, (brand) => brand.addedBy)
  brands: BrandEntity[]

  @OneToMany(() => ProductEntity, (product) => product.addedBy)
  products: ProductEntity;

  @OneToMany(() => ImageEntity, (image) => image.addedBy)
  images: ImageEntity;
}
