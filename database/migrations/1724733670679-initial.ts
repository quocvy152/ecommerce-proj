import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1724733670679 implements MigrationInterface {
    name = 'Initial1724733670679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."brands_status_enum" AS ENUM('active', 'inactive', 'removed')`);
        await queryRunner.query(`CREATE TABLE "brands" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."brands_status_enum" NOT NULL DEFAULT 'active', "addedById" integer, "parentId" integer, CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name"), CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."categories_status_enum" AS ENUM('active', 'inactive', 'removed')`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "status" "public"."categories_status_enum" NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "FK_295a7bdf0e549137f1579675844" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "FK_64ac4366ed2ebb22d86539bae48" FOREIGN KEY ("parentId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "FK_64ac4366ed2ebb22d86539bae48"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "FK_295a7bdf0e549137f1579675844"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."categories_status_enum"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TYPE "public"."brands_status_enum"`);
    }

}
