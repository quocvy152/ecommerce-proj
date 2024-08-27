import { UserEntity } from "src/users/entities/user.entity";
import { Status } from "src/utility/common/brands/brand-status.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({ name: 'brands' })
export class BrandEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updateAt: Timestamp;

    @ManyToOne(() => UserEntity, (user) => user.brands)
    addedBy: UserEntity

    @ManyToOne(() => BrandEntity, brand => brand.children, { nullable: true })
    parent: BrandEntity;

    @OneToMany(() => BrandEntity, brand => brand.parent, { nullable: true })
    children: BrandEntity[];

    @Column()
    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;
}
