import { Request, Response, Router } from "express";
import { pool } from "../config/connection";

export const productosRouter = Router();

productosRouter.get("/productos", async (req: Request, res: Response) => {
  const { tienda } = req.query;
  pool.query(`SELECT * FROM ${tienda}.productos`, (error, results) => {
    if (error) console.error(error);
    res.status(200).json(results.rows);
  });
});

productosRouter.get("/productos/get", async (req: Request, res: Response) => {
  const { id, tienda } = req.query;

  pool.query(
    `SELECT * FROM ${tienda}.productos WHERE id = $1`,
    [id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(results.rows);
    }
  );
});

productosRouter.post("/productos", async (req: Request, res: Response) => {
  const {
    id,
    nombre,
    precio,
    categoria,
    descripcion,
    cover,
    creado,
    publicado,
    tienda,
  } = req.body;

  pool.query(
    `INSERT INTO ${tienda}.productos (id, nombre, precio, categoria, descripcion, creado, cover, publicado)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [id, nombre, precio, categoria, descripcion, creado, cover, publicado],
    (error, results) => {
      if (error) console.error(error);
      res.status(200).send(req.body);
    }
  );
});

productosRouter.put("/productos/:id", async (req: Request, res: Response) => {
  const { id, nombre, precio, categoria, descripcion, publicado, tienda } =
    req.body;

  pool.query(
    `UPDATE ${tienda}.productos SET nombre = $1, precio = $2, categoria = $3,
        descripcion = $4, publicado = $5 WHERE id = $6`,
    [nombre, precio, categoria, descripcion, publicado, id],
    (error, results) => {
      if (error) console.error(error);
      res.status(200).send(req.body);
    }
  );
});

productosRouter.delete(
  "/productos/:id",
  async (req: Request, res: Response) => {
    const data = req.params.id;
    const tienda = data.slice(data.indexOf("*") + 1, data.lastIndexOf("*"));
    const id = data.slice(0, data.indexOf("*"));

    pool.query(
      `DELETE FROM ${tienda}.productos WHERE id = ${id}`,
      [id],
      (error, results) => {
        if (error) console.error(error);
        res.status(200).send(id);
      }
    );
  }
);
