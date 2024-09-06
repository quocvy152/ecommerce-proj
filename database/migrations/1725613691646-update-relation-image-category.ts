import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationImageCategory1725613691646 implements MigrationInterface {
    name = 'UpdateRelationImageCategory1725613691646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "imageId" integer`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_fcb2e05575ea73809a8ff82fa1d" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_fcb2e05575ea73809a8ff82fa1d" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_fcb2e05575ea73809a8ff82fa1d"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_fcb2e05575ea73809a8ff82fa1d"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "imageId"`);
    }

}
