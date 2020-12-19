import React from 'react';

export const transformToGrid = function (
  data,
  currentUserId = '',
  isStudentView = false
) {
  const final = [];

  for (const checkpoint of data.checkpoints) {
    let header = [];

    header = [{ value: '', readOnly: true }];
    const grid = [];

    for (const markCol of checkpoint.markColumns) {
      header.push({
        value: <>{markCol.name}</>,
        colSpan: checkpoint.council.members.length,
        readOnly: true,
      });
    }
    header.push({
      value: '',
      readOnly: true,
    });
    grid.push(header);

    // Push evaluators row
    const numberOfCol = checkpoint.markColumns.length;
    const evaluatorRow = [];
    evaluatorRow.push({
      value: '',
      readOnly: true,
    });
    for (let i = 0; i < numberOfCol; i++) {
      evaluatorRow.push(
        ...checkpoint.council.members.map(mem => ({
          value: mem.code,
          readOnly: true,
          colSpan: 1,
          id: i,
        }))
      );
    }
    evaluatorRow.push({
      value: 'Total of student',
      readOnly: true,
    });
    grid.push(evaluatorRow);

    // Push students row
    for (const student of data.students) {
      let studentRow = [];
      studentRow.push({
        value: student.code,
        readOnly: true,
      });
      for (let i = 0; i < evaluatorRow.length - 2; i++) {
        let isUserNotEvaluator = false;
        let studentMark = 0;
        for (let j = 0; j < numberOfCol; j++) {
          studentMark = checkpoint.markColumns[j].marks.find(
            mark => mark.studentId === student.id
          ).totalColumnStudent;

          isUserNotEvaluator = !checkpoint.markColumns[j].marks.some(mark =>
            mark.lecturers.some(lec => {
              return lec.id === currentUserId;
            })
          );
        }

        studentRow.push({
          value: studentMark,
          readOnly: !isStudentView ? isUserNotEvaluator : true,
        });
      }
      studentRow.push({
        // value: checkpoint.totalCheckpointStudent[student.id],
        value: 'Pending',
        readOnly: true,
      });
      grid.push(studentRow);

      let totalStudentRow = [];
      totalStudentRow.push({
        value: 'Total',
        readOnly: true,
      });
      for (let i = 0; i < numberOfCol; i++) {
        totalStudentRow.push({
          value: 0,
          readOnly: true,
          colSpan: checkpoint.council.members.length,
        });
      }
      totalStudentRow.push({
        value: '',
        readOnly: true,
      });

      grid.push(totalStudentRow);

      grid.push([
        {
          value: '',
          colSpan: evaluatorRow.length,
          readOnly: true,
        },
      ]);
    }

    // Push team row
    let teamRow = [];
    teamRow.push({
      value: 'Team total',
      readOnly: true,
    });
    for (let i = 0; i < numberOfCol; i++) {
      teamRow.push({
        value: 0,
        readOnly: true,
        colSpan: checkpoint.council.members.length,
      });
    }
    teamRow.push({
      value: 'Pending',
      readOnly: true,
    });
    grid.push(teamRow);

    final.push({
      id: checkpoint.id,
      name: checkpoint.name,
      weight: checkpoint.weight,
      submitDueDate: checkpoint.submitDueDate,
      evaluateDueDate: checkpoint.evaluateDueDate,
      council: checkpoint.council,
      status: checkpoint.status,
      grid,
    });
  }

  console.log(final);

  return final;
};

export const transformToData = function (data) {
  const marks = [];
  for (const k of data) {
    for (const i of k.grid) {
      for (const j of i) {
        if (j.readOnly !== true && j.value) marks.push(j);
      }
    }
  }
  return marks;
};
