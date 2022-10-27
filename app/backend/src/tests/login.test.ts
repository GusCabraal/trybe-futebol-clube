import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Model } from 'sequelize';
import user from './mocks/login.mock';
import User from '../database/models/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';


chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota de login', () => {
  describe('quando o login não recebe email e senha', () => {
    it('Retorna status 400', async () => {
      const httpResponse = await chai.request(app).post('/login')
      expect(httpResponse.status).to.equal(400);
    });

    it('Retorna uma mensagem de erro', async () => {
      const httpResponse = await chai.request(app).post('/login')
      expect(httpResponse.body).to.deep.equal({message: "All fields must be filled"});
    });
  })
  describe('quando o login recebe email ou senha invalidos', () => {
    before(() => {
      sinon.stub(Model, 'findOne').resolves(null)
      sinon.stub(bcrypt, 'compareSync').resolves(false);
    })

    after(() => sinon.restore())
    it('Retorna status 401', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({email: 'emailInvalido', password: '12345'})
      expect(httpResponse.status).to.equal(401);
    });

    it('Retorna uma mensagem de erro', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({email: 'emailInvalido', password: '12345'})
      expect(httpResponse.body).to.deep.equal({message: "Incorrect email or password"});
    });
  })
  describe('quando o login é feito com sucesso', () => {
    before(() => {
      sinon.stub(Model, 'findOne').resolves(user as User)
      sinon.stub(bcrypt, 'compareSync').resolves(true);
      sinon.stub(jwt, 'sign').resolves('VALID_TOKEN');
    })
    after(() => sinon.restore())

    it('Retorna status 200', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: "VALID_EMAIL@EMAIL.COM",
      password: "VALID_PASSWORD"})
      expect(httpResponse.status).to.equal(200);
    });

    it('Retorna um token', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({email: 'VALID_EMAIL@EMAIL.COM', password: 'VALID_PASSWORD'})
      expect(httpResponse.body).to.deep.equal({token: 'VALID_TOKEN'});
    });
  })
});
