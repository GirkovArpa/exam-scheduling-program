'use strict';

const shuffle = function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
/*
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

shuffle(data);
*/

function schedule(data, dayCount) {
  console.log(data);
  shuffle(data);

  const days = new Array(dayCount); for (let i = 0; i < days.length; i++) days[i] = [];

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

  for (const student of Object.values(students)) {
    student.subjects = student.subjects.sort();
    student.subjects = student.subjects.sort((a, b) => {
      return (subjects[a].students.length < subjects[b].students.length) ? 1 : (subjects[a].students.length === subjects[b].students.length) ? ((subjects[a].subject > subjects[b].subject) ? 1 : -1) : -1;
    });
  }

  for (let i = 0; i < days.length; i++) {
    for (const student of Object.values(students)) {
      if (student.tired) {
        student.tired = false;
        if ((days.length - i) > student.subjects.length) continue;
      }
      for (const subject of student.subjects) {
        days[i].push({ number: student.number, subject });
        student.subjects.shift();
        student.tired = true;
        break;
      }
    }
  }

  console.log('days: ', days);

  for (let i = days.length - 1; i != -1; i--) {
    const day = days[i];
    if (!day.length) addRow(days.indexOf(day) + 1, '', '');
    for (const student of day) {
      addRow(days.indexOf(day) + 1, student.number, student.subject);
    }
  }
}

function addRow(day, no, subj) {
  const table = document.getElementById('table');
  const rowCount = table.tBodies[0].rows.length;
  const row = table.insertRow(rowCount + 1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  cell1.innerHTML = day;
  cell2.innerHTML = no;
  cell3.innerHTML = subj;
}