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

INSERT INTO resume
    ( resume_id
    , user_id
    , person_id
    , file_name
    , upload
    , upload_user_id
    , upload_source_id
    , text_blob
    , payload
    )
    VALUES
      ( 1 -- resume_id
      , 1 -- user_id
      , 1 -- person_id
      , 'test_resume.pdf' -- file_name
      , transaction_timestamp() -- upload
      , 1 -- upload_user_id
      , 1 -- upload_source_id
      , 'Hello World!' -- text_blob
      , 'SGVsbG8gV29ybGQh' -- payload
      )
    , ( 2 -- resume_id
      , 1 -- user_id
      , 2 -- person_id
      , 'minimal.pdf' -- file_name
      , transaction_timestamp() -- upload
      , 1 -- upload_user_id
      , 1 -- upload_source_id
      , 'Hello World' -- text_blob
      , 'JVBERi0xLjEKJcKlwrHDqwoKMSAwIG9iagogIDw8IC9UeXBlIC9DYXRhbG9nCiAgICAgL1BhZ2Vz
IDIgMCBSCiAgPj4KZW5kb2JqCgoyIDAgb2JqCiAgPDwgL1R5cGUgL1BhZ2VzCiAgICAgL0tpZHMg
WzMgMCBSXQogICAgIC9Db3VudCAxCiAgICAgL01lZGlhQm94IFswIDAgMzAwIDE0NF0KICA+Pgpl
bmRvYmoKCjMgMCBvYmoKICA8PCAgL1R5cGUgL1BhZ2UKICAgICAgL1BhcmVudCAyIDAgUgogICAg
ICAvUmVzb3VyY2VzCiAgICAgICA8PCAvRm9udAogICAgICAgICAgIDw8IC9GMQogICAgICAgICAg
ICAgICA8PCAvVHlwZSAvRm9udAogICAgICAgICAgICAgICAgICAvU3VidHlwZSAvVHlwZTEKICAg
ICAgICAgICAgICAgICAgL0Jhc2VGb250IC9UaW1lcy1Sb21hbgogICAgICAgICAgICAgICA+Pgog
ICAgICAgICAgID4+CiAgICAgICA+PgogICAgICAvQ29udGVudHMgNCAwIFIKICA+PgplbmRvYmoK
CjQgMCBvYmoKICA8PCAvTGVuZ3RoIDU1ID4+CnN0cmVhbQogIEJUCiAgICAvRjEgMTggVGYKICAg
IDAgMCBUZAogICAgKEhlbGxvIFdvcmxkKSBUagogIEVUCmVuZHN0cmVhbQplbmRvYmoKCnhyZWYK
MCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxOCAwMDAwMCBuIAowMDAwMDAwMDc3IDAw
MDAwIG4gCjAwMDAwMDAxNzggMDAwMDAgbiAKMDAwMDAwMDQ1NyAwMDAwMCBuIAp0cmFpbGVyCiAg
PDwgIC9Sb290IDEgMCBSCiAgICAgIC9TaXplIDUKICA+PgpzdGFydHhyZWYKNTY1CiUlRU9GCg==
' -- payload
      )
;
