export const chartOptions = {
  series: [76],
  chart: {
    type: 'radialBar',
    offsetY: -20,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '80%',
      },
      startAngle: -90,
      endAngle: 90,
      track: {
        background: '#e7e7e7',
        strokeWidth: '100%',
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: -2,
          fontSize: '24px',
        },
      },
      colors: {
        backgroundBarRadius: 30,
      },
    },
  },
  labels: ['Average Results'],
};
