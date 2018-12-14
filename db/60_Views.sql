CREATE VIEW vw_person AS

SELECT P.person_id AS person_id
     , P.fullname AS fullname
     , ET.description_short AS internal_employee_type
     , ET.description_long AS internal_employee_type_description
     , ES.description_short AS internal_employee_status
     , ES.description_long AS internal_employee_status_description
     , SL.description_long AS schooling_level
     , SL.description_short AS schooling_level_abbr
     , D.description_long AS degree
     , D.description_short AS degree_abbr
     , P.position_applied_for AS position_applied_for
     , SC.description_long AS security_clearance
     , SC.description_short AS security_clearance_abbr
     , P.email AS email
     , P.mailing_address AS mailing_address
     , P.physical_address AS physical_address
     , SP.description_long AS last_status_of_person
     , SP.description_short AS last_status_of_person_abbr
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
