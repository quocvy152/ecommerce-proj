import { ImageEntity } from "src/images/entities/image.entity";
import { BaseEntity } from "src/types/base-schema";
import { UserEntity } from "src/users/entities/user.entity";
import { Status } from "src/utility/common/brands/brand-status.enum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity({ name: 'brands' })
export class BrandEntity extends BaseEntity {
    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => UserEntity, (user) => user.brands)
    addedBy: UserEntity

    @ManyToOne(() => BrandEntity, brand => brand.children, { nullable: true })
    parent: BrandEntity;

    @OneToMany(() => BrandEntity, brand => brand.parent, { nullable: true })
    children: BrandEntity[];

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @OneToOne(() => ImageEntity, image => image.brand)
    @JoinColumn()
    image: ImageEntity
}
