CREATE TABLE changelog (
  change_id INTEGER NOT NULL,
  delta_set VARCHAR(10) NOT NULL,
  start TIMESTAMP NOT NULL,
  complete TIMESTAMP NULL,
  applied_by VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL
);

ALTER TABLE changelog ADD CONSTRAINT Pkchangelog PRIMARY KEY (change_id, delta_set)
;
