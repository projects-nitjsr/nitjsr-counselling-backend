const db = require("../helpers/dbconnect");

const INITIALIZE_DATABASE = async () => {
  const dbInitQuery = `
USE ${process.env.DB_USER};

use u298279946_nitJsrNimcet;

SET FOREIGN_KEY_CHECKS = 0;
drop table if exists admin;
drop table if exists admin_credentials;
drop table if exists admin_session;
drop table if exists logger;
drop table if exists center_incharge;
drop table if exists chairman;
drop table if exists colleges;
drop table if exists result;
drop table if exists secretary;
drop table if exists student;
drop table if exists student_credentials;
drop table if exists student_status;
drop table if exists verifying_officers;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE admin_credentials (
	email varchar(255) NOT NULL ,
	password varchar(255) NOT NULL,
	token varchar(255) NOT NULL,
	PRIMARY KEY (email)
);

CREATE TABLE chairman (
	email varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	PRIMARY KEY (email)
);

CREATE TABLE center_incharge (
	email varchar(255) NOT NULL ,
	name varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	college varchar(255) NOT NULL UNIQUE,
	college_email varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (email)
);

CREATE TABLE colleges (
	id varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	general int NOT NULL,
	obc int NOT NULL,
	sc int NOT NULL,
	st int NOT NULL,
	pwd int NOT NULL,
	ews int NOT NULL,
	profile_image_url varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE verifying_officers (
	email varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	collegeId varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (email)
);

CREATE TABLE admin (
	email varchar(255) NOT NULL,
	designation varchar(255) NOT NULL,
	profile_image_url varchar(255),
	PRIMARY KEY (email)
);

CREATE TABLE student (
	regno varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	generalRank int NOT NULL,
	category enum('obc', 'sc', 'st', 'pwd', 'ews'),
	categoryRank int,
	profile_image_url varchar(255),
	PRIMARY KEY (regno)
);

CREATE TABLE result (
	regno varchar(255) NOT NULL,
	collegeId varchar(255) NOT NULL,
	status enum ('accepted', 'rejected', 'pending') NOT NULL,
	PRIMARY KEY (regno)
);

CREATE TABLE student_status (
	regno varchar(255) NOT NULL,
	applicationSatus enum('pending', 'verified', 'rejected') NOT NULL,
	failureDesc TEXT,
	acceptedBy varchar(255),
	rejectedBy varchar(255),
	confirmationPending bool,
	verifying_officer varchar(255) ,
	verifying_college varchar(255) ,
	PRIMARY KEY (regno)
);

CREATE TABLE student_credentials (
	regno varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	token varchar(255) NOT NULL,
	PRIMARY KEY (regno)
);

CREATE TABLE secretary (
	email varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	PRIMARY KEY (email)
);

CREATE TABLE logger (
	timestamp DATETIME NOT NULL,
	ip varchar(255) NOT NULL,
	log varchar(255) NOT NULL,
	user varchar(255) NOT NULL,
	PRIMARY KEY (user)
);

CREATE TABLE admin_session (
	timestamp DATETIME NOT NULL,
	ip varchar(255) NOT NULL,
	log varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	PRIMARY KEY (email)
);

ALTER TABLE admin_credentials ADD CONSTRAINT admin_credentials_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

ALTER TABLE chairman ADD CONSTRAINT chairman_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

ALTER TABLE center_incharge ADD CONSTRAINT center_incharge_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

ALTER TABLE center_incharge ADD CONSTRAINT center_incharge_fk1 FOREIGN KEY (college) REFERENCES colleges(id) ON DELETE CASCADE;

ALTER TABLE verifying_officers ADD CONSTRAINT verifying_officers_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

ALTER TABLE verifying_officers ADD CONSTRAINT verifying_officers_fk1 FOREIGN KEY (collegeId) REFERENCES colleges(id) ON DELETE CASCADE;

ALTER TABLE result ADD CONSTRAINT result_fk0 FOREIGN KEY (regno) REFERENCES student(regno) ON DELETE CASCADE;

ALTER TABLE result ADD CONSTRAINT result_fk1 FOREIGN KEY (collegeId) REFERENCES colleges(id) ON DELETE CASCADE;

ALTER TABLE student_status ADD CONSTRAINT student_status_fk0 FOREIGN KEY (regno) REFERENCES student(regno) ON DELETE CASCADE;

ALTER TABLE student_status ADD CONSTRAINT student_status_fk1 FOREIGN KEY (acceptedBy) REFERENCES admin(email) ON DELETE SET NULL;

ALTER TABLE student_status ADD CONSTRAINT student_status_fk2 FOREIGN KEY (rejectedBy) REFERENCES admin(email) ON DELETE SET NULL;

ALTER TABLE student_status ADD CONSTRAINT student_status_fk3 FOREIGN KEY (verifying_officer) REFERENCES verifying_officers(email) ON DELETE SET NULL;

ALTER TABLE student_status ADD CONSTRAINT student_status_fk4 FOREIGN KEY (verifying_college) REFERENCES colleges(id) ON DELETE SET NULL;

ALTER TABLE student_credentials ADD CONSTRAINT student_credentials_fk0 FOREIGN KEY (regno) REFERENCES student(regno) ON DELETE CASCADE;

ALTER TABLE secretary ADD CONSTRAINT secretary_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

`;
  let result = { success: false, message: "" };
  try {
    console.log("Clearing Database...");
    console.log("Initializing Database...");
    await db.queryAsync(dbInitQuery);
    console.log("Database Initialized Successfully!!");
    result.success = true;
  } catch (err) {
    console.log("Failed to initialize database!!");
    result = { success: false, message: err.message };
  }
  return result;
};
module.exports = INITIALIZE_DATABASE;

//driver code

// try {
//   const result = await INITIALIZE_DATABASE();
//   if (result.success) res.send("success");
//   else res.send(result.message);
// } catch (err) {
//   res.status(500).send({
//     status: false,
//     message: "Something went wrong",
//   });
// }
