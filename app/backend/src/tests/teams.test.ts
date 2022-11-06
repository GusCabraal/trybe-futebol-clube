import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Model } from 'sequelize';
import { team, teams } from './mocks/teams.mock';
import Team from '../database/models/Team';


chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota de GET /teams', () => {
  describe('Quando tem sucesso', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findAll').resolves(teams as Team[]);
    })
    afterEach(() => sinon.restore())

    it('Retorna status 200', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams')

      expect(httpResponse.status).to.equal(200);
    });

    it('Retorna uma lista de times', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams')
      
      expect(httpResponse.body).to.deep.equal(teams);
    });
  })
  describe('Quando o banco não está populado', () => {
    beforeEach(() => sinon.stub(Model, 'findAll').resolves([]));
    afterEach(() => sinon.restore())

    it('Retorna status 200', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams')

      expect(httpResponse.status).to.equal(200);
    });

    it('Retorna um array vazio', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams')
      
      expect(httpResponse.body).to.deep.equal([]);
    });
  })
});

describe('Teste da rota de GET /teams/:id', () => {
  describe('Quando tem sucesso', () => {

    beforeEach(() => sinon.stub(Model, 'findByPk').resolves(team as Team));
    afterEach(() => sinon.restore())

    it('Retorna status 200', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams/2')

      expect(httpResponse.status).to.equal(200);
    });

    it('Retorna um único time', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams/2')
      
      expect(httpResponse.body).to.deep.equal(team);
    });
  })

  describe('Quando não encontra o time no banco de dados', () => {
    beforeEach(() => sinon.stub(Model, 'findByPk').resolves(null));
    afterEach(() => sinon.restore())

    it('Retorna status 404', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams/100')

      expect(httpResponse.status).to.equal(404);
    });

    it('Retorna a mensagem de time não encontrado', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams/100')
      
      expect(httpResponse.body).to.deep.equal({
        message: "Team not found"
      });
    });
  })
});
