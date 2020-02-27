
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY,
  name text NOT NULL CHECK (name <> ''),
  priority integer ,
  description text,
  deliverydate date
);
CREATE TABLE IF NOT EXISTS users (
  id BigInt PRIMARY KEY ,
  name text NOT NULL,
  login text NOT NULL ,
  gitToken text,
  job text ,
  mastodon text,
  gitUsername text,
  email text,
  location text,
  school text,
  nbfollowers INTEGER,
  listoffollow JSON[],
  projectid INTEGER[],
  picture text,
  hashedPassword text,
  currentProject JSON,
  requests JSON[],
  company text

);
