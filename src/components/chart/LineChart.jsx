import React from 'react';
import { LinePath } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { AXIS_COLOR, AXIS_BOTTOM_TICK_LABEL_PROPS, AXIS_LEFT_TICK_LABEL_PROPS } from './constants';

const LineChart = ({
  data,
  width,
  yMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  stroke,
  top,
  left,
  yTickFormat,
  children
}) => {
  if (!data) return null;

  const getDate = (d) => new Date(d?.date);
  const getStockValue = (d) => d?.price;

  return (
    <Group left={left || margin.left} top={top || margin.top} className="text-3xl">
      <LinePath
        data={data}
        x={(d) => xScale(getDate(d)) || 0}
        y={(d) => yScale(getStockValue(d)) || 0}
        strokeWidth={1.5}
        stroke={stroke}
      />
      {!hideBottomAxis && (
        <AxisBottom
          top={yMax + margin.top}
          scale={xScale}
          numTicks={width > 520 ? 10 : 5}
          stroke={AXIS_COLOR}
          tickStroke={AXIS_COLOR}
          tickLabelProps={() => AXIS_BOTTOM_TICK_LABEL_PROPS}
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          numTicks={5}
          stroke={AXIS_COLOR}
          tickStroke={AXIS_COLOR}
          tickLabelProps={() => AXIS_LEFT_TICK_LABEL_PROPS}
          tickFormat={(d) => (yTickFormat ? yTickFormat(d) : d)}
        />
      )}
      {children}
    </Group>
  );
};

export default LineChart;
