import { Request, Response, Router } from "express";
import { pool } from "../config/connection";
import { Tienda } from "../entities/admin/Tienda";

export const tiendasRouter = Router();

// Crear la tienda
tiendasRouter.post("/tiendas", async (req: Request, res: Response) => {
  const { propietario, email, password, tienda }: Tienda = req.body;

  (async () => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      await client.query(`CREATE SCHEMA ${tienda}`);
      await client.query(
        "INSERT INTO admin.tienda (propietario, email, password, tienda) VALUES ($1, $2, $3, $4)",
        [propietario, email, password, tienda]
      );
      await client.query(`CREATE TABLE ${tienda}.categorias(
            id UUID PRIMARY KEY NOT NULL DEFAULT UUID_GENERATE_V4(),
            nombre CHARACTER VARYING NOT NULL)`);
      await client.query(`CREATE TABLE ${tienda}.productos( 
            id UUID PRIMARY KEY NOT NULL DEFAULT UUID_GENERATE_V4(),
        		nombre character varying NOT NULL,
            precio integer NOT NULL,															
            categoria character varying, 
            creado TIMESTAMP WITHOUT TIME ZONE,
            descripcion character varying,
            cover character varying,
            publicado boolean)`);
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
      res.status(200).send(req.body);
    }
  })().catch((e) => console.error(e.stack));
});
