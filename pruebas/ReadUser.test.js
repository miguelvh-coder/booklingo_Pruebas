const User = require('../api/models/user.model');
const userService = require('../api/services/user.service');
const userController = require('../api/controllers/user.controller');
const userRoute = require('../api/services/user.controller');

const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {  
  res.status(200).json({ name: 'john', email: 'jhon7843@test', password: 'ahhhh', isDeleted: false});
});


// Prueba Unitaria (3U)
describe('Pruebas Unitarias de Lectura de Usuario', () => {
  //prueba de accion
  test('Leer un usuario específico', async () => {
     // Simular leer un usario
     const response = await request(app).get("/user");
     
     expect(response.status).toBe(200);
    expect(user.id).toBe(userId); // Verificar que se devuelva el usuario correcto
  });

  //prueba de controlador
  test('Leer usario en el controlador', () => {
    const user = userService.findUserbyId(userId, false);

    
    expect(users.length).toBeGreaterThan(0);
  });

  //prueba de ruta
  test('Leer usuario en la ruta (service)', () => {
    // Simular la lectura de un usuario no existente
    const userId = 'no-existe';

    // Verificar que se lance una excepción al leer un usuario no existente
    expect(() => readUser(userId)).toThrow();
  });
});


// Prueba de Integración (2I)
describe('Pruebas de Integración de Lectura de Usuario', () => {
  test('Leer un usuario específico - Integración', () => {
    // Simular la solicitud de lectura de un usuario específico
    const userId = '123';

    // Realizar la solicitud al controlador de usuarios
    const user = userController.readUser(userId);

    // Verificar que se devuelva el usuario correcto
    expect(user.id).toBe(userId);
  });

  test('Leer todos los usuarios - Integración', () => {
    // Simular la solicitud de lectura de todos los usuarios
    const users = userController.readAllUsers();

    // Verificar que se devuelva una lista de usuarios
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
  });
});
  

  // Prueba End-to-End (1E2E)
  describe('Prueba End-to-End de Lectura de Usuario', () => {
    test('Leer un usuario específico - E2E', async () => {
      // Simular la solicitud HTTP de lectura de un usuario específico
      const userId = '123';
  
      // Realizar la solicitud HTTP al servidor
      const response = await request(app).get(`/api/users/${userId}`);
  
      // Verificar que se devuelva el usuario correcto
      expect(response.body.id).toBe(userId);
    });
  
    test('Leer todos los usuarios - E2E', async () => {
      // Simular la solicitud HTTP de lectura de todos los usuarios
      const response = await request(app).get('/api/users');
  
      // Verificar que se devuelva una lista de usuarios
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
  