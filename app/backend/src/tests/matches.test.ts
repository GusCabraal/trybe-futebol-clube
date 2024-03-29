import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Model } from "sequelize";
import { finishedMatches, inProgressMatches, matches, newMatch } from "./mocks/matches.mock";
import { twoTeamsArray } from './mocks/teams.mock';
import Match from "../database/models/Match";
import * as jwt from "jsonwebtoken";
import Team from "../database/models/Team";
import { INVALID_TOKEN, JWT_VALID_VERIFY, VALID_TOKEN } from "./mocks/utils.mock";

class IMatch extends Match {
  teamHome: {
    teamName: string;
  };
  teamAway: {
    teamName: string;
  };
}

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste da rota de GET /matches", () => {
  describe("Quando tem sucesso", () => {
    beforeEach(() => {
      sinon.stub(Model, "findAll").resolves(matches as IMatch[]);
    });
    afterEach(() => sinon.restore());

    it("Retorna status 200", async () => {
      const httpResponse = await chai.request(app).get("/matches");

      expect(httpResponse.status).to.equal(200);
    });

    it("Retorna uma lista de partidas", async () => {
      const httpResponse = await chai.request(app).get("/matches");

      expect(httpResponse.body).to.deep.equal(matches);
    });
  });

  describe("Quando busca apenas as partidas em progresso", () => {

    beforeEach(() => sinon.stub(Model, "findAll").resolves(inProgressMatches as IMatch[]));
    afterEach(() => sinon.restore());

    it("Retorna uma lista de partidas", async () => {
      const httpResponse = await chai.request(app).get("/matches?inProgress=true");

      expect(httpResponse.body).to.deep.equal(inProgressMatches);
    });
  });

  describe("Quando busca apenas as partidas finalizadas", () => {

    beforeEach(() => sinon.stub(Model, "findAll").resolves(finishedMatches as IMatch[]));
    afterEach(() => sinon.restore());

    it("Retorna uma lista de partidas", async () => {
      const httpResponse = await chai.request(app).get("/matches?inProgress=false");

      expect(httpResponse.body).to.deep.equal(finishedMatches);
    });
  });
});

describe("Teste da rota de POST /matches", () => {

  describe("Quando tem sucesso", () => {
  
    beforeEach(() => {
      sinon.stub(jwt, 'verify').resolves(JWT_VALID_VERIFY);
      sinon.stub(Model, "findAll").resolves(twoTeamsArray as Team[]);
      sinon.stub(Model, "create").resolves(newMatch as IMatch);
    });
    afterEach(() => sinon.restore());

    it("Retorna status 201", async () => {
      const httpResponse = await chai.request(app).post("/matches")
        .set('Authorization', VALID_TOKEN)
        .send({
          homeTeam: 1,
          awayTeam: 2,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        });

      expect(httpResponse.status).to.equal(201);
    });

    it("Retorna a partida cadastrada", async () => {
      const httpResponse = await chai.request(app).post("/matches")
      .set('Authorization', VALID_TOKEN)
      .send({
        homeTeam: 1,
        awayTeam: 2,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

      expect(httpResponse.body).to.deep.equal(newMatch);
    });
  });

  describe("Quando não passa um token", () => {
    it("Retorna status 401", async () => {
      const httpResponse = await chai.request(app).post("/matches")

      expect(httpResponse.status).to.equal(401);
    });

    it("Retorna uma mensagem de token não encontrado", async () => {
      const httpResponse = await chai.request(app).post("/matches")

      expect(httpResponse.body).to.deep.equal({ message: 'Token not found' });
    });
  });

  describe("Quando passa um token invalido", () => {

    beforeEach(() => sinon.stub(jwt, 'verify').resolves(null));
    afterEach(() => sinon.restore());

    it("Retorna status 401", async () => {
      const httpResponse = await chai.request(app).post("/matches")
        .set('Authorization', INVALID_TOKEN)

      expect(httpResponse.status).to.equal(401);
    });

    it("Retorna uma mensagem de token invalido", async () => {
      const httpResponse = await chai.request(app).post("/matches")
      .set('Authorization', INVALID_TOKEN)

      expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  });

  describe("Quando passa dois times iguais", () => {

    beforeEach(() => sinon.stub(jwt, 'verify').resolves(JWT_VALID_VERIFY));
    afterEach(() => sinon.restore());

    it("Retorna status 422", async () => {
      const httpResponse = await chai.request(app).post("/matches")
        .set('Authorization', VALID_TOKEN)
        .send({
          homeTeam: 1,
          awayTeam: 1,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        });

      expect(httpResponse.status).to.equal(422);
    });

    it("Retorna uma mensagem de erro", async () => {
      const httpResponse = await chai.request(app).post("/matches")
      .set('Authorization', VALID_TOKEN)
      .send({
        homeTeam: 1,
        awayTeam: 1,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

      expect(httpResponse.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });
  });

  describe("Quando passa um time com id invalido", () => {
    beforeEach(() => {
      sinon.stub(jwt, 'verify').resolves(JWT_VALID_VERIFY);
      sinon.stub(Model, "findAll").resolves([]);
    });
    afterEach(() => sinon.restore());

    it("Retorna status 404", async () => {
      const httpResponse = await chai.request(app).post("/matches")
        .set('Authorization', VALID_TOKEN)
        .send({
          homeTeam: 1000,
          awayTeam: 2,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        });

      expect(httpResponse.status).to.equal(404);
    });

    it("Retorna uma mensagem de erro", async () => {
      const httpResponse = await chai.request(app).post("/matches")
      .set('Authorization', VALID_TOKEN)
      .send({
        homeTeam: 1000,
        awayTeam: 2,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

      expect(httpResponse.body).to.deep.equal({ message: 'There is no team with such id!' });
    });
  });
});

describe("Teste da rota de PATCH /matches", () => {
  describe("Finalizando uma partida em progresso", () => {
    beforeEach(() => {
      sinon.stub(Model, "update").resolves(undefined);
      sinon.stub(jwt, 'verify').resolves(JWT_VALID_VERIFY);
    });
    afterEach(() => sinon.restore());

    it("Retorna status 200", async () => {
      const httpResponse = await chai.request(app)
      .patch("/matches/1/finish")
      .set('Authorization', VALID_TOKEN)

      expect(httpResponse.status).to.equal(200);
    });

    it("Retorna uma mensagem de partida finalizada", async () => {
      const httpResponse = await chai.request(app)
      .patch("/matches/1/finish")
      .set('Authorization', VALID_TOKEN);

      expect(httpResponse.body).to.deep.equal({ message: 'Finished' });
    });
  });

  describe("Atualizando uma partida em progresso", () => {
    beforeEach(() => sinon.stub(Model, "update").resolves(undefined));
    afterEach(() => sinon.restore());

    it("Retorna status 200", async () => {
      const httpResponse = await chai.request(app)
      .patch("/matches/1")
      .send({
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

      expect(httpResponse.status).to.equal(200);
    });

    it("Retorna uma mensagem de ok", async () => {
      const httpResponse = await chai.request(app)
      .patch("/matches/1")
      .send({
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });
      
      expect(httpResponse.body).to.deep.equal({ message: 'ok' });
    });
  });
});