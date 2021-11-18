import { Request, Response, Router } from "express";
import { getManager } from 'typeorm';
import { User } from "../entities/client/User";

export const usersRouter = Router();

usersRouter.get("/users", async (req: Request, res: Response) => {
    const userRepository = getManager().connection.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
});

usersRouter.get("/users/:id", async (req: Request, res: Response) => {
    const userRepository = getManager().connection.getRepository(User);
    const results = await userRepository.findOne(req.params.id);
    return res.send(results);
});

usersRouter.post("/users", async (req: Request, res: Response) => {
    const userRepository = getManager().connection.getRepository(User);
    const user = userRepository.create(req.body);
    const results = await userRepository.save(user);
    return res.send(results);
});

usersRouter.put("/users/:id", async (req: Request, res: Response) => {
    const userRepository = getManager().connection.getRepository(User);
    const user = await userRepository.findOne(req.params.id);
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    return res.send(results);
});

usersRouter.delete("/users/:id", async (req: Request, res: Response) => {
    const userRepository = getManager().connection.getRepository(User);
    const results = await userRepository.delete(req.params.id);
    return res.send(results);
});
