import Database from "better-sqlite3";
const db = Database("./db/data.db", { verbose: console.log });

const applicants = [
  {
    name: "Eva Gjini",
    email: "evagj@hotmail.com",
    position: "Full Stack Developer",
  },
  {
    name: "Mandi Ndoj",
    email: "mandin@gmail.com",
    position: "Software Backend Engineer ",
  },
  {
    name: "Tida Nika",
    email: "tidagj@yahoo.com",
    position: "Junior  Developer",
  },
  {
    name: "Reni Brown",
    email: "renib@hotmail.com",
    position: "Full Stack",
  },
];

const interviewers = [
  {
    name: "Nicolas Marcora",
    email: "nicolasm@gmail.com",
    companyId: 1
  },
  {
    name: "Ed Putans",
    email: "edp@gmail.com",
    companyId: 2
  },
  {
    name: " Leo Lesi",
    email: "leol@hotmail.com",
    companyId: 3
  },
];

const interviews = [
  {
    applicantsId: 1,
    interviewersId: 1,
    date: "25.06.2023",
    successful: "yes"
  },
  {
    applicantsId: 1,
    interviewersId: 2,
    date: "04.06.2023",
    successful: "yes"
  },
  {
    applicantsId: 1,
    interviewersId: 3,
    date: "17.05.2023",
    successful: "no"
  },
  {
    applicantsId: 2,
    interviewersId: 2,
    date: "02.06.2023",
    successful: "yes"
  },
  {
    applicantsId: 2,
    interviewersId: 3,
    date: "06.10.2022",
    successful: "yes"
  },
  {
    applicantsId: 3,
    interviewersId: 3,
    date: "08.11.2022",
    successful: "no"
  },
  {
    applicantsId: 4,
    interviewersId: 1,
    date: "09.06.2023",
    successful: "yes"
  },
  {
    applicantsId: 4,
    interviewersId: 2,
    date: "25.12.2022",
    successful: "no"
  }
];

const companies = [
  {
    name: "Google",
    city: "Mountain View, CA",
  },
  {
    name: "Facebook",
    city: "Los Angeles",
  },
  {
    name: "Pixel Point Technology.",
    city: "New York",
  },
];

const employees = [
  {
    name: "Federick Bolan",
    email: "fed@gmail.com",
    position: "It Director",
    companyId: 1
  },
  {
    name: "Ernesta Hamph",
    email: "ernestah@gmail.com",
    position: "Assistent",
    companyId: 3
  },
  {
    name: "Armando Jane",
    email: "armandoj@hotmail.com",
    position: "Executive Director",
    companyId: 2
  },
  {
    name: "Elisabeta Sake",
    email: "elissake@hotmail.com",
    position: "Marketing Digital",
    companyId: 2
  },
];



const dropApplicantsTable = db.prepare(`
      DROP TABLE IF EXISTS applicants`);
dropApplicantsTable.run();

const createApplicantsTable = db.prepare(`
      CREATE TABLE IF NOT EXISTS applicants (
         id INTEGER,
         name TEXT NOT NULL,
         email TEXT NOT NULL,
         position TEXT NOT NULL,
         PRIMARY KEY (id)
      );
      `);
createApplicantsTable.run();

const createApplicant = db.prepare(`
      INSERT INTO applicants (name, email, position) VALUES (@name, @email, @position)`);

for (let applicant of applicants) {
  createApplicant.run(applicant);
}


 const dropInterviewersTable = db.prepare(`
 DROP TABLE IF EXISTS  interviewers`)
 dropInterviewersTable.run()

const createInterviewersTable = db.prepare(`
      CREATE TABLE IF NOT EXISTS interviewers(
          id INTEGER,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          companyId INTEGER NOT NULL,
          PRIMARY KEY (id)
  
      );
      `);

createInterviewersTable.run()

const creatInterviewer = db.prepare(`
       INSERT INTO interviewers (name, email,companyId) VALUES (@name, @email, @companyId)`);

for (let interviewer of interviewers) {
  creatInterviewer.run(interviewer);
}

const dropInterviewsTable = db.prepare(`
       DROP TABLE IF EXISTS interviews`);

dropInterviewsTable.run();

const createInterviewsTable = db.prepare(`
       CREATE TABLE IF NOT EXISTS interviews (
          id INTEGER,
          applicantsId INTEGER,
          interviewersId INTEGER,
          date TEXT NOT NULL,
          successful TEXT NOT NULL,
          PRIMARY KEY(id),
          FOREIGN KEY (applicantsId) REFERENCES applicants(id) ON DELETE CASCADE,
          FOREIGN KEY (interviewersId) REFERENCES interviewers(id) ON DELETE CASCADE
          
       )
       `);

createInterviewsTable.run();

const createInterview = db.prepare(`
       INSERT INTO interviews (applicantsId, interviewersId, date, successful) VALUES (@applicantsId, @interviewersId, @date, @successful)
       `);

for (let interview of interviews) {
  createInterview.run(interview);
}



const dropCompaniesTable = db.prepare(`
 DROP TABLE IF EXISTS companies 
`)
dropCompaniesTable.run()

const createCompaniesTable = db.prepare(`
CREATE TABLE IF NOT EXISTS companies (
    id INTEGER,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    PRIMARY KEY (id)
)`)

createCompaniesTable.run()

const createCompany = db.prepare(`
INSERT INTO companies (name, city) VALUES (@name, @city)`)

for(let company of companies){
    createCompany.run(company)
}

const dropEmployeesTable = db.prepare(`
DROP TABLE IF  EXISTS  employees`)
dropEmployeesTable.run()



const createEmployeesTable = db.prepare(`
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    position TEXT NOT NULL,
    companyId INTEGER NOT NULL,
    PRIMARY KEY (id)
)
`)
createEmployeesTable.run()

const createEmployee = db.prepare(`
INSERT INTO employees (name, email, position, companyId) VALUES (@name, @email, @position, @companyId)`)

for(let employee of employees){
    createEmployee.run(employee)
}