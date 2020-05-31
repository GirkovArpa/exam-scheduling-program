'use strict';



const data = `No. Subj 1234567 ACCY 1234567 ECON 1234567 STAT 1234568 ACCY 1234568 ECON 1234568 PHY 1234568 FIN 1234569 ACCY 1234569 ECON`
  .split(' ');

const output = [];
for (let i = 2; i < data.length; i++) {
  const No = data[i];
  const Subj = data[++i];
  const student = { No, Subj };
  output.push(student);
}
console.log(output);