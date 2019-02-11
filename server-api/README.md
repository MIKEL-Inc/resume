# README

Work in progress.

TypeScript compiles to JS.
Node runs JS to launch Express.JS and serve GraphQL.
Connects to existing Postgres database instance.

The following assumes top level project is setup.

From inside this `server-api/` folder, run:

```bash
# (One time to setup `npm` packages.)
npm install
#or# npm i
#or# npm ci

# (Once per login to start Postgres Docker database.)
../docker/up -s
# -s skips compiling top level project for Docker webserver.


# to cross-compile TS to JS and
# launch Express server.

npm start
```

 Graph*i*QL on <http://localhost:4000/graphql>
