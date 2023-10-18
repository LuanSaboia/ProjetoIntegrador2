import { Router, Request, Response } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";

import { CreateChampionshipController } from "./controllers/championship/CreateChampionshipController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// Rotas User
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)
router.put('/users', isAuthenticated, new UpdateUserController().handle)

// Rotas Championship
router.post('/championship', isAuthenticated, new CreateChampionshipController().handle)


export { router }