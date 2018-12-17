ALTER TABLE resume ADD CONSTRAINT
    resume_person_id_fkey FOREIGN KEY ( person_id )
        REFERENCES person ( person_id ) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE resume ADD CONSTRAINT
    resume_user_id_fkey FOREIGN KEY ( user_id )
        REFERENCES app_user ( user_id ) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE resume ADD CONSTRAINT
    resume_resume_source_id_fkey FOREIGN KEY ( upload_source_id )
        REFERENCES resume_source ( resume_source_id ) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION;


ALTER TABLE person ADD CONSTRAINT
    person_internal_employee_type_id_fkey FOREIGN KEY ( internal_employee_type_id )
        REFERENCES internal_employee_type ( internal_employee_type_id ) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE person ADD CONSTRAINT
    person_internal_employee_status_id_fkey FOREIGN KEY ( internal_employee_status_id )
        REFERENCES internal_employee_status ( internal_employee_status_id ) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE person ADD CONSTRAINT
    person_schooling_level_id_fkey FOREIGN KEY ( schooling_level_id )
        REFERENCES schooling_level ( schooling_level_id ) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE person ADD CONSTRAINT
    person_degree_id_fkey FOREIGN KEY ( degree_id )
        REFERENCES degree ( degree_id ) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE person ADD CONSTRAINT
    person_security_clearance_id_fkey FOREIGN KEY ( security_clearance_id )
        REFERENCES security_clearance ( security_clearance_id ) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE person ADD CONSTRAINT
    person_status_of_person_id_fkey FOREIGN KEY ( last_status_of_person_id )
        REFERENCES status_of_person ( status_of_person_id ) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE comment ADD CONSTRAINT
    comment_person_id_fkey FOREIGN KEY ( person_id )
        REFERENCES person ( person_id ) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE comment ADD CONSTRAINT
    comment_user_id_fkey FOREIGN KEY ( user_id )
        REFERENCES app_user ( user_id ) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION;
