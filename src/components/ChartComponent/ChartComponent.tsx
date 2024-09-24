import React from 'react';
import {
  Chart,
  GoogleChartOptions,
  GoogleChartWrapperChartType,
} from 'react-google-charts';

interface ChartProps {
  chartType: GoogleChartWrapperChartType;
  data: any;
  options: GoogleChartOptions;
  height?: string;
  width?: string;
  title: string;
}

const ChartComponent: React.FC<ChartProps> = ({
  data,
  options,
  height = '400px',
  width = '100%',
  chartType,
  title,
}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <h2>{title}</h2>
      <Chart
        chartType={chartType}
        width={width}
        height={height}
        data={data}
        options={options}
      />
    </div>
  );
};

export default ChartComponent;
