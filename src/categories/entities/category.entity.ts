import { UserEntity } from "src/users/entities/user.entity";
import { Status } from "src/utility/common/categories/category-status.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({ name: 'categories' })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updateAt: Timestamp;

    @ManyToOne(() => UserEntity, (user) => user.categories)
    addedBy: UserEntity

    @ManyToOne(() => CategoryEntity, category => category.children, { nullable: true })
    parent: CategoryEntity;

    @OneToMany(() => CategoryEntity, category => category.parent, { nullable: true })
    children: CategoryEntity[];

    @Column()
    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;
}
