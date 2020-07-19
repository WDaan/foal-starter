import { MigrationInterface, QueryRunner } from 'typeorm'

export class addDatesAndSoftDeleteToTodo1595140625685
    implements MigrationInterface {
    name = 'addDatesAndSoftDeleteToTodo1595140625685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `todo` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)'
        )
        await queryRunner.query(
            'ALTER TABLE `todo` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)'
        )
        await queryRunner.query(
            'ALTER TABLE `todo` ADD `deleted` datetime(6) NULL'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `todo` DROP COLUMN `deleted`')
        await queryRunner.query('ALTER TABLE `todo` DROP COLUMN `updatedAt`')
        await queryRunner.query('ALTER TABLE `todo` DROP COLUMN `createdAt`')
    }
}
