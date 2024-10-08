import { IsPositive } from "class-validator";
import { BaseEntity } from "src/types/base-schema";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @Column()
    @IsPositive()
    price: number;

    @Column()
    @IsPositive()
    basePrice: number;

    @Column()
    description: string;

    @ManyToOne(() => UserEntity, (user) => user.products)
    addedBy: UserEntity;
}
