import React, { useEffect, useRef } from 'react';
import './Forex.scss';

const ForexChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dataPoints = 100; 
    const priceRange = 50;  
    const margin = 40;      

    let bidPrice = 0;
    let askPrice = 0;

    const generateData = () => {
      const data = [];
      let currentPrice = 100; 

      for (let i = 0; i < dataPoints; i++) {
        const priceChange = Math.random() * priceRange - priceRange / 2;
        currentPrice += priceChange;
        data.push(currentPrice);
      }

      return data;
    };

    const updateBidAskPrices = () => {
      bidPrice += Math.random() * 2 - 1;
      askPrice += Math.random() * 2 - 1;
    };

    const drawGraph = (data) => {
      const minValue = Math.min(...data);
      const maxValue = Math.max(...data);
      const valueRange = maxValue - minValue;
      const step = (canvas.width - 2 * margin) / (dataPoints - 1);
      const priceStep = valueRange / 10;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'grey';
      ctx.lineWidth = 0.5;

      for (let i = 0; i <= 10; i++) {
        const y = margin + i * (canvas.height - 2 * margin) / 10;
        ctx.beginPath();
        ctx.moveTo(margin, y);
        ctx.lineTo(canvas.width - margin, y);
        ctx.stroke();

        const price = maxValue - i * priceStep;
        ctx.fillStyle = '#333';
        ctx.fillText(price.toFixed(2), canvas.width - margin + 5, y + 5);
      }

      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'green';
      ctx.beginPath();
      ctx.moveTo(margin, canvas.height - (bidPrice - minValue) / valueRange * (canvas.height - 2 * margin));
      ctx.lineTo(canvas.width - margin, canvas.height - (bidPrice - minValue) / valueRange * (canvas.height - 2 * margin));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(margin, canvas.height - (askPrice - minValue) / valueRange * (canvas.height - 2 * margin));
      ctx.lineTo(canvas.width - margin, canvas.height - (askPrice - minValue) / valueRange * (canvas.height - 2 * margin));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      ctx.moveTo(margin, canvas.height - (data[0] - minValue) / valueRange * (canvas.height - 2 * margin));

      for (let i = 1; i < data.length; i++) {
        const x = margin + i * step;
        const y = canvas.height - (data[i] - minValue) / valueRange * (canvas.height - 2 * margin);
        ctx.lineTo(x, y);
      }

      ctx.stroke();

      const open = data[0].toFixed(2);
      const close = data[data.length - 1].toFixed(2);
      const high = Math.max(...data).toFixed(2);
      const low = Math.min(...data).toFixed(2);

      ctx.fillStyle = '#333';
      ctx.fillText(`OHLC: ${open} / ${high} / ${low} / ${close}`, margin + 5, margin + 20);
      ctx.fillText('Jump Index 25, M5', margin + 5, margin + 40);
    };

    const simulateForex = () => {
      const forexData = generateData();
      updateBidAskPrices();
      drawGraph(forexData);

      setTimeout(simulateForex, 2000);
    };

    simulateForex();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="400"
      className="forex-chart-canvas" 
    ></canvas>
  );
};

export default ForexChart;
