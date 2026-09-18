import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export interface DiseaseStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
  category: string;
}

interface Props {
  stats: DiseaseStat[];
  title?: string;
}

export const D3DiseaseDonut: React.FC<Props> = ({ stats, title = 'Distribusi Diagnosis Hama & Jamur' }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedStat, setSelectedStat] = useState<DiseaseStat | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || stats.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = Math.min(260, width);
    const radius = Math.min(width, height) / 2 - 16;
    const innerRadius = radius * 0.62;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%');

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3
      .pie<DiseaseStat>()
      .value((d) => d.count)
      .sort(null)
      .padAngle(0.03);

    const arc = d3
      .arc<d3.PieArcDatum<DiseaseStat>>()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .cornerRadius(4);

    const arcHover = d3
      .arc<d3.PieArcDatum<DiseaseStat>>()
      .innerRadius(innerRadius - 2)
      .outerRadius(radius + 6)
      .cornerRadius(6);

    const arcs = g
      .selectAll('.arc')
      .data(pie(stats))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('cursor', 'pointer');

    arcs
      .append('path')
      .attr('d', arc as any)
      .attr('fill', (d) => d.data.color)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .on('mouseenter', function (_, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arcHover as any);
        setSelectedStat(d.data);
      })
      .on('mouseleave', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arc as any);
      });

    // Center display
    const centerGroup = g.append('g').attr('text-anchor', 'middle');

    const total = d3.sum(stats, (d) => d.count);

    centerGroup
      .append('text')
      .attr('y', -6)
      .attr('font-size', '22px')
      .attr('font-weight', '700')
      .attr('fill', '#14532d')
      .text(selectedStat ? `${selectedStat.count}` : `${total}`);

    centerGroup
      .append('text')
      .attr('y', 14)
      .attr('font-size', '10px')
      .attr('fill', '#64748b')
      .attr('font-weight', '600')
      .text(selectedStat ? `${selectedStat.percentage}%` : 'Total Kasus');
  }, [stats, selectedStat]);

  return (
    <div ref={containerRef} className="w-full bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col items-center">
      <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 self-start">{title}</h4>
      <div className="w-full flex flex-col sm:flex-row items-center justify-around gap-4">
        <div className="w-48 h-48 flex items-center justify-center">
          <svg ref={svgRef} className="overflow-visible" />
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          {stats.map((s, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setSelectedStat(s)}
              onMouseLeave={() => setSelectedStat(null)}
              className="flex items-center justify-between sm:justify-start gap-3 px-2 py-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }}></span>
                <span className="text-xs font-semibold text-slate-800">{s.name}</span>
              </div>
              <span className="text-xs font-bold text-slate-500">{s.count} ({s.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
