CREATE TABLE test_companies (
  id SERIAL PRIMARY KEY,
  name character varying,
  location character varying
);

CREATE TABLE test_users (
  id SERIAL PRIMARY KEY,
  first_name character varying,
  last_name character varying,
  email character varying,
  password character varying
);

CREATE TABLE test_reviews (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES test_users(id),
  company_id integer REFERENCES test_companies(id),
  interview_rating integer,
  whiteboarding_rating integer,
  job_offer integer,
  comments character varying
);
