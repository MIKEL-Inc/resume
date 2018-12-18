-- Load Sample Data

INSERT INTO app_user
    ( fullname
    , password
    , email
    , created_on
    , last_login
    )
  VALUES
      ('Internal User 1', 'NoPassInReal', 'iu@internal.com', transaction_timestamp(), NULL)
    , ('Internal User 2', 'OAuth4Win', 'iu2@internal.com', transaction_timestamp(), NULL)
;



INSERT INTO person
    ( fullname
    , internal_employee_type_id
    , internal_employee_status_id
    , schooling_level_id
    , degree_id
    , position_applied_for
    , security_clearance_id
    , email
    , mailing_address
    , physical_address
    , last_status_of_person_id
    , last_status_of_person_date
    )
  VALUES
      ( 'John Doe' --fullname
      , 1 --internal_employee_type_id
      , 1 --internal_employee_status_id
      , 7 --schooling_level_id
      , 1 --degree_id
      , 'Computer Programmer' --position_applied_for
      , 2 --security_clearance_id
      , 'JohnDoe35@freemail.com' --email
      , '123 Main St., Middletown, RI 02841' --mailing_address
      , '123 Main St., Middletown, RI 02841' --physical_address
      , 1 --last_status_of_person_id
      , transaction_timestamp() --last_status_of_person_date
      )
    , ( 'Jane Dow' --fullname
      , 1 --internal_employee_type_id
      , 1 --internal_employee_status_id
      , 7 --schooling_level_id
      , 2 --degree_id
      , 'Computer Programmer' --position_applied_for
      , 3 --security_clearance_id
      , 'JaneDow@inlook.com' --email
      , 'P.O. Box 101, Middletown, RI 02841-0101' --mailing_address
      , '45 Oak St., Middletown, RI 02841' --physical_address
      , 3 --last_status_of_person_id
      , transaction_timestamp() --last_status_of_person_date
      )
;
