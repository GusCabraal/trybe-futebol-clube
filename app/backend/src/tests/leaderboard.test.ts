import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import {
  leaderboardAway,
  leaderboardHome,
  leaderboardTotal
} from './mocks/leaderboard.mock';

import modelSequelize from '../database/models';


chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste da rota de GET /leaderboard', () => {
  describe('Quando acessa a rota GET /leaderboard com sucesso', () => {
    beforeEach(() => {
      sinon.stub(modelSequelize, 'query').resolves([leaderboardTotal, null]);
    })
    afterEach(() => sinon.restore())

    it('Retorna status 200', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/leaderboard')

      expect(httpResponse.status).to.equal(200);
    });

    it('Retorna uma tabela de classificação', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/leaderboard')
      
      expect(httpResponse.body).to.deep.equal(leaderboardTotal);
    });
  });

  describe('Quando acessa a rota GET /leaderboard/home com sucesso', () => {
    beforeEach(() => {
      sinon.stub(modelSequelize, 'query').resolves([leaderboardHome, null]);
    })
    afterEach(() => sinon.restore())

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

  describe('Quando acessa a rota GET /leaderboard/away com sucesso ', () => {
    beforeEach(() => {
      sinon.stub(modelSequelize, 'query').resolves([leaderboardAway, null]);
    })
    afterEach(() => sinon.restore())

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
  });
});




