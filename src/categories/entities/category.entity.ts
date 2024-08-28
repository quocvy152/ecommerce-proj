import { BaseEntity } from "src/types/base-schema";
import { UserEntity } from "src/users/entities/user.entity";
import { Status } from "src/utility/common/categories/category-status.enum";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
    @Column({ unique: true })
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => UserEntity, (user) => user.categories)
    addedBy: UserEntity

    @ManyToOne(() => CategoryEntity, category => category.children, { nullable: true })
    parent: CategoryEntity;

    @OneToMany(() => CategoryEntity, category => category.parent, { nullable: true })
    children: CategoryEntity[];

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;
}
