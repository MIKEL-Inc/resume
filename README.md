# Resume

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.1 with Node.js 10.14.1, Docker CE 18.09.0, and Docker-Compose 1.11.2 running on a Debian variant of Linux (Ubuntu 16.04 LTS or Elementary OS)

## TL;DR

To run development version in Linux

```bash
# When started, docker containers stay running in the background
docker/up

npm start
```

Navigate to application at <http://localhost:4200>.

Graph*i*QL interactive server at <http://localhost:4000>.

### Initial Setup for Linux

Install and configure `docker`, `docker-compose`, `node` (includes `npm`), and `git`.  (We recommend using `nvm` script to install and manage `node` versions.)

```bash
git clone git@github.com:MIKEL-Inc/resume.git
cd resume
npm install
cp docker/template.env docker/.env
```

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

This also start the backend GraphQL server running in Express.

Note: `ng serve` will start the Angular project, but not the GraphQL server.

Note: The GraphQL server expects the Postgres database to be running with default configuration.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Docker Environment

### One-time setup

The Docker environment scripts require Docker and Docker-Compose.

Copy the template docker environment script, customize user and password.

```bash
cp docker/template.env docker/.env
nano docker/.env
```

Do not commit this file to the repository.  It contains database credentials.

### Normal Use

Start by calling the `up` script. From the project root, run:

```bash
docker/up
```

Can use relative path.  For example, run from the `src/app/` folder with `../../docker/up`.
From inside the `docker/` folder use `./up`.
Can also use the `-s` flag to skip building the Angular project `docker/up -s`.

Script prints webserver and database access information.

## Postgres Database

Access running Postgres Docker container command line substituting your own database credentials:

```bash
docker exec -it resume-db bash
root@3a67dbd621a6:/# psql -U postgres
psql (11.1 (Debian 11.1-1.pgdg90+1))
Type "help" for help.

postgres=# \dt
             List of relations
 Schema |     Name     | Type  |   Owner
--------+--------------+-------+-----------
 public | account      | table | postgres
 public | account_role | table | postgres
 public | role         | table | postgres
(3 rows)

postgres=# \q
root@3a67dbd621a6:/# exit
```

Helpful Postgres commands:

```text
\dt     Describe Tables
\l      List Databases
\q      Quit
\?      Help
```

Postgres data persists across docker container restarts.
To remove the Postgres data volume, stop the docker containers and remove the volume.
Otherwise you will get `volume is in use` response from Docker daemon.

```bash
docker/down
docker volume rm docker_resume_database_data
```
