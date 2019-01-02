# Data Model

Notes about the data we intend to store.  Pseudo code for data.

Delete to log.

## Questions

- Where do the resume files get stored?
  - research storage solutions.
    - LFS
    - Binary blobs in Postgres
    - File server
      - Do I need to spin up a file server docker container and data volume?
- Should the app track people, or resumes?
  - Resumes are easier, but probably not the expected behavior.
  - What happens if there are two John Smiths?  What happens if there is a college application AND the same person submits an application via the website?

## Users

- ID
- Name
- Password
- ??? Email ?Should email be unique?
- OAuth stuff?

## Resume

- Resume ID
- Person ID (foreign key)
- File name
- Upload date
- Uploader user ID
- Source (foreign key)
- ??? Other data entered during upload ???
- Where does the file get stored???

## Person

- Person ID
- Full Name
- Internal Employee Type (FK)
- Internal Employee Status (FK)
- schooling_level_id (FK)
- Degree (FK) ????
- Position Applied For - text
- Security Clearance (FK)
- FUTURE FEATURE - Date Clearance Expires Date
- Resume (Lookup by id in resume)
- Date Resume received (via resume.upload_date)
- Email
- Phone number (possible international?)
- Mailing Address
- Physical Address
- Last Status of resume/applicant (FK)
- Last Status Date

## Comments

Person id
user id
date
blob of text

## FUTURE FEATURE - References

Documents

## Lookup Tables

General Layout

- ID
- Sort order
- Short Description
- Long Description

### Internal Employee Type

- 1 - Candidate - Not an employee
- 2 - Intern - Current intern
- 3 - Employee - Current employee

Note: Do not use terms like `Do Not Hire`.
FUTURE FEATURE -  - Not Eligible for Hire - Not Eligible for Hire
FUTURE FEATURE -  - Not Rehireable - Not Rehireable

### Internal Employment Status

- 0 - None - Never hired before
- 1 - FT - Full Time
- 2 - PT - Part Time
- 3 - Past - Former Employee/Intern

### Schooling

??????  Perhaps `TEXT` field for now?

### Degree

??????  Perhaps `TEXT` field for now?

### Sec Clearance

- 0 - None
- 1 - Secret - current
- 2 - Top Secret - current
- 3 - Secret - expired
- 4 - Top Secret - expired

### Resume Source

- 1 - Emp Ref - Employee Referral
- 2 - Cust Ref - Customer Referred
- 3 - Other Ref - Outside Referral
- 4 - Web - Applied through website
- 5 - Job Fair - Job Fair
- 6 - Recruiter - Recruiter
- 7 - Email - Direct Email
- 8 - Direct - Hand Delivered
- 9 - Fax - Faxed

### Resume/Applicant Status

??? Need more info here.

Received Resume
Background check
Clearance check
Called
Interview with hiring manager
Interview with senior executive
Offer letter sent
Offer letter rejected
Offer Letter accepted
Hired
[Can of worms] NUWC Access process
