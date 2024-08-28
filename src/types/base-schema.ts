import { CreateDateColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

/**
 * BaseEntity: store field any entity have
 * (export abstract class): to explain this class cannot be create instance
 */
export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Timestamp;
    
    @UpdateDateColumn()
    updatedAt: Timestamp;
}