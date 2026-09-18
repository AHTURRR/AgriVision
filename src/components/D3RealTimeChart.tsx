import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { SensorTelemetry } from '../types';

interface Props {
  data: SensorTelemetry[];
  activeMetrics: {
    leafMoisture: boolean;
    lesionRisk: boolean;
    temp: boolean;
    light: boolean;
  };
}

export const D3RealTimeChart: React.FC<Props> = ({ data, activeMetrics }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<SensorTelemetry | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = Math.max(260, Math.min(360, width * 0.45));
    const margin = { top: 24, right: 28, bottom: 36, left: 44 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale based on time / index
    const xScale = d3
      .scaleLinear()
      .domain([0, Math.max(1, data.length - 1)])
      .range([0, innerWidth]);

    // Y scale (0 to 100% for moisture, risk, normalized metrics)
    const yScale = d3.scaleLinear().domain([0, 100]).nice().range([innerHeight, 0]);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-dasharray', '3,3');

    g.select('.grid .domain').remove();

    // Dangerous spore threshold zone (Moisture > 80%)
    g.append('rect')
      .attr('x', 0)
      .attr('y', yScale(100))
      .attr('width', innerWidth)
      .attr('height', yScale(80) - yScale(100))
      .attr('fill', 'rgba(239, 68, 68, 0.08)')
      .attr('rx', 4);

    g.append('text')
      .attr('x', innerWidth - 8)
      .attr('y', yScale(82))
      .attr('text-anchor', 'end')
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .attr('fill', '#dc2626')
      .text('Zona Kritis Infeksi Spora (>80%)');

    // Axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(Math.min(data.length, 6))
      .tickFormat((d) => {
        const idx = Math.round(Number(d));
        return data[idx]?.timestamp || '';
      });

    const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat((d) => `${d}%`);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .attr('font-size', '11px')
      .attr('fill', '#64748b')
      .attr('font-family', 'Plus Jakarta Sans');

    g.append('g')
      .call(yAxis)
      .selectAll('text')
      .attr('font-size', '11px')
      .attr('fill', '#64748b')
      .attr('font-family', 'Plus Jakarta Sans');

    // Metric Line Generators
    const linesToDraw = [
      {
        key: 'leafMoisture',
        enabled: activeMetrics.leafMoisture,
        color: '#16a34a',
        getValue: (d: SensorTelemetry) => d.leafMoisture,
        strokeWidth: 2.8,
      },
      {
        key: 'lesionRisk',
        enabled: activeMetrics.lesionRisk,
        color: '#dc2626',
        getValue: (d: SensorTelemetry) => d.lesionRiskScore,
        strokeWidth: 2.8,
      },
      {
        key: 'temp',
        enabled: activeMetrics.temp,
        color: '#d97706',
        getValue: (d: SensorTelemetry) => Math.min(100, Math.max(0, (d.ambientTemp / 45) * 100)),
        strokeWidth: 2,
        strokeDash: '4,2',
      },
      {
        key: 'light',
        enabled: activeMetrics.light,
        color: '#2563eb',
        getValue: (d: SensorTelemetry) => Math.min(100, Math.max(0, (d.lightIndexLux / 120) * 100)),
        strokeWidth: 2,
        strokeDash: '2,2',
      },
    ];

    linesToDraw.forEach((item) => {
      if (!item.enabled) return;

      const lineGen = d3
        .line<SensorTelemetry>()
        .x((_, i) => xScale(i))
        .y((d) => yScale(item.getValue(d)))
        .curve(d3.curveMonotoneX);

      // Path
      const path = g
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', item.color)
        .attr('stroke-width', item.strokeWidth)
        .attr('d', lineGen);

      if (item.strokeDash) {
        path.attr('stroke-dasharray', item.strokeDash);
      }

      // End point pulse marker
      if (data.length > 0) {
        const lastPoint = data[data.length - 1];
        const lastX = xScale(data.length - 1);
        const lastY = yScale(item.getValue(lastPoint));

        g.append('circle')
          .attr('cx', lastX)
          .attr('cy', lastY)
          .attr('r', 4.5)
          .attr('fill', item.color)
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 2);
      }
    });

    // Invisible overlay for crosshair hover inspection
    const overlay = g
      .append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('cursor', 'crosshair');

    const focusLine = g
      .append('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '3,3')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .style('opacity', 0);

    overlay
      .on('mousemove', function (event) {
        const [mx] = d3.pointer(event);
        const approxIdx = Math.round(xScale.invert(mx));
        const safeIdx = Math.max(0, Math.min(data.length - 1, approxIdx));
        const pt = data[safeIdx];
        if (pt) {
          focusLine.attr('x1', xScale(safeIdx)).attr('x2', xScale(safeIdx)).style('opacity', 1);
          setHoveredPoint(pt);
        }
      })
      .on('mouseleave', function () {
        focusLine.style('opacity', 0);
        setHoveredPoint(null);
      });
  }, [data, activeMetrics]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div ref={containerRef} className="w-full relative overflow-hidden bg-white rounded-xl p-2 sm:p-4 border border-slate-200 shadow-sm">
        <svg ref={svgRef} className="overflow-visible" />

        {hoveredPoint && (
          <div className="absolute top-3 left-12 bg-slate-900/90 text-white backdrop-blur-md rounded-lg px-3 py-2 text-xs shadow-lg flex flex-wrap items-center gap-3 z-20 pointer-events-none">
            <span className="font-bold text-emerald-400">⏱ {hoveredPoint.timestamp}</span>
            <span>Kelembaban: <strong className="text-emerald-300">{hoveredPoint.leafMoisture}%</strong></span>
            <span>Risiko Infeksi: <strong className="text-rose-300">{hoveredPoint.lesionRiskScore}%</strong></span>
            <span>Suhu: <strong className="text-amber-300">{hoveredPoint.ambientTemp.toFixed(1)}°C</strong></span>
            <span>Cahaya: <strong className="text-sky-300">{hoveredPoint.lightIndexLux} klux</strong></span>
          </div>
        )}
      </div>
    </div>
  );
};
