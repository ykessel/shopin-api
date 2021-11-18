import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Producto } from "./Producto";

@Entity()
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: string;
    
    @OneToMany(() => Producto, producto => producto.categoria)
    producto: Producto[];
}
