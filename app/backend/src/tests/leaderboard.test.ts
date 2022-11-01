import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';
import { Model } from 'sequelize';
// import ITeam from '../entities/ITeams';
import { leaderboardAway, leaderboardHome } from './mocks/leaderboard.mock';
import modelSequelize from '../database/models';


chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste da rota de GET /leaderboard/away', () => {
  describe('quando tem sucesso', () => {
    before(() => {
      sinon.stub(modelSequelize, 'query').resolves([leaderboardAway, null]);
    })
    after(() => sinon.restore())

    it('Retorna status 200', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/leaderboard/away')

      expect(httpResponse.status).to.equal(200);
    });

    it('Retorna uma tabela de classificação', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
      
      expect(httpResponse.body).to.deep.equal(leaderboardAway);
    });
  })
});

describe('Seu teste da rota de GET /leaderboard/home', () => {
  describe('quando tem sucesso', () => {
    before(() => {
      sinon.stub(modelSequelize, 'query').resolves([leaderboardHome, null]);
    })
    after(() => sinon.restore())

    it('Retorna status 200', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/leaderboard/home')

      expect(httpResponse.status).to.equal(200);
    });

    it('Retorna uma tabela de classificação', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
      
      expect(httpResponse.body).to.deep.equal(leaderboardHome);
    });
  })
});
