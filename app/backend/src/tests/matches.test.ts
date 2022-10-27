import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";
import { Model } from "sequelize";
import { match, matches, newMatch } from "./mocks/matches.mock";
import Match from "../database/models/Match";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

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

describe("Seu teste da rota de GET /matches", () => {
  describe("quando tem sucesso", () => {
    before(() => {
      sinon.stub(Model, "findAll").resolves(matches as IMatch[]);
    });
    after(() => sinon.restore());

    it("Retorna status 200", async () => {
      const httpResponse = await chai.request(app).get("/matches");

      expect(httpResponse.status).to.equal(200);
    });

    it("Retorna uma lista de partidas", async () => {
      const httpResponse = await chai.request(app).get("/teams");

      expect(httpResponse.body).to.deep.equal(matches);
    });
  });
});
// describe.only("Teste da rota de POST /matches", () => {
//   describe("quando tem sucesso", () => {
//     before(() => {
//       sinon.stub(Model, "create").resolves(newMatch as IMatch);
//       // sinon.stub(jwt, 'verify').resolves({data: 'VALID_TOKEN'});
//     });
//     after(() => sinon.restore());

//     it("Retorna status 201", async () => {
//       const httpResponse = await (
//         await chai.request(app).post("/matches")
//       )
//         .header({
//           "Content-Type": "application/json",
//           Authorization: "VALID_TOKEN",
//         })
//         .send({
//           homeTeam: 1,
//           awayTeam: 12,
//           homeTeamGoals: 2,
//           awayTeamGoals: 2,
//         });

//       expect(httpResponse.status).to.equal(201);
//     });

//     it("Retorna uma lista de partidas", async () => {
//       const httpResponse = await chai.request(app).post("/matches").send({
//         homeTeam: 1,
//         awayTeam: 12,
//         homeTeamGoals: 2,
//         awayTeamGoals: 2,
//       });

//       expect(httpResponse.body).to.deep.equal(newMatch);
//     });
//   });
// });
