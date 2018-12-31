-- DROP VIEW IF EXISTS vw_person;
CREATE VIEW vw_person AS

SELECT P.person_id AS person_id
     , P.fullname AS fullname

     , ET.internal_employee_type_id AS internal_employee_type_id
     , ET.sort_order AS internal_employee_type_sort_order
     , ET.description_short AS internal_employee_type_description_short
     , ET.description_long AS internal_employee_type_description_long

     , ES.internal_employee_status_id AS internal_employee_status_id
     , ES.sort_order AS internal_employee_status_sort_order
     , ES.description_short AS internal_employee_status_description_short
     , ES.description_long AS internal_employee_status_description_long

     , SL.schooling_level_id AS schooling_level_id
     , SL.sort_order AS schooling_level_sort_order
     , SL.description_short AS schooling_level_description_short
     , SL.description_long AS schooling_level_description_long

     , D.degree_id AS degree_id
     , D.sort_order AS degree_sort_order
     , D.description_short AS degree_description_short
     , D.description_long AS degree_description_long

     , P.position_applied_for AS position_applied_for

     , SC.security_clearance_id AS security_clearance_id
     , SC.sort_order AS security_clearance_sort_order
     , SC.description_short AS security_clearance_description_short
     , SC.description_long AS security_clearance_description_long

     , P.email AS email
     , P.phone AS phone
     , P.mailing_address AS mailing_address
     , P.physical_address AS physical_address

     , SP.status_of_person_id AS status_of_person_id
     , SP.sort_order AS status_of_person_sort_order
     , SP.description_short AS status_of_person_description_short
     , SP.description_long AS status_of_person_description_long

     , P.last_status_of_person_date AS last_status_of_person_date
FROM person AS P

  JOIN internal_employee_type AS ET
  ON P.internal_employee_type_id = ET.internal_employee_type_id

  JOIN internal_employee_status AS ES
  ON P.internal_employee_status_id = ES.internal_employee_status_id

  JOIN schooling_level AS SL
  ON P.schooling_level_id = SL.schooling_level_id

  JOIN degree AS D
  ON P.degree_id = D.degree_id

  JOIN security_clearance AS SC
  ON P.security_clearance_id = SC.security_clearance_id

  JOIN status_of_person AS SP
  ON P.last_status_of_person_id = SP.status_of_person_id

;
