'use strict';

const data = [
  { No: 1234567, Subj: 'ACCY' },
  { No: 1234567, Subj: 'ECON' },
  { No: 1234567, Subj: 'STAT' },
  { No: 1234568, Subj: 'ACCY' },
  { No: 1234568, Subj: 'ECON' },
  { No: 1234568, Subj: 'PHY' },
  { No: 1234568, Subj: 'FIN' },
  { No: 1234569, Subj: 'ACCY' },
  { No: 1234569, Subj: 'ECON' }
];

const students = {};
for (const datum of data) {
  if (!students[datum.No]) students[datum.No] = { number: datum.No, subjects: [] };
  students[datum.No].subjects.push(datum.Subj);
}

const subjects = {};
for (const datum of data) {
  if (!subjects[datum.Subj]) subjects[datum.Subj] = { subject: datum.Subj, students: [] };
  subjects[datum.Subj].students.push(datum.No);
}

console.log(students);

const days = new Array(9); for (let i = 0; i < days.length; i++) days[i] = [];

for (let i = 0; i < days.length; i++) {
  for (const student of Object.values(students)) {
    for (const subject of student.subjects) {
      days[i].push({ number: student.number, subject });
      student.subjects.shift();
      break;
    }
  }
}

console.log(days);