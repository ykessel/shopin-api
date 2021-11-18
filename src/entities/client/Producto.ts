import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Categoria } from "./Categoria";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({unique: true})
    nombre: string;
    
    @Column()
    precio: number;
    
    @ManyToOne(() => Categoria, categoria => categoria.producto)
    categoria: Categoria;
    
    @Column()
    descripcion: string;
    
    @Column()
    cover: string;    
    
    @Column()
    publicado: boolean;
    
    @Column()
    tienda: string;

    @CreateDateColumn()
    creado: Date;

}
