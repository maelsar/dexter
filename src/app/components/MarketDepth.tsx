import React from "react";

const buyData = [
  { price: 0.15, total: 1550, maxTotal: 18588.102460000002 },
  { price: 0.149, total: 1750, maxTotal: 18588.102460000002 },
  { price: 0.12, total: 3907.5959, maxTotal: 18588.102460000002 },
  { price: 0.11, total: 4207.5959, maxTotal: 18588.102460000002 },
  { price: 0.1, total: 18538.102460000002, maxTotal: 18588.102460000002 },
  { price: 0.08, total: 18588.102460000002, maxTotal: 18588.102460000002 },
];

const sellData = [
  { price: 0.2001, total: 1150, maxTotal: 1150 },
  { price: 0.20005, total: 1000, maxTotal: 1150 },
  { price: 0.20002, total: 600, maxTotal: 1150 },
  { price: 0.151, total: 400, maxTotal: 1150 },
  { price: 0.1505, total: 200, maxTotal: 1150 },
];

const NORMALIZATION_PERCENT = 5;

const getHighestTotal = () => {
  const buyMax = Math.max(...buyData.map((order) => order.total));
  const sellMax = Math.max(...sellData.map((order) => order.total));
  return Math.max(buyMax, sellMax);
};

const normalizeData = (data, normalizationValue) => {
  return data.map((order) => {
    const normalizedTotal = (order.total / normalizationValue) * 100;
    const normalizedValue =
      Math.round(normalizedTotal / NORMALIZATION_PERCENT) *
      NORMALIZATION_PERCENT;
    return { ...order, normalizedTotal: normalizedValue };
  });
};

export const MarketDepthChart = () => {
  const normalizationValue = getHighestTotal();
  const normalizedBuyData = normalizeData(
    buyData,
    normalizationValue
  ).reverse();
  const normalizedSellData = normalizeData(
    sellData,
    normalizationValue
  ).reverse();

  return (
    <div className="flex h-[150px] my-4">
      {normalizedBuyData.map((order, index) => {
        const leftHeight =
          index > 0 ? normalizedBuyData[index - 1].normalizedTotal : 0;
        const rightHeight =
          index < normalizedBuyData.length - 1
            ? normalizedBuyData[index + 1].normalizedTotal
            : 0;

        return (
          <div key={index} className="flex-1 relative">
            <div
              style={{ height: `${order.normalizedTotal}%` }}
              className="absolute bottom-0 w-full border-t-2 border-green-500"
            ></div>
            {index !== 0 && order.normalizedTotal > leftHeight && (
              <div
                style={{
                  height: `${order.normalizedTotal - leftHeight}%`,
                  bottom: `${leftHeight}%`,
                }}
                className="absolute left-0 w-px bg-green-500"
              ></div>
            )}
            {order.normalizedTotal > rightHeight && (
              <div
                style={{
                  height: `${order.normalizedTotal - rightHeight}%`,
                  bottom: `${rightHeight}%`,
                }}
                className="absolute right-0 w-px bg-green-500"
              ></div>
            )}
          </div>
        );
      })}
      <div className="flex-1 text-center font-bold flex items-center justify-center relative">
        <div className="absolute bottom-0 left-0 w-1/2 border-b-2 border-green-500"></div>
        <div className="absolute bottom-0 right-0 w-1/2 border-b-2 border-red-500"></div>
        0.15
      </div>
      {normalizedSellData.map((order, index) => {
        const leftHeight =
          index > 0 ? normalizedSellData[index - 1].normalizedTotal : 0;
        const rightHeight =
          index < normalizedSellData.length - 1
            ? normalizedSellData[index + 1].normalizedTotal
            : 0;

        return (
          <div key={index} className="flex-1 relative">
            <div
              style={{ height: `${order.normalizedTotal}%` }}
              className="absolute bottom-0 w-full border-t-2 border-red-500"
            ></div>
            {order.normalizedTotal > leftHeight && (
              <div
                style={{
                  height: `${order.normalizedTotal - leftHeight}%`,
                  bottom: `${leftHeight}%`,
                }}
                className="absolute left-0 w-px bg-red-500"
              ></div>
            )}
            {index !== normalizedSellData.length - 1 &&
              order.normalizedTotal > rightHeight && (
                <div
                  style={{
                    height: `${order.normalizedTotal - rightHeight}%`,
                    bottom: `${rightHeight}%`,
                  }}
                  className="absolute right-0 w-px bg-red-500"
                ></div>
              )}
          </div>
        );
      })}
    </div>
  );
};
