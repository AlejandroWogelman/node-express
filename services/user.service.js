import { faker } from '@faker-js/faker';

class User {
  constructor({ name, edad }) {
    this.name = name;
    this.edad = edad;
    this.id = faker.datatype.uuid();
  }
  updateU({ name = this.name, edad = this.edad }) {
    this.name = name;
    this.edad = edad;
  }
}

export class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    for (let i = 1; i < 20; i++) {
      const newUser = new User({
        name: faker.name.fullName(),
        edad: faker.date.birthdate(),
      });
      this.users.push(newUser);
    }
  }

  async all() {
    return this.users;
  }
  async findOne(id) {
    const user = this.users.find((u) => u.id === id);
    return user;
  }
  async update(id, changes) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users[index].updateU(changes);
      return this.users[index];
    }
  }
  async create({ name, edad }) {
    const newUser = new User({ name, edad });
    this.users.push(newUser);
    return newUser;
  }

  async delete(id) {
    console.log(id);

    const index = this.users.findIndex((u) => u.index === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users = this.users.filter((u) => u.id !== id);
    return { id };
  }
}
