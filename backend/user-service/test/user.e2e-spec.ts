import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { users } from './../src/user/user.store';
import { JwtService } from '@nestjs/jwt';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);

    // Create a test admin user and a regular user
    const adminUser = { id: 'admin-id', email: 'admin@test.com', role: 'admin' };
    const regularUser = { id: 'user-id', email: 'user@test.com', role: 'user' };
    users.push(adminUser, regularUser);

    adminToken = jwtService.sign({ sub: adminUser.id, email: adminUser.email, role: 'admin' });
    userToken = jwtService.sign({ sub: regularUser.id, email: regularUser.email, role: 'user' });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (GET)', () => {
    it('should return 401 for unauthenticated users', () => {
      return request(app.getHttpServer()).get('/users').expect(401);
    });

    it('should return 403 for non-admin users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    });

    it('should return all users for admin users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(2);
        });
    });
  });

  describe('/users/:id/role (PUT)', () => {
    it('should return 401 for unauthenticated users', () => {
      return request(app.getHttpServer()).put('/users/user-id/role').send({ role: 'admin' }).expect(401);
    });

    it('should return 403 for non-admin users', () => {
      return request(app.getHttpServer())
        .put('/users/user-id/role')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ role: 'admin' })
        .expect(403);
    });

    it('should allow an admin to update a user role', () => {
      return request(app.getHttpServer())
        .put('/users/user-id/role')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ role: 'admin' })
        .expect(200)
        .expect((res) => {
          expect(res.body.role).toEqual('admin');
        });
    });
  });
});
