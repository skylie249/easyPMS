-- SI project checklist template — English seed data
-- Mirrors seed_template.sql but with locale = 'en', so /en/new can query
-- template_categories/template_items where locale = 'en'.

do $$
declare
  cat_kickoff uuid;
  cat_requirement uuid;
  cat_contract uuid;
  cat_design uuid;
  cat_dev uuid;
  cat_test uuid;
  cat_release uuid;
  cat_deliverable uuid;
  cat_closing uuid;
  cat_risk uuid;
begin

  insert into template_categories (id, name, sort_order, locale) values
    (gen_random_uuid(), '01. Kickoff Preparation', 1, 'en') returning id into cat_kickoff;
  insert into template_categories (id, name, sort_order, locale) values
    (gen_random_uuid(), '02. Contract & Scope Management', 2, 'en') returning id into cat_contract;
  insert into template_categories (id, name, sort_order, locale) values
    (gen_random_uuid(), '03. Requirements Definition & Analysis', 3, 'en') returning id into cat_requirement;
  insert into template_categories (id, name, sort_order, locale) values
    (gen_random_uuid(), '04. Design', 4, 'en') returning id into cat_design;
  insert into template_categories (id, name, sort_order, locale) values
    (gen_random_uuid(), '05. Development', 5, 'en') returning id into cat_dev;
  insert into template_categories (id, name, sort_order, locale) values
    (gen_random_uuid(), '06. Testing & Quality', 6, 'en') returning id into cat_test;
  insert into template_categories (id, name, sort_order, locale) values
    (gen_random_uuid(), '07. Go-live & Transition', 7, 'en') returning id into cat_release;
  insert into template_categories (id, name, sort_order, locale) values
    (gen_random_uuid(), '08. Deliverable Management', 8, 'en') returning id into cat_deliverable;
  insert into template_categories (id, name, sort_order, locale) values
    (gen_random_uuid(), '09. Closeout, Acceptance & Handover', 9, 'en') returning id into cat_closing;
  insert into template_categories (id, name, sort_order, locale) values
    (gen_random_uuid(), '10. Risk, Issue & Communication Management', 10, 'en') returning id into cat_risk;

  -- 01. Kickoff Preparation
  insert into template_items (category_id, title, description, sort_order, locale) values
    (cat_kickoff, 'Prepare and submit the kickoff report', 'Include project overview, execution structure, schedule, and org chart', 1, 'en'),
    (cat_kickoff, 'Draft the project charter', 'State purpose, scope, key stakeholders, and approval authority', 2, 'en'),
    (cat_kickoff, 'Finalize the project org chart and roles & responsibilities (R&R)', 'Clarify client/vendor contacts and their roles', 3, 'en'),
    (cat_kickoff, 'Assign PM/PL and establish a contact protocol', 'Set up an emergency contact list and reporting lines', 4, 'en'),
    (cat_kickoff, 'Hold the kickoff meeting', 'With the client, vendor, and key stakeholders', 5, 'en'),
    (cat_kickoff, 'Request accounts and access for dev/ops environments', 'VPN, internal network, server access accounts, etc.', 6, 'en'),
    (cat_kickoff, 'Finalize standard deliverable templates', 'Confirm the client''s standards for reports, meeting minutes, WBS, etc.', 7, 'en');

  -- 02. Contract & Scope Management
  insert into template_items (category_id, title, description, sort_order, locale) values
    (cat_contract, 'Review the contract and RFP (statement of work)', 'Confirm contract amount, duration, and warranty period', 1, 'en'),
    (cat_contract, 'Clarify and document the scope of work', 'State what''s included/excluded to prevent disputes', 2, 'en'),
    (cat_contract, 'Establish a change management process', 'Approval procedure for scope, schedule, or cost changes', 3, 'en'),
    (cat_contract, 'Verify subcontracting agreements and registration', 'Ensure compliance with applicable law when subcontracting', 4, 'en'),
    (cat_contract, 'Confirm liquidated damages and warranty terms', 'Understand penalty clauses for delays', 5, 'en'),
    (cat_contract, 'Submit security and personal-data pledges', 'All assigned staff complete security pledges', 6, 'en');

  -- 03. Requirements Definition & Analysis
  insert into template_items (category_id, title, description, sort_order, locale) values
    (cat_requirement, 'Complete the as-is system analysis', 'Understand existing systems and business processes', 1, 'en'),
    (cat_requirement, 'Write the requirements specification (based on the RFP)', 'Organize functional and non-functional requirements separately', 2, 'en'),
    (cat_requirement, 'Create the requirements traceability matrix (RTM)', 'Map requirements to design and test cases', 3, 'en'),
    (cat_requirement, 'Conduct stakeholder interviews/workshops', 'Gather requirements from business departments', 4, 'en'),
    (cat_requirement, 'Prioritize and sign off on requirements', 'Obtain written confirmation/approval from the client', 5, 'en'),
    (cat_requirement, 'Define non-functional requirements', 'Standards for performance, security, availability, scalability', 6, 'en');

  -- 04. Design
  insert into template_items (category_id, title, description, sort_order, locale) values
    (cat_design, 'Prepare UI/UX design specs', 'Wireframes and screen flow diagrams', 1, 'en'),
    (cat_design, 'Create the ERD and table definitions', 'Data modeling and normalization review', 2, 'en'),
    (cat_design, 'Write the API/interface design spec', 'Define internal and external integration interfaces', 3, 'en'),
    (cat_design, 'Prepare the architecture design document', 'System diagram and infrastructure configuration', 4, 'en'),
    (cat_design, 'Review the security design', 'Authentication/authorization, encryption, access control', 5, 'en'),
    (cat_design, 'Hold design review meetings and obtain approval', 'Complete review with client/architect', 6, 'en');

  -- 05. Development
  insert into template_items (category_id, title, description, sort_order, locale) values
    (cat_dev, 'Establish development standards and coding conventions', 'Naming rules, comment rules, etc.', 1, 'en'),
    (cat_dev, 'Set up version control (e.g. Git) and a branching strategy', 'Dev/staging/production branch policy', 2, 'en'),
    (cat_dev, 'Configure the CI/CD pipeline', 'Automate build and deployment', 3, 'en'),
    (cat_dev, 'Set up weekly development progress reporting', 'Track progress against the WBS', 4, 'en'),
    (cat_dev, 'Run a code review process', 'Peer review to ensure quality', 5, 'en'),
    (cat_dev, 'Write and run unit tests', 'Ensure unit test coverage for key modules', 6, 'en');

  -- 06. Testing & Quality
  insert into template_items (category_id, title, description, sort_order, locale) values
    (cat_test, 'Prepare the test plan', 'Define test scope, schedule, and methodology', 1, 'en'),
    (cat_test, 'Write and run integration test scenarios', 'Verify interactions between modules', 2, 'en'),
    (cat_test, 'Plan user acceptance testing (UAT)', 'Coordinate schedule with business-side participants', 3, 'en'),
    (cat_test, 'Conduct UAT and summarize results', 'List defects and confirm fixes', 4, 'en'),
    (cat_test, 'Perform performance testing', 'Load/stress testing against target metrics', 5, 'en'),
    (cat_test, 'Check for security vulnerabilities (e.g. penetration testing)', 'Confirm if the system handles personal data and requires this', 6, 'en'),
    (cat_test, 'Maintain a defect log and confirm closure', 'Fix by severity and retest', 7, 'en');

  -- 07. Go-live & Transition
  insert into template_items (category_id, title, description, sort_order, locale) values
    (cat_release, 'Prepare the go-live (cutover) plan', 'Include go-live date and rollback plan', 1, 'en'),
    (cat_release, 'Plan and verify data migration', 'Procedure to validate migrated data integrity', 2, 'en'),
    (cat_release, 'Deploy to production and do a final check', 'Verify production server settings, firewall, etc.', 3, 'en'),
    (cat_release, 'Run a go-live rehearsal', 'Simulate the actual go-live beforehand', 4, 'en'),
    (cat_release, 'Establish an emergency rollback plan', 'Response procedure if go-live fails', 5, 'en'),
    (cat_release, 'Run post-launch monitoring and stabilization', 'Handle issues during the hyper-care period', 6, 'en');

  -- 08. Deliverable Management
  insert into template_items (category_id, title, description, sort_order, locale) values
    (cat_deliverable, 'Submit kickoff/interim/completion reports', 'Formal reports for each phase', 1, 'en'),
    (cat_deliverable, 'Finalize requirements/design documents', 'Final versions reflecting all changes', 2, 'en'),
    (cat_deliverable, 'Submit the test result report', 'Include UAT and integration test results', 3, 'en'),
    (cat_deliverable, 'Write user and operator manuals', 'Guide to system usage and operating procedures', 4, 'en'),
    (cat_deliverable, 'Deliver source code and version control history', 'Full source and library list', 5, 'en'),
    (cat_deliverable, 'Maintain the deliverable baseline list', 'Full list and versions of delivered artifacts', 6, 'en');

  -- 09. Closeout, Acceptance & Handover
  insert into template_items (category_id, title, description, sort_order, locale) values
    (cat_closing, 'Send the formal acceptance request', 'Coordinate acceptance procedure and schedule', 1, 'en'),
    (cat_closing, 'Agree on acceptance criteria and checklist in advance', 'Confirm the client''s acceptance criteria', 2, 'en'),
    (cat_closing, 'Receive the acceptance certificate', 'Official sign-off confirming acceptance', 3, 'en'),
    (cat_closing, 'Finalize the warranty period and scope', 'Re-confirm warranty terms in the contract', 4, 'en'),
    (cat_closing, 'Hand over to the operations/maintenance team', 'Share system architecture and issue history', 5, 'en'),
    (cat_closing, 'Transfer/revoke accounts, permissions, and access', 'Revoke dev accounts, transfer ops accounts', 6, 'en'),
    (cat_closing, 'Final settlement and invoicing', 'Progress/final payment invoicing procedure', 7, 'en'),
    (cat_closing, 'Document project retrospective (lessons learned)', 'Record what went well and what to improve', 8, 'en');

  -- 10. Risk, Issue & Communication Management
  insert into template_items (category_id, title, description, sort_order, locale) values
    (cat_risk, 'Maintain and regularly update the risk register', 'Identify, analyze, and plan responses to risks', 1, 'en'),
    (cat_risk, 'Maintain the issue log', 'Track issues from registration through resolution', 2, 'en'),
    (cat_risk, 'Hold regular weekly/monthly status meetings', 'Share progress with the client', 3, 'en'),
    (cat_risk, 'Write and distribute meeting minutes', 'Record decisions and action items', 4, 'en'),
    (cat_risk, 'Establish a communication management plan', 'Define reporting channels, cadence, and audience', 5, 'en'),
    (cat_risk, 'Track change request (CR) history', 'Analyze schedule/cost impact of scope changes', 6, 'en');

end $$;
