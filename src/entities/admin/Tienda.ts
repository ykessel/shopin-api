import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail} from "class-validator";

@Entity()
export class Tienda {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    propietario: string;

    @Column({unique: true})
    tienda: string;

    @Column({unique: true})
    @IsEmail()
    email: string

    @Column()
    password: string
}
