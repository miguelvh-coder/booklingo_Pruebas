
// Prueba Unitaria (3U)
test('Crear usuario con datos inválidos', () => {
    // Implementación de la prueba
    const userData = {
        username: '', // Nombre de usuario vacío
        email: 'correo_invalido', // Email inválido
        password: '123', // Contraseña corta
      };
    expect(createUser(userData)).toThrow();
  });
  

  // Prueba de Integración (2I)
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
  