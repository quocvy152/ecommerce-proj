import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationImageBrand1725628592742 implements MigrationInterface {
    name = 'UpdateRelationImageBrand1725628592742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" ADD "imageId" integer`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "UQ_f47df7ed65fc1337d71a7b590da" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "FK_f47df7ed65fc1337d71a7b590da" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "FK_f47df7ed65fc1337d71a7b590da"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "UQ_f47df7ed65fc1337d71a7b590da"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "imageId"`);
    }

}
