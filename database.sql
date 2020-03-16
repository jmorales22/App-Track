CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name character varying,
  location character varying
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name character varying,
  last_name character varying,
  email character varying,
  password character varying
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id),
  company_id integer REFERENCES companies(id),
  interview_rating varchar,
  whiteboarding_rating varchar,
  job_offer varchar,
  comments character varying
);

INSERT INTO companies (name, location)
VALUES ('Google', 'Alanta'),
('NCR', 'Atlanta'),
('Publix', 'Marietta'),
('Amazon', 'Seattle');

-- inserting users into the user table
-- INSERT INTO users (first_name, last_name, email, password)
-- VALUES ('Jennifer', 'Morales', 'jm@email.com');

--inserting reviews into the review table
-- INSERT INTO review (user_id, company_id, interview_rating, whiteboarding_rating, job_offer, comments)
-- VALUES (