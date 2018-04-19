CREATE ROLE tt_ncd_screening
  NOINHERIT
  NOLOGIN;

GRANT tt_ncd_screening TO openchs;

GRANT ALL ON ALL TABLES IN SCHEMA public TO tt_ncd_screening;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO tt_ncd_screening;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO tt_ncd_screening;


INSERT into organisation(name, db_user, uuid, parent_organisation_id)
    SELECT 'Tata Trust - NCD Screening', 'tt_ncd_screening', '6470cb98-81ac-4fe3-80e7-c5d379ea8c76', id FROM organisation WHERE name = 'OpenCHS';