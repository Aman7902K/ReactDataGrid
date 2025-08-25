// FakerData.ts
import { faker } from "@faker-js/faker";

export interface UserRow {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export function createFakeUser(index: number): UserRow {
  return {
    id: index + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 70 }),
  };
}

export const users: UserRow[] = Array.from({ length: 200 }, (_, i) =>
  createFakeUser(i)
);
