import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1704100074063 implements MigrationInterface {
  name = 'Initial1704100074063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "passwordV2" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordV2"`);
  }
}
