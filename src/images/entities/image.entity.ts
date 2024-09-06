import { IsPositive } from "class-validator";
import { BrandEntity } from "src/brands/entities/brand.entity";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { BaseEntity } from "src/types/base-schema";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

@Entity({ name: 'images' })
export class ImageEntity extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @Column()
    @IsPositive()
    size: number;

    @Column()
    path: string;

    @ManyToOne(() => UserEntity, (user) => user.images)
    addedBy: UserEntity;

    @OneToOne(() => CategoryEntity, category => category.image)
    category: CategoryEntity

    @OneToOne(() => BrandEntity, brand => brand.image)
    brand: BrandEntity
}
