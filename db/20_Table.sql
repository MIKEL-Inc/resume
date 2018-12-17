CREATE TABLE app_user
    ( user_id SERIAL PRIMARY KEY
    , fullname VARCHAR(150) UNIQUE NOT NULL
    , password VARCHAR(50) NOT NULL
    , email VARCHAR(355) UNIQUE NOT NULL
    , created_on TIMESTAMP NOT NULL
    , last_login TIMESTAMP
    );

CREATE TABLE resume
    ( resume_id SERIAL PRIMARY KEY
    , user_id INTEGER
    , person_id INTEGER NOT NULL
    , file_name VARCHAR(1024)
    , upload TIMESTAMP
    , upload_user_id INTEGER
    , upload_source_id INTEGER
    , payload TEXT
    );

CREATE TABLE person
    ( person_id SERIAL PRIMARY KEY
    , fullname VARCHAR(255) NOT NULL
    , internal_employee_type_id INTEGER DEFAULT 1
    , internal_employee_status_id INTEGER DEFAULT 1
    , schooling_level_id INTEGER
    , degree_id INTEGER
    , position_applied_for VARCHAR(255)
    , security_clearance_id INTEGER DEFAULT 1
    , email VARCHAR(355)
    , mailing_address TEXT
    , physical_address TEXT
    , last_status_of_person_id INTEGER
    , last_status_of_person_date TIMESTAMP
    );

CREATE TABLE comment
    ( comment_id SERIAL PRIMARY KEY
    , person_id INTEGER
    , user_id INTEGER
    , commented TIMESTAMP
    , comment TEXT
    );

CREATE TABLE internal_employee_type
    ( internal_employee_type_id SERIAL PRIMARY KEY
    , sort_order INTEGER
    , description_short TEXT
    , description_long TEXT
    );

CREATE TABLE internal_employee_status
    ( internal_employee_status_id SERIAL PRIMARY KEY
    , sort_order INTEGER
    , description_short TEXT
    , description_long TEXT
    );

CREATE TABLE degree
    ( degree_id SERIAL PRIMARY KEY
    , sort_order INTEGER
    , description_short TEXT
    , description_long TEXT
    );

CREATE TABLE schooling_level
    ( schooling_level_id SERIAL PRIMARY KEY
    , sort_order INTEGER
    , description_short TEXT
    , description_long TEXT
    );

CREATE TABLE security_clearance
    ( security_clearance_id SERIAL PRIMARY KEY
    , sort_order INTEGER
    , description_short TEXT
    , description_long TEXT
    );

CREATE TABLE resume_source
    ( resume_source_id SERIAL PRIMARY KEY
    , sort_order INTEGER
    , description_short TEXT
    , description_long TEXT
    );

CREATE TABLE status_of_person
    ( status_of_person_id SERIAL PRIMARY KEY
    , sort_order INTEGER
    , description_short TEXT
    , description_long TEXT
    );
