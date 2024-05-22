const bookService = require('../api/services/book.service');

// Pruebas Unitaria (3U)
describe('Pruebas Unitarias de Creación de Libro', () => {
  test('Crear libro con título vacío', () => {
    const bookData = {
      title: '', // Simular creación de libro con título vacío
      pubDate: '12/12/2011',
      author: 'Autor Prueba',
      description: 'Descripción del libro',
      price: 10.99,
    };

    // Verificar que la creación de libro falle con título vacío
    expect(createBook(bookData)).toThrow();
  });

  test('Crear libro con precio negativo', () => {
    // Simular creación de libro con precio negativo
    const bookData = {
      title: 'Libro de Prueba',
      author: 'Autor Prueba',
      description: 'Descripción del libro',
      price: -5.99,
    };

    // Verificar que la creación de libro falle con precio negativo
    expect(createBook(bookData)).toThrow();
  });

  test('Crear libro con descripción muy larga', () => {
    // Simular creación de libro con descripción muy larga
    const bookData = {
      title: 'Libro de Prueba',
      author: 'Autor Prueba',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.',
      price: 10.99,
    };

    // Verificar que la creación de libro falle con descripción muy larga
    expect(createBook(bookData)).toThrow();
  });
});
  

  // Prueba de Integración (2I)
  describe('Pruebas de Integración de Creación de Libro', () => {
  test('Crear libro con datos inválidos - Integración', () => {
    // Simular solicitud de creación de libro con datos inválidos
    const bookData = {
      title: '',
      author: 'Autor Prueba',
      description: 'Descripción del libro',
      price: -5.99,
    };

    // Realizar la solicitud al controlador de libros
    const response = bookController.createBook(bookData);

    // Verificar que la respuesta indique un error por datos inválidos
    expect(response.status).toBe(400);
  });
});
  

  // Prueba End-to-End (1E2E)
  describe('Prueba End-to-End de Creación de Libro', () => {
    test('Crear libro con datos inválidos - E2E', async () => {
      // Simular solicitud HTTP de creación de libro con datos inválidos
      const bookData = {
        title: '',
        author: 'Autor Prueba',
        description: 'Descripción del libro',
        price: -5.99,
      };
  
      // Realizar la solicitud HTTP al servidor
      const response = await request(app).post('/api/books').send(bookData);
  
      // Verificar que la respuesta indique un error por datos inválidos
      expect(response.status).toBe(400);
    });
  });
  