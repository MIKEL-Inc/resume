# Database Design Notes

## QUICK COMMANDS

Full reset database.

```bash
docker/down && docker volume rm docker_resume_database_data && docker/up -s
```

## Introduction

We chose Postgres for its open source, popularity, maturity, and professional defaults.  Considered contenders were MongoDB (a NOSQL database) and MySQL.

Postgres runs ephemerally in a Docker container.
That is, the Postgres docker container doesn't contain data.
The Postgres docker container connects to a Docker volume where Postgres can save the database.
The volume stores the Postgres data between container starts.

Set Postgres database credentials in the `docker/.env` file and do not commit it to the repository.
Deleting and rebuilding the data volume is a sure way to make the new credentials stick.

## Docker shell access

Access the Postgres on a running Docker image.  Substitute database credentials.

```bash
docker exec -it resume-db bash
root@3a67dbd621a6:/# psql -U postgres
psql (11.1 (Debian 11.1-1.pgdg90+1))
Type "help" for help.

postgres=# \c postgres
You are now connected to database "postgres" as user "postgres".
postgres=# \dt
                  List of relations
 Schema |           Name           | Type  |  Owner
--------+--------------------------+-------+----------
 public | app_user                 | table | postgres
 public | changelog                | table | postgres
 public | comment                  | table | postgres
 public | degree                   | table | postgres
 public | internal_employee_status | table | postgres
 public | internal_employee_type   | table | postgres
 public | person                   | table | postgres
 public | resume                   | table | postgres
 public | resume_source            | table | postgres
 public | schooling_level          | table | postgres
 public | security_clearance       | table | postgres
 public | status_of_person         | table | postgres
(12 rows)

postgres=# SELECT * FROM internal_employee_type;
 internal_employee_type_id | sort_order | description_short | description_long
---------------------------+------------+-------------------+------------------
                         1 |          1 | Candidate         | Not an employee
                         2 |          2 | Intern            | Current intern
                         3 |          3 | Employee          | Current employee
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

## DB data persistance

Postgres data persists across docker container restarts.
To remove the Postgres data volume, stop the docker containers and remove the volume.
Otherwise you will get `volume is in use` response from Docker daemon.

```bash
docker/down
docker volume rm docker_resume_database_data
```

## DB auto table load

On startup, the Postgres Docker container runs/loads scripts, database tables, data, and stored procedures from the project's `/db/` folder.  `.sh` scripts first, then `.sql` files, then `.sql.gz` files.  If more than one script, they get run in alphabetical order, (unverified).

The mechanism is the `/docker-entrypoint.sh` (a symbolic link to `usr/local/bin/docker-entrypoint.sh`) script on the docker container.  Docker-Compose file mounts project `/db/` folder onto Postgres Docker's `/docker-entrypoint-initdb.d/` folder.

## DB table design

See `Data Model.md`

## Storing files in the DB

[Storing Binary files in the Database](https://wiki.postgresql.org/wiki/BinaryFilesInDB)

TL;DR  We'll Base64 encode the file and store it in a text field.  KISS.

### Internal

- BLOB binary large object
- `bytea`/`text`

### External

- Links to files

Links to files will be hard to keep in sync, but should be where we migrate to.

`bytea` has complex translation issues and may increase database requirements.

BLOB has access permissions issues and uses a different interface for DB access.

Base64 encoded `text` uses about 33% more space and may increase database requirements.
Least custom.  Most portable.

## DB migration plan

Later, when there is at least test data to migrate, we will script migration scripts to run, in order, noting in the database script application.

We will pair migration scripts with undo scripts that reverse the changes.  We cannot reverse all changes, but probably most of them.

## DB scripting in NPM plan
