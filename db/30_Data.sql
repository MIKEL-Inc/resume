-- Populate lookup table lists

INSERT INTO resume_source
    ( sort_order
    , description_short
    , description_long
    )
  VALUES
      (1, 'Emp Ref', 'Employee Referral')
    , (2, 'Cust Ref', 'Customer Referred')
    , (3, 'Other Ref', 'Outside Referral')
    , (4, 'Web', 'Applied through website')
    , (5, 'Job Fair', 'Job Fair')
    , (6, 'Recruiter', 'Recruiter')
    , (7, 'Email', 'Direct Email')
    , (8, 'Direct', 'Hand Delivered')
    , (9, 'Fax', 'Faxed')
;


INSERT INTO status_of_person
    ( sort_order
    , description_short
    , description_long
    )
  VALUES
      (0, 'Received Resume', 'Received Resume')
    , (1, 'Background check', 'Background check')
    , (2, 'Clearance check', 'Clearance check')
    , (3, 'Called', 'Called')
    , (4, 'Interview with hiring manager', 'Interview with hiring manager')
    , (5, 'Interview with senior executive', 'Interview with senior executive')
    , (6, 'Offer letter sent', 'Offer letter sent')
    , (7, 'Offer letter rejected', 'Offer letter rejected')
    , (8, 'Offer Letter accepted', 'Offer Letter accepted')
    , (9, 'Hired', 'Hired')
;

INSERT INTO internal_employee_type
    ( sort_order
    , description_short
    , description_long
    )
  VALUES
      (1, 'Candidate', 'Not an employee')
    , (2, 'Intern', 'Current intern')
    , (3, 'Employee', 'Current employee')
;

INSERT INTO internal_employee_status
    ( sort_order
    , description_short
    , description_long
    )
  VALUES
      (0, 'None', 'Never hired before')
    , (1, 'FT', 'Full Time')
    , (2, 'PT', 'Part Time')
    , (3, 'Past', 'Former Employee/Intern')
;

INSERT INTO security_clearance
    ( sort_order
    , description_short
    , description_long
    )
  VALUES
      (4, 'N/A', 'None')
    , (2, 'S', 'Secret - current')
    , (0, 'TS', 'Top Secret - current')
    , (3, 'S-exp', 'Secret - expired')
    , (1, 'TS-exp', 'Top Secret - expired')
;

INSERT INTO schooling_level
    ( sort_order
    , description_short
    , description_long
    )
  VALUES
      (0, 'Unk', 'Unknown')
    , (1, 'N/A', 'None')
    , (2, 'HS', 'High School')
    , (3, 'AA', 'Associates Art')
    , (4, 'AS', 'Associates Science')
    , (5, 'BA', 'Bachelors Art')
    , (6, 'BS', 'Bachelors Science')
    , (7, 'MA', 'Masters Art')
    , (8, 'MS', 'Masters Science')
    , (9, 'Ph.D', 'Doctorates')
;

INSERT INTO degree
    ( sort_order
    , description_short
    , description_long
    )
  VALUES
      (0, 'CoE', 'Computer Engineering')
    , (1, 'CS', 'Computer Science')
    , (2, 'Phys', 'Physics')
    , (3, 'Math', 'MAthematics')
    , (4, 'EE', 'Electrical Engineering')
    , (5, 'CE', 'Chemical Engineering')
    , (6, 'CivE', 'Civil Engineering')
;
