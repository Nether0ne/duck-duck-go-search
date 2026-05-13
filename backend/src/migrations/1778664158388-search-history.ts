import { MigrationInterface, QueryRunner } from "typeorm";

export class SearchHistory1778664158388 implements MigrationInterface {
    name = 'SearchHistory1778664158388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "search_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "query" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cb93c8f85dbdca85943ca494812" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_45485ceff4e97dbba6122d7c84" ON "search_history" ("created_at") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_45485ceff4e97dbba6122d7c84"`);
        await queryRunner.query(`DROP TABLE "search_history"`);
    }

}
