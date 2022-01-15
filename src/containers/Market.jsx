import { useState, useMemo } from 'react';
import PrimaryChart from '../components/chart/PrimaryChart';
import useAxios from 'axios-hooks';
import { Loader } from '../components';
import { useWindowSize } from '../hooks/useWindowSize';
import { IntervalFilterButtons } from '../components/chart/IntervalFilterButtons';
import { INTERVAL_FILTERS } from '../components/chart/constants';

const Market = () => {
  const [timeFilter, setTimeFilter] = useState(INTERVAL_FILTERS['7D']);
  const MARKET_CHART_ID = 'ethereum';
  const [windowWidth] = useWindowSize();

  const [{ data, loading, error }] = useAxios({
    url: `https://api.coingecko.com/api/v3/coins/${MARKET_CHART_ID}/market_chart?vs_currency=usd&days=${timeFilter}`,
    method: 'GET'
  });

  const mappedData = useMemo(() => {
    return data?.prices
      ? data.prices.map((ele) => ({
          date: new Date(ele[0]),
          price: ele[1]
        }))
      : [];
  }, [data]);

  const ViewChart = mappedData?.length && !loading && (
    <PrimaryChart
      data={mappedData}
      height={500}
      width={windowWidth < 1000 ? 900 : windowWidth}
      margin={{
        top: 32,
        right: 200,
        bottom: 60,
        left: 68
      }}
    />
  );
  const ViewLoader = loading && <Loader />;
  const ViewError = error && (
    <p className="text-red-500 font-semibold py-12 px-1 sm:p-12">
      Couldn't find data for the chart...
    </p>
  );

  return (
    <div style={{ backgroundColor: '#0F0E13', minHeight: 700 }} className="p-1 sm:p-12" id="graph">
      <div className="flex w-full justify-center items-center 2xl:px-20">
        <div className="flex flex-col md:p-12 py-12 px-4">
          <h3 className="text-white text-3xl text-center my-2">
            Check the latest Ethereum USD (ETH-USD) price quote
          </h3>
        </div>
      </div>
      <IntervalFilterButtons
        onChange={(v) => setTimeFilter(v || timeFilter)}
        initialFiltersValue={timeFilter}
      />
      {ViewChart}
      {ViewLoader}
      {ViewError}
    </div>
  );
};

export default Market;
