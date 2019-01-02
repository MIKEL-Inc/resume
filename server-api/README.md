# README

Work in progress.

TypeScript compiles to JS.  Node runs JS.

Express.JS and GraphQL.

This assumes top level project is setup.

From inside this `server-api/` folder, run:

(One time, run `npm install` or `npm i` or `npm ci`.)

`../docker/up` to start Postgres Docker.  (Assumes top level project is setup.)

`npm run watch` to continuously compile the TypeScript.

Then the following to run Express server and Graph*i*QL on <http://localhost:4000>.

```bash
PGUSER=postgres \
PGHOST=localhost \
PGPASSWORD=postgres \
PGDATABASE=postgres \
PGPORT=5432 \
npm run serve
```
