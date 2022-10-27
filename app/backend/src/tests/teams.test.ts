import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';
import { Model } from 'sequelize';
// import ITeam from '../entities/ITeams';
import { team, teams } from './mocks/teams.mock';
import Team from '../database/models/Team';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';


chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste da rota de GET /teams', () => {
  describe('quando tem sucesso', () => {
    before(() => {
      sinon.stub(Model, 'findAll').resolves(teams as Team[]);
    })
    after(() => sinon.restore())

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
  describe('quando o banco está vazio', () => {
    before(() => {
      sinon.stub(Model, 'findAll').resolves([]);
    })
    after(() => sinon.restore())

    it('Retorna status 200', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams')

      expect(httpResponse.status).to.equal(200);
    });

    it('Retorna o valor null', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams')
      
      expect(httpResponse.body).to.equal(null);
    });
  })
});

describe('Seu teste da rota de GET /teams/:id', () => {
  describe('quando tem sucesso', () => {
    before(() => {
      sinon.stub(Model, 'findByPk').resolves(team as Team);
    })
    after(() => sinon.restore())

    it('Retorna status 200', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams/2')

      expect(httpResponse.status).to.equal(200);
    });

    it('Retorna um unico time', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams/2')
      
      expect(httpResponse.body).to.deep.equal(team);
    });
  })
  describe('quando não encontra o time no banco de dados', () => {
    before(() => {
      sinon.stub(Model, 'findByPk').resolves(null);
    })
    after(() => sinon.restore())

    it('Retorna status 404', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams/100')

      expect(httpResponse.status).to.equal(404);
    });

    it('Retorna o valor null', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/teams/100')
      
      expect(httpResponse.body).to.deep.equal({
        message: "Team not found"
      });
    });
  })
});
