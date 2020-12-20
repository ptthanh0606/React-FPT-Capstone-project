export function transformToGrid(data) {
  const final = [];
  const header = [
    { value: '', readOnly: true, colSpan: 4 },
    ...data.students.map(i => ({
      value: '[' + i.code + '] ' + i.name,
      readOnly: true,
      colSpan: 2,
      id: i.id,
    })),
    { value: 'Team', readOnly: true },
  ];

  for (const z of data.checkpoints) {
    // z = current checkpoints
    const grid = [header];

    for (const i of z.markColumns) {
      // i = current column

      const firstEvaluator = z.council.members[0];
      const evaluatorNum = z.council.members.length;
      const toPush = [
        { value: i.name, readOnly: true, rowSpan: evaluatorNum },
        {
          value: i.weight,
          readOnly: true,
          rowSpan: evaluatorNum,
        },
        { value: firstEvaluator.code, readOnly: true },
        { value: firstEvaluator.weight, readOnly: true },
      ];

      for (const j of data.students) {
        // j = current student
        toPush.push(
          {
            value: i.marks
              ?.find(e => e.studentId === j.id)
              ?.lecturers?.find(e => e.id === z.council.members[0].id)?.value,
            studentId: j.id,
            lecturerId: z.council.members[0].id,
            markColumnId: i.id,
            evaluationId: z.id,
          },
          {
            value: i.marks?.find(e => e.studentId === j.id)?.totalColumnStudent,
            rowSpan: z.council.members.length,
            readOnly: true,
          }
        );
      }

      toPush.push({
        value: i.totalColumnTeam,
        rowSpan: z.council.members.length,
        readOnly: true,
      });

      grid.push(toPush);

      for (const k of z.council.members.slice(1)) {
        // k: current council members
        grid.push([
          { value: k.code, readOnly: true },
          { value: k.weight, readOnly: true },
          ...data.students.map(x => {
            return {
              value: i.marks
                ?.find(t => t.studentId === x.id)
                ?.lecturers?.find(t => t.id === k.id)?.value,
              studentId: x.id,
              lecturerId: k.id,
              markColumnId: i.id,
              evaluationId: z.id,
            };
          }),
        ]);
      }
    }

    grid.push([
      { value: 'Total', colSpan: 4, readOnly: true },
      ...data.students?.map(x => ({
        value: z?.totalCheckpointStudent?.find(y => y.studentId === x.id)
          ?.value,
        colSpan: 2,
        readOnly: true,
      })),
      { value: z.totalTeam, readOnly: true },
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

  console.log(final);

  return final;
}

export function transformToData(data) {
  const marks = [];
  for (const k of data) {
    for (const i of k.grid) {
      for (const j of i) {
        if (j.readOnly !== true && j.value) marks.push(j);
      }
    }
  }
  return marks;
}
