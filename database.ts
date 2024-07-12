import { config } from 'dotenv-safe';
import postgres from 'postgres';
import { Users } from './migrations/00000-createTableUsers';

config();

const sql = postgres();

// This is not an expected error
// Invalid Query: Error: syntax error at or near "."eslint@ts-safeql/check-sql
export async function getUsers1() {
  return await sql<Users[]>`
    SELECT
      users.id users.name
    FROM
      users
  `;
}

// This is not an expected error
// Invalid Query: Error: syntax error at or near "."eslint@ts-safeql/check-sql
export async function getUsers2() {
  return await sql<Users[]>`
    SELECT
      USER.name
    FROM
      USER
  `;
}

// This is not an expected error
// Invalid Query: Error: syntax error at or near "{"eslint@ts-safeql/check-sql
export const getUsers3 = async (sessionToken: string) => {
  const animals = await sql<{ id: number; name: string }[]>`
    SELECT
      users.*
    FROM
      users
      INNER JOIN sessions ON {
        sessions.token = ${sessionToken}
        AND expiry_timestamp > now()
      }
  `;
  return animals;
};
