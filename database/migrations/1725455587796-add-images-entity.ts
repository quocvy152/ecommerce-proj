import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagesEntity1725455587796 implements MigrationInterface {
    name = 'AddImagesEntity1725455587796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "size" integer NOT NULL, "path" character varying NOT NULL, "addedById" integer, CONSTRAINT "UQ_d46ee7424fcbbc896a457784f1e" UNIQUE ("name"), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "basePrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "addedById" integer`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_d3e4fb8d84e4ef74b095fba715e" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d7e7f53b786522ae18147bb853c" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d7e7f53b786522ae18147bb853c"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_d3e4fb8d84e4ef74b095fba715e"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "addedById"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "basePrice"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
