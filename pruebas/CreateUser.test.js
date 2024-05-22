const userService = require('../api/services/user.service');


// Prueba Unitaria (3U)
describe('Pruebas Unitarias de Creación de Usuario', () => {
  test('Crear usuario con nombre de usuario vacío', () => {
    const userData = {
      username: '', //nombre de usuario vacio
      email: 'test@example.com',
      password: 'password123',
    };

    expect(createUser(userData)).toThrow(); // Verificar que la creación de usuario falle con nombre de usuario vacío
  });

  test('Crear usuario con email inválido', () => {
    const userData = {
      username: 'testuser',
      email: 'correo_invalido', // Simular creación de usuario con email inválido
      password: 'password123',
    };

    expect(createUser(userData)).toThrow();// Verificar que la creación de usuario falle con email inválido
  });

  test('Crear usuario con contraseña corta', () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: '', // Simular creación de usuario sin contraseña
    };

    expect(createUser(userData)).toThrow(); // Verificar que la creación de usuario falle con contraseña corta
  });
});
  




  // Pruebas de Integración (2I)
test('Integración: Crear usuario con datos inválidos', () => {
    // Implementación de la prueba
    const userData = {
        username: '', // Nombre de usuario vacío
        email: 'correo_invalido', // Email inválido
        password: '123', // Contraseña corta
      };
    
      // Realizar la solicitud al controlador de usuarios
      const response = userController.createUser(userData);
    
      // Verificar que la respuesta indique un error por datos inválidos
      expect(response.status).toBe(400);
});
  

  // Prueba End-to-End (1E2E)
test('E2E: Crear usuario con datos inválidos', () => {
    // Implementación de la prueba
    const userData = {
        username: '', // Nombre de usuario vacío
        email: 'correo_invalido', // Email inválido
        password: '123', // Contraseña corta
      };
    
      // Realizar la solicitud HTTP al servidor
      const response = request(app).post('/api/users').send(userData);
    
      // Verificar que la respuesta indique un error por datos inválidos
      expect(response.status).toBe(400);
});
  