import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBaseEnityForCategoryUser1724820494172 implements MigrationInterface {
    name = 'UpdateBaseEnityForCategoryUser1724820494172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "updateAt" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "createAt" TO "createdAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "createdAt" TO "createAt"`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "updatedAt" TO "updateAt"`);
    }

}
