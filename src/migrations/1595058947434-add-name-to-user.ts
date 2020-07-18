import {MigrationInterface, QueryRunner} from "typeorm";

export class addNameToUser1595058947434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `firstname` `firstname` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastname` `lastname` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastname` `lastname` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `firstname` `firstname` varchar(255) NOT NULL");
    }

}
