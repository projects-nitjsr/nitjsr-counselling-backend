const db = require("../helpers/dbconnect");

const INITIALIZE_DATABASE = async () => {
  const dbInitQuery = `
USE ${process.env.DB_USER};

CREATE TABLE chairman (
	email varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
    profile_image_url varchar(255),
	PRIMARY KEY (email)
);

CREATE TABLE secretary (
	email varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
    profile_image_url varchar(255),
	PRIMARY KEY (email)
);

CREATE TABLE center_incharge (
	email varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	collegeId varchar(255) NOT NULL UNIQUE,
	college_email varchar(255) UNIQUE,
    profile_image_url varchar(255),
	PRIMARY KEY (email)
);

CREATE TABLE colleges (
	id varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
    profile_image_url varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE college_seats (
	collegeId varchar(255) NOT NULL ,
	general int NOT NULL,
	obc int NOT NULL,
	sc int NOT NULL,
	st int NOT NULL,
	pwd int NOT NULL,
	ews int NOT NULL,
	PRIMARY KEY (collegeId)
);

CREATE TABLE verifying_officers (
	email varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	collegeId varchar(255) NOT NULL UNIQUE,
    profile_image_url varchar(255),
	PRIMARY KEY (email)
);

CREATE TABLE admin (
	email varchar(255) NOT NULL,
	designation varchar(255) NOT NULL,
	PRIMARY KEY (email)
);

CREATE TABLE student (
	regno varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	generalRank int NOT NULL,
	category varchar(255),
	categoryRank int,
	profile_image_url varchar(255),
	PRIMARY KEY (regno)
);

CREATE TABLE student_credentials (
	regno varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	token varchar(255) NOT NULL,
	PRIMARY KEY (regno)
);

CREATE TABLE student_status (
	regno varchar(255) NOT NULL,
	applicationStatus varchar(255) NOT NULL,
	failureDesc varchar(255) ,
	acceptedBy varchar(255) ,
	rejectedBy varchar(255),
	confirmationStatus varchar(255) ,
	PRIMARY KEY (regno)
);

CREATE TABLE result (
	regno varchar(255) NOT NULL,
	collegeId varchar(255) NOT NULL,
	PRIMARY KEY (regno)
);

CREATE TABLE admin_logs (
	email varchar(255) NOT NULL,
	log TEXT(255) NOT NULL,
	timestamp DATETIME NOT NULL,
    PRIMARY KEY (email)
);

CREATE TABLE admin_credentials (
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	token varchar(255) NOT NULL,
	PRIMARY KEY (email)
);

ALTER TABLE chairman ADD CONSTRAINT chairman_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

ALTER TABLE secretary ADD CONSTRAINT secretary_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

ALTER TABLE student_status ADD CONSTRAINT student_status_fk0 FOREIGN KEY (regno) REFERENCES student(regno) ON DELETE CASCADE;

ALTER TABLE student_credentials ADD CONSTRAINT student_credentials_fk0 FOREIGN KEY (regno) REFERENCES student(regno) ON DELETE CASCADE;

ALTER TABLE center_incharge ADD CONSTRAINT center_incharge_fk0 FOREIGN KEY (email) REFERENCES admin(email) ON DELETE CASCADE;

ALTER TABLE center_incharge ADD CONSTRAINT center_incharge_fk1 FOREIGN KEY (collegeId) REFERENCES colleges(id) ON DELETE CASCADE;

ALTER TABLE college_seats ADD CONSTRAINT college_seats_fk0 FOREIGN KEY (collegeId) REFERENCES colleges(id) ON DELETE CASCADE;

ALTER TABLE verifying_officers ADD CONSTRAINT verifying_officers_fk0 FOREIGN KEY (email) REFERENCES admin(email)ON DELETE CASCADE;

ALTER TABLE verifying_officers ADD CONSTRAINT verifying_officers_fk1 FOREIGN KEY (collegeId) REFERENCES colleges(id)ON DELETE CASCADE;

ALTER TABLE result ADD CONSTRAINT result_fk0 FOREIGN KEY (regno) REFERENCES student(regno)ON DELETE CASCADE;

ALTER TABLE result ADD CONSTRAINT result_fk1 FOREIGN KEY (collegeId) REFERENCES colleges(id)ON DELETE CASCADE;

ALTER TABLE admin_credentials ADD CONSTRAINT admin_credentials_fk0 FOREIGN KEY (email) REFERENCES admin(email)ON DELETE CASCADE;

ALTER TABLE admin_logs ADD CONSTRAINT admin_fk0 FOREIGN KEY (email) REFERENCES admin(email);
`;
  const dbDeleteQuery = `
USE ${process.env.DB_USER};

SET FOREIGN_KEY_CHECKS = 0;
drop table if exists admin;
drop table if exists admin_credentials;
drop table if exists admin_logs;
drop table if exists center_incharge;
drop table if exists chairman;
drop table if exists college_seats;
drop table if exists colleges;
drop table if exists result;
drop table if exists secretary;
drop table if exists student;
drop table if exists student_credentials;
drop table if exists student_status;
drop table if exists verifying_officers;
SET FOREIGN_KEY_CHECKS = 1;
`;
  let result = { success: false, message: "" };
  try {
    console.log("Clearing Database...");
    await db.queryAsync(dbDeleteQuery);
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
//   if (result.success) res.send("login");
//   else res.send(result.message);
// } catch (err) {
//   res.status(500).send({
//     status: false,
//     message: "Something went wrong",
//   });
// }
