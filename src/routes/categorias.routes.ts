import { Request, Response, Router } from "express";
import { getManager } from 'typeorm';
import { Categoria } from "../entities/client/Categoria";

export const categoriasRouter = Router();

categoriasRouter.get("/categorias", async (req: Request, res: Response) => {
    const categoriaRepository = getManager().connection.getRepository(Categoria);
    const categorias = await categoriaRepository.find();
    res.json(categorias);
});

categoriasRouter.get("/categorias/:id", async (req: Request, res: Response) => {
    const categoriaRepository = getManager().connection.getRepository(Categoria);
    const results = await categoriaRepository.findOne(req.params.id);
    return res.send(results);
});

categoriasRouter.post("/categorias", async (req: Request, res: Response) => {
    const categoriaRepository = getManager().connection.getRepository(Categoria);
    const categoria = categoriaRepository.create(req.body);
    const results = await categoriaRepository.save(categoria);
    return res.send(results);
});

categoriasRouter.put("/categorias/:id", async (req: Request, res: Response) => {
    const categoriaRepository = getManager().connection.getRepository(Categoria);
    const categoria = await categoriaRepository.findOne(req.params.id);
    categoriaRepository.merge(categoria, req.body);
    const results = await categoriaRepository.save(categoria);
    return res.send(results);
});

categoriasRouter.delete("/categorias/:id", async (req: Request, res: Response) => {
    const categoriaRepository = getManager().connection.getRepository(Categoria);
    const results = await categoriaRepository.delete(req.params.id);
    return res.send(results);
});
