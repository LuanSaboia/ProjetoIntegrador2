import { Router, Request, Response } from "express";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";

import { CreateChampionshipController } from "./controllers/championship/CreateChampionshipController";
import { ListChampionshipController } from "./controllers/championship/ListChampionshipController";
import { UpdateChampionshipController } from "./controllers/championship/UpdateChampionshipController";
import { CountChampionshipController } from "./controllers/championship/CountChampionshipController";
import { DetailChampionshipController } from "./controllers/championship/DetailChampionshipController";

import { CreateTeamController } from "./controllers/team/CreateTeamController";
import { ListTeamController } from "./controllers/team/ListTeamController";
import { UpdateTeamController } from "./controllers/team/UpdateTeamController";
import { CountTeamController } from "./controllers/team/CountTeamController";
import { DetailTeamController } from "./controllers/team/DetailTeamController";


import { CreateFootballerController } from "./controllers/footballer/CreateFootballerController";
import { ListFootballerController } from "./controllers/footballer/ListFootballerController";
import { FinishChampionshipController } from "./controllers/championship/FinishChampionshipController";
import { ListTeamChampionshipController } from "./controllers/team/ListTeamChampionshipController";
import { CountTeamChampionshipController } from "./controllers/team/CountTeamChampionshipController";
import { CreateMatchController } from "./controllers/match/CreateMatchController";
import { ListMatchChampionshipController } from "./controllers/match/ListMatchChampionshipController";
import { ListMatchController } from "./controllers/match/ListMatchController";
import { UpdateMatchController } from "./controllers/match/UpdateMatchController";
import { ListMatchChampionshipStatusController } from "./controllers/match/ListMatchChampionshipStatusController";
import { DetailMatchController } from "./controllers/match/DetailMatchController";
import { CreateMomentMatchController } from "./controllers/moment/CreateMomentMatchController";
import { CreateStatisticController } from "./controllers/statistic/CreateStatisticController";
import { ListTopScorersController } from "./controllers/moment/ListTopScorersController";
import { DetailFootballerController } from "./controllers/footballer/DetailFootballerController";
import { UpdateFootballerController } from "./controllers/footballer/UpdateFootballerController";
import { CreateGroupController } from "./controllers/group/CreateGroupController";
import { ListGroupController } from "./controllers/group/ListGroupController";
import { DeleteFootballerController } from "./controllers/footballer/DeleteFootballerController";
import { DeleteTeamController } from "./controllers/team/DeleteTeamController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";

const router = Router();

// Rotas User
router.post('/users', new CreateUserController().handle)
router.delete('/user', new DeleteUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)
router.put('/users', isAuthenticated, new UpdateUserController().handle)

// Rotas Championship
router.post('/championship', isAuthenticated, new CreateChampionshipController().handle)
router.get('/championships', isAuthenticated, new ListChampionshipController().handle)
router.put('/championship', isAuthenticated, new UpdateChampionshipController().handle)
router.get('/championship/count', isAuthenticated, new CountChampionshipController().handle)
router.get('/championship/detail', isAuthenticated, new DetailChampionshipController().handle)
router.put('/championship/finish', isAuthenticated, new FinishChampionshipController().handle)

// Rotas Team
router.post('/team', isAuthenticated, new CreateTeamController().handle)
router.get('/teams', isAuthenticated, new ListTeamController().handle)
router.delete('/team', isAuthenticated, new DeleteTeamController().handle)
router.put('/team', isAuthenticated, new UpdateTeamController().handle)
router.get('/team/count', isAuthenticated, new CountTeamController().handle)
router.get('/team/detail', isAuthenticated, new DetailTeamController().handle)
router.get('/team/championship', isAuthenticated, new ListTeamChampionshipController().handle)
router.get('/team/championship/count', isAuthenticated, new CountTeamChampionshipController().handle)

// Rotas Footballer
router.post('/footballer', isAuthenticated, new CreateFootballerController().handle)
router.put('/footballer', isAuthenticated, new UpdateFootballerController().handle)
router.get('/footballer', isAuthenticated, new ListFootballerController().handle)
router.delete('/footballer', isAuthenticated, new DeleteFootballerController().handle)
router.get('/footballer/detail', isAuthenticated, new DetailFootballerController().handle)

// Rotas Match
router.post('/match', isAuthenticated, new CreateMatchController().handle)
router.get('/matches', isAuthenticated, new ListMatchController().handle)
router.get('/match/championship', isAuthenticated, new ListMatchChampionshipController().handle)
router.get('/match/status', isAuthenticated, new ListMatchChampionshipStatusController().handle)
router.put('/match', isAuthenticated, new UpdateMatchController().handle)
router.get('/match/detail', isAuthenticated, new DetailMatchController().handle)

// Rotas Moment
router.post('/moment', isAuthenticated, new CreateMomentMatchController().handle)
router.get('/top-scorers', isAuthenticated, new ListTopScorersController().handle)

// Rotas Statistic
router.post('/statistic', isAuthenticated, new CreateStatisticController().handle)

// Rotas Group
router.post('/group', isAuthenticated, new CreateGroupController().handle)
router.get('/groups',  new ListGroupController().handle)

export { router }