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
import { JWT_VALID_VERIFY, VALID_TOKEN } from './mocks/utils.mock';


chai.use(chaiHttp);

const { expect } = chai;

const VALID_EMAIL = 'valid@email.com';
const INVALID_EMAIL = '12345';
const VALID_PASSWORD = 'VALID_PASSWORD'
const INVALID_PASSWORD = 'INVALID_PASSWORD'


describe('Teste da rota de POST /login', () => {
  describe('Quando o login não recebe email e senha', () => {
    it('Retorna status 400', async () => {
      const httpResponse = await chai.request(app).post('/login')
      expect(httpResponse.status).to.equal(400);
    });

    it('Retorna uma mensagem de erro', async () => {
      const httpResponse = await chai.request(app).post('/login')
      expect(httpResponse.body).to.deep.equal({message: "All fields must be filled"});
    });
  })

  describe('Quando o login recebe um email invalido', () => {  

    beforeEach(() => sinon.stub(Model, 'findOne').resolves(null))
    afterEach(() => sinon.restore())

    it('Retorna status 401', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({email: INVALID_EMAIL, password: VALID_PASSWORD})

      expect(httpResponse.status).to.equal(401);
    });

    it('Retorna uma mensagem de erro', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({email: INVALID_EMAIL, password: VALID_PASSWORD})

      expect(httpResponse.body).to.deep.equal({message: "Incorrect email or password"});
    });
  })

  describe('Quando o login recebe uma senha invalida', () => {
  
    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves(user as User)
      sinon.stub(bcrypt, 'compareSync').resolves(false);
    })
    afterEach(() => sinon.restore())

    it('Retorna uma mensagem de erro', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({email: VALID_EMAIL, password: INVALID_PASSWORD})

      expect(httpResponse.body).to.deep.equal({message: "Incorrect email or password"});
    });
  })

  describe('Quando o login é feito com sucesso', () => {

    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves(user as User)
      sinon.stub(bcrypt, 'compareSync').resolves(true);
      sinon.stub(jwt, 'sign').resolves(VALID_TOKEN);
    })
    afterEach(() => sinon.restore())

    it('Retorna status 200', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: VALID_EMAIL,
      password: "VALID_PASSWORD"})

      expect(httpResponse.status).to.equal(200);
    });

    it('Retorna um token', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({email: VALID_EMAIL, password: VALID_PASSWORD})

      expect(httpResponse.body).to.deep.equal({token: VALID_TOKEN});
    });
  })
});

describe('Teste da rota de GET /login/validate', () => {

  describe('Quando tem sucesso', () => {
    beforeEach(() => {
      sinon.stub(jwt, 'verify').resolves(JWT_VALID_VERIFY);
    });  
    afterEach(() => sinon.restore());

    it('Retorna status 200', async () => {
      const httpResponse = await chai.request(app)
      .get('/login/validate')
      .set('Authorization', VALID_TOKEN)

      expect(httpResponse.status).to.equal(200);
    });

    it('Retorna uma mensagem com a role do usuario logado', async () => {
      const httpResponse = await chai.request(app)
      .get('/login/validate')
      .set('Authorization', VALID_TOKEN)

      expect(httpResponse.body).to.deep.equal({ role: "admin" });
    });
  })
})

describe('Teste do erro 500 na aplicação', () => {

  beforeEach(() => {
    sinon.stub(Model, 'findOne').rejects(user as User)
  })
  afterEach(() => sinon.restore())

  it('Retorna status 500', async () => {
    const httpResponse = await chai
    .request(app)
    .post('/login')
    .send({email: VALID_EMAIL, password: INVALID_PASSWORD})

    expect(httpResponse.status).to.equal(500);
  });

  it('Retorna uma mensagem de erro', async () => {
    const httpResponse = await chai
    .request(app)
    .post('/login')
    .send({email: VALID_EMAIL, password: INVALID_PASSWORD})

    expect(httpResponse.body).to.deep.equal({message: "Internal server error"});
  });
})
