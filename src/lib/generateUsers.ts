// lib/fakeUsers.ts
import { faker } from "@faker-js/faker";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Superuser" | "Admin" | "User";
  createdAt: string;
  location: {
    lat: number;
    lng: number;
  };
}

const roles: User["role"][] = ["Superuser", "Admin", "User"];

export const generateFakeUsers = (count: number = 10): User[] => {
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    users.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(roles),
      createdAt: faker.date.past({ years: 10 }).toISOString(),
      location: {
        lat: Number(faker.location.latitude()),
        lng: Number(faker.location.longitude()),
      },
    });
  }

  return users;
};
