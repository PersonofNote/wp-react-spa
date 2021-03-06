import React from 'react';
import Header from '../components/Header.js';
import D3BarChart from '../components/D3BarChart.js';
//Practice using hooks; may be better wrapped into the chart class itself
import { useState, useEffect } from 'react';

//For testing only; with more time, would consider how to build blocks from which to get data to construct a chart based on editor input
var data = [{label: 'a', value: 4, color: '#F8B195' }, {label: 'b', value: 8, color: '#F67280'}, 
  {label: 'c', value: 15, color: '#C06684'},{label: 'd', value: 2, color: '#6C5B7B'}];

// Hook
function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

function calculateSVGWidth(size) {
 return size.width > 1025 ? 800 : size.width;
}

// Height is different depending on if screen is taller than wide.
// TODO: Dial in proportions more
function calculateSVGHeight(size) {
  return size.height > size.width ? size.height * 0.5 : size.height * 0.8 ;
 }


export default function GraphPage() {
  const size = useWindowSize();
  const svgWidth = calculateSVGWidth(size);
  const svgHeight = calculateSVGHeight(size);
  return (
    <div className="content">
        <Header title="Graph Page"/>
        <div>
        </div>
        <D3BarChart height={svgHeight} width={svgWidth} data={data} />
    </div>
  )
}
			