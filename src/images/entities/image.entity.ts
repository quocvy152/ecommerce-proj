import { IsPositive } from "class-validator";
import { BaseEntity } from "src/types/base-schema";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: 'images' })
export class ImageEntity extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @Column()
    @IsPositive()
    size: number;

    @Column()
    path: string;

    @ManyToOne(() => UserEntity, (user) => user.products)
    addedBy: UserEntity;
}
