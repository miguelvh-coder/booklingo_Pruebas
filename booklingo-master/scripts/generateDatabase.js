require('dotenv').config();

const { writeFileSync } = require('fs');
const { faker } = require('@faker-js/faker');

const connect = require('../config/connect');

const userService = require('../api/services/user.service');
const authService = require('../api/services/auth.service');
const bookService = require('../api/services/book.service');

// This script should never run in production
process.env.MONGO_DB = "test";

const userNumber = 10;
const bookNumber = 20;

const bookGenres = [
    "Fiction",
    "Non-fiction",
    "Mystery",
    "Thriller",
    "Horror",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Historical Fiction",
    "Biography",
    "Memoir",
    "Self-help",
    "Young Adult",
    "Children's",
    "Poetry",
    "Humor",
    "Adventure",
    "Dystopian",
    "Crime",
    "Graphic Novel",
    "Cookbook",
    "Travel",
    "Science",
    "Art",
    "Music",
    "Sports",
    "Religion",
    "Philosophy",
    "Psychology",
    "Business",
    "Economics",
    "Politics",
    "True Crime"
];

const createRandomUser = async () => {
    const password = faker.internet.password({ length: 8 });

    const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password
    };

    const user = await userService.createUser(userData);
    return { user, plainPassword: password };
}

const createRandomBook = async (userId) => {

    const bookData = {
        user: userId,
        title: faker.lorem.lines(1),
        author: faker.person.fullName(),
        editorial: faker.company.name(),
        genre: bookGenres[Math.floor(Math.random() * bookGenres.length)],
        pubDate: faker.date.between({
            from: '1492-10-12T16:19:31.822Z',
            to: new Date()
        })
    }

    return await bookService.createBook(userId, bookData);
}

connect().then(async () => {
    // var date = new Date();
    // date.setYear(-2700);
    // date.setMonth(0);
    // date.setDate(1);

    const users = await Promise.all(
        Array.from({ length: userNumber }, async () => {
            return await createRandomUser()
        })
    );

    const books = await Promise.all(
        Array.from({ length: bookNumber }, async () => {
            const randomUser = users[Math.floor(Math.random() * users.length)];

            return await createRandomBook(randomUser.user._id);
        })
    );

    try {
        writeFileSync("./data/users.json", JSON.stringify(users, null, 2), 'utf8');
        writeFileSync("./data/books.json", JSON.stringify(books, null, 2), 'utf8');

        console.log('Data successfully saved to disk');
    } catch (error) {
        console.log('An error has occurred ', error);
    }

    process.exit(1);
});
