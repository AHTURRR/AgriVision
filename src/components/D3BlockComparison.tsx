import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface BlockData {
  blockName: string;
  healthScore: number;
  infectedPercent: number;
  treatedPercent: number;
}

interface Props {
  data: BlockData[];
}

export const D3BlockComparison: React.FC<Props> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = 220;
    const margin = { top: 20, right: 16, bottom: 30, left: 36 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%');

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x0 = d3
      .scaleBand()
      .domain(data.map((d) => d.blockName))
      .rangeRound([0, innerWidth])
      .paddingInner(0.25);

    const keys = ['healthScore', 'infectedPercent'] as const;
    const keyLabels = { healthScore: 'Indeks Kesehatan', infectedPercent: 'Tingkat Gejala' };
    const colors = { healthScore: '#16a34a', infectedPercent: '#ef4444' };

    const x1 = d3
      .scaleBand()
      .domain(keys)
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear().domain([0, 100]).nice().rangeRound([innerHeight, 0]);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(y)
          .ticks(4)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#f1f5f9');

    g.select('.grid .domain').remove();

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x0))
      .selectAll('text')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('fill', '#334155');

    g.append('g')
      .call(d3.axisLeft(y).ticks(4).tickFormat((d) => `${d}%`))
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('fill', '#64748b');

    // Bars
    const blockGroups = g
      .selectAll('.block-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'block-group')
      .attr('transform', (d) => `translate(${x0(d.blockName)},0)`);

    keys.forEach((key) => {
      blockGroups
        .append('rect')
        .attr('x', x1(key) || 0)
        .attr('y', (d) => y(d[key]))
        .attr('width', x1.bandwidth())
        .attr('height', (d) => innerHeight - y(d[key]))
        .attr('fill', colors[key])
        .attr('rx', 3);

      blockGroups
        .append('text')
        .attr('x', (x1(key) || 0) + x1.bandwidth() / 2)
        .attr('y', (d) => y(d[key]) - 4)
        .attr('text-anchor', 'middle')
        .attr('font-size', '9px')
        .attr('font-weight', 'bold')
        .attr('fill', colors[key])
        .text((d) => `${d[key]}%`);
    });
  }, [data]);

  return (
    <div ref={containerRef} className="w-full bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Perbandingan Kondisi Antar Blok</h4>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-emerald-700">
            <span className="w-2.5 h-2.5 rounded bg-emerald-600"></span> Kesehatan
          </span>
          <span className="flex items-center gap-1 text-rose-700">
            <span className="w-2.5 h-2.5 rounded bg-rose-500"></span> Gejala Hama
          </span>
        </div>
      </div>
      <svg ref={svgRef} className="overflow-visible" />
    </div>
  );
};
