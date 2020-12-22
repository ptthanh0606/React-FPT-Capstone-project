export function transformToGrid(data, currentId, isLecturer) {
  const cellProp = {
    className: 'text-nowrap py-2 px-5 text-dark',
  };
  const headerProp = {
    className:
      'text-nowrap py-2 px-5 font-weight-bolder bg-gray-500 text-white',
  };
  const headerStudentProp = {
    className:
      'text-nowrap py-2 px-5 font-weight-bolder bg-gray-500 text-white',
  };
  const final = [];
  const header = [
    {
      value: 'Mark columns',
      readOnly: true,
      ...headerProp,
    },
    {
      value: 'weight',
      readOnly: true,
      ...headerProp,
    },
    {
      value: 'Evaluators',
      readOnly: true,
      ...headerProp,
    },
    {
      value: 'Evaluator weight',
      readOnly: true,
      ...headerProp,
    },
    ...data.students.map(i => ({
      value: '[' + i.code + '] ' + i.name,
      readOnly: true,
      colSpan: 2,
      id: i.id,
      ...headerStudentProp,
    })),
    {
      value: 'Team',
      readOnly: true,
      ...headerStudentProp,
    },
  ];

  for (const z of data.checkpoints) {
    // z = current checkpoints
    const grid = [header];

    for (const i of z.markColumns) {
      // i = current column

      const firstEvaluator = z.council.members[0] || {
        id: -1,
        code: '',
        weight: '',
      };
      const evaluatorNum = z.council.members.length || 1;
      const toPush = [
        {
          value: i.name,
          readOnly: true,
          rowSpan: evaluatorNum,
          ...cellProp,
        },
        {
          value: i.weight,
          readOnly: true,
          rowSpan: evaluatorNum,
          ...cellProp,
        },
        {
          value: firstEvaluator?.code,
          readOnly: true,
          width: '200px',
          ...cellProp,
        },
        {
          value: firstEvaluator?.weight,
          readOnly: true,
          width: '50px',
          ...cellProp,
        },
      ];

      for (const j of data.students) {
        // j = current student
        let isReadOnly = false;

        if (isLecturer) {
          if (currentId !== firstEvaluator?.id) {
            isReadOnly = true;
          }
        }

        console.log(isReadOnly);

        toPush.push(
          {
            value: i.marks
              ?.find(e => e.studentId === j.id)
              ?.lecturers?.find(e => e.id === firstEvaluator?.id)?.value,
            studentId: j.id,
            lecturerId: firstEvaluator?.id,
            markColumnId: i.id,
            evaluationId: z.evaluationId,
            readOnly: isReadOnly,
            ...cellProp,
          },
          {
            value: i.marks?.find(e => e.studentId === j.id)?.totalColumnStudent,
            rowSpan: evaluatorNum,
            readOnly: true,
            ...cellProp,
          }
        );
      }

      toPush.push({
        value: i.totalColumnTeam,
        rowSpan: evaluatorNum,
        readOnly: true,
        ...cellProp,
      });

      grid.push(toPush);

      for (const k of z.council.members.slice(1)) {
        // k: current council members
        grid.push([
          { value: k.code, readOnly: true, ...cellProp },
          { value: k.weight, readOnly: true, ...cellProp },
          ...data.students.map(x => ({
            value: i.marks
              ?.find(t => t.studentId === x.id)
              ?.lecturers?.find(t => t.id === k.id)?.value,
            studentId: x.id,
            lecturerId: k.id,
            markColumnId: i.id,
            evaluationId: z.evaluationId,
            readOnly: currentId !== k.id,
            ...cellProp,
          })),
        ]);
      }
    }

    grid.push([
      { value: 'Total', colSpan: 4, readOnly: true, ...cellProp },
      ...data.students?.map(x => ({
        value: z?.totalCheckpointStudent?.find(y => y.studentId === x.id)
          ?.value,
        colSpan: 2,
        readOnly: true,
        ...cellProp,
      })),
      { value: z.totalTeam, readOnly: true, ...cellProp },
    ]);

    final.push({
      id: z.id,
      name: z.name,
      weight: z.weight,
      submitDueDate: z.submitDueDate,
      evaluateDueDate: z.evaluateDueDate,
      council: z.council,
      status: z.status,
      grid,
    });
  }

  return final;
}

export function transformToData(data) {
  const marks = [];
  for (const k of data) {
    for (const i of k.grid) {
      for (const j of i) {
        if (j.readOnly !== true && j.value !== undefined && j.value !== null)
          marks.push(j);
      }
    }
  }
  return marks;
}
