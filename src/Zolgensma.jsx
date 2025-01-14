import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";

const ZolgensmaSankey = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 50, bottom: 40, left: 50 };

    svg.attr("width", width).attr("height", height);

    const colorScale = d3
      .scaleOrdinal()
      .domain(["Initial Diagnosis", "Referral to Specialist", "Genetic Testing", "Diagnosis Confirmation"])
      .range(["#FF8C00", "#FF6347", "#98C5E6", "#45B7D1"]);

    const data = {
      nodes: [
        { id: "initial_diagnosis", name: "Initial Diagnosis", x: 0 },
        { id: "referral_to_specialist", name: "Referral to Specialist", x: 1 },
        { id: "genetic_testing", name: "Genetic Testing", x: 2 },
        { id: "diagnosis_confirmation", name: "Diagnosis Confirmation", x: 3 }
      ],
      links: [
        { source: "initial_diagnosis", target: "referral_to_specialist", value: 70 },
        { source: "referral_to_specialist", target: "genetic_testing", value: 50 },
        { source: "genetic_testing", target: "diagnosis_confirmation", value: 40 }
      ]
    };

    const sankeyGenerator = sankey()
      .nodeId(d => d.id)
      .nodeWidth(30)
      .nodePadding(20)
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]]);

    const { nodes, links } = sankeyGenerator(data);

    // Create gradient for link
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "linkGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", nodes[0].x1)
      .attr("x2", nodes[nodes.length - 1].x0);

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", colorScale("Initial Diagnosis"));

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", colorScale("Diagnosis Confirmation"));

    // Draw links
    svg.append("g")
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", sankeyLinkHorizontal())
      .attr("fill", "none")
      .attr("stroke", "url(#linkGradient)")
      .attr("stroke-opacity", 0.5)
      .attr("stroke-width", d => Math.max(1, d.width));

    // Draw nodes
    const node = svg.append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    // Add rectangles for nodes
    node.append("rect")
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("fill", d => colorScale(d.name))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("rx", 4)
      .attr("ry", 4)
      .on("mouseover", function() {
        d3.select(this)
          .attr("stroke", "#000")
          .attr("stroke-width", 3)
          .attr("opacity", 0.8);
      })
      .on("mouseout", function() {
        d3.select(this)
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .attr("opacity", 1);
      });

    // Add labels
    node.append("text")
      .attr("x", d => (d.x1 - d.x0) / 2)
      .attr("y", d => (d.y1 - d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(d => `${d.name}: ${d.value}%`)
      .attr("fill", "#000")
      .style("font-size", "12px")
      .style("font-weight", "bold");

    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("SMA Referral Process");

  }, []);

  return <svg ref={svgRef}></svg>;
};

export default ZolgensmaSankey;
