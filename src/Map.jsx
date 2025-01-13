import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const StateHealthcareMap = () => {
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
  const [tooltipContent, setTooltipContent] = useState("");

  // Sample healthcare data for each state (you can replace with actual data)
  const healthcareData = {
    "01": { abbr: "AL", patients: 127, hcps: 45, adoptionRate: 68 },
    "02": { abbr: "AK", patients: 25, hcps: 12, adoptionRate: 55 },
    "04": { abbr: "AZ", patients: 192, hcps: 83, adoptionRate: 72 },
    "05": { abbr: "AR", patients: 95, hcps: 37, adoptionRate: 65 },
    "06": { abbr: "CA", patients: 873, hcps: 264, adoptionRate: 82 },
    "08": { abbr: "CO", patients: 177, hcps: 67, adoptionRate: 75 },
    "09": { abbr: "CT", patients: 128, hcps: 51, adoptionRate: 73 },
    "10": { abbr: "DE", patients: 31, hcps: 16, adoptionRate: 69 },
    "11": { abbr: "DC", patients: 24, hcps: 15, adoptionRate: 71 },
    "12": { abbr: "FL", patients: 640, hcps: 221, adoptionRate: 78 },
    "13": { abbr: "GA", patients: 274, hcps: 95, adoptionRate: 74 },
    "15": { abbr: "HI", patients: 54, hcps: 21, adoptionRate: 62 },
    "16": { abbr: "ID", patients: 58, hcps: 28, adoptionRate: 67 },
    "17": { abbr: "IL", patients: 391, hcps: 136, adoptionRate: 76 },
    "18": { abbr: "IN", patients: 247, hcps: 83, adoptionRate: 71 },
    "19": { abbr: "IA", patients: 143, hcps: 56, adoptionRate: 69 },
    "20": { abbr: "KS", patients: 129, hcps: 47, adoptionRate: 66 },
    "21": { abbr: "KY", patients: 167, hcps: 62, adoptionRate: 68 },
    "22": { abbr: "LA", patients: 186, hcps: 73, adoptionRate: 64 },
    "23": { abbr: "ME", patients: 62, hcps: 24, adoptionRate: 70 },
    "24": { abbr: "MD", patients: 245, hcps: 92, adoptionRate: 74 },
    "25": { abbr: "MA", patients: 293, hcps: 104, adoptionRate: 80 },
    "26": { abbr: "MI", patients: 373, hcps: 135, adoptionRate: 75 },
    "27": { abbr: "MN", patients: 206, hcps: 78, adoptionRate: 76 },
    "28": { abbr: "MS", patients: 104, hcps: 38, adoptionRate: 63 },
    "29": { abbr: "MO", patients: 234, hcps: 88, adoptionRate: 70 },
    "30": { abbr: "MT", patients: 48, hcps: 19, adoptionRate: 61 },
    "31": { abbr: "NE", patients: 83, hcps: 34, adoptionRate: 67 },
    "32": { abbr: "NV", patients: 153, hcps: 58, adoptionRate: 71 },
    "33": { abbr: "NH", patients: 57, hcps: 23, adoptionRate: 74 },
    "34": { abbr: "NJ", patients: 382, hcps: 138, adoptionRate: 77 },
    "35": { abbr: "NM", patients: 88, hcps: 32, adoptionRate: 68 },
    "36": { abbr: "NY", patients: 672, hcps: 241, adoptionRate: 81 },
    "37": { abbr: "NC", patients: 358, hcps: 129, adoptionRate: 76 },
    "38": { abbr: "ND", patients: 37, hcps: 15, adoptionRate: 65 },
    "39": { abbr: "OH", patients: 421, hcps: 148, adoptionRate: 73 },
    "40": { abbr: "OK", patients: 163, hcps: 63, adoptionRate: 69 },
    "41": { abbr: "OR", patients: 147, hcps: 59, adoptionRate: 72 },
    "42": { abbr: "PA", patients: 523, hcps: 187, adoptionRate: 78 },
    "44": { abbr: "RI", patients: 43, hcps: 18, adoptionRate: 74 },
    "45": { abbr: "SC", patients: 174, hcps: 64, adoptionRate: 70 },
    "46": { abbr: "SD", patients: 43, hcps: 17, adoptionRate: 66 },
    "47": { abbr: "TN", patients: 238, hcps: 89, adoptionRate: 72 },
    "48": { abbr: "TX", patients: 812, hcps: 283, adoptionRate: 79 },
    "49": { abbr: "UT", patients: 101, hcps: 40, adoptionRate: 71 },
    "50": { abbr: "VT", patients: 26, hcps: 12, adoptionRate: 68 },
    "51": { abbr: "VA", patients: 316, hcps: 115, adoptionRate: 74 },
    "53": { abbr: "WA", patients: 231, hcps: 89, adoptionRate: 75 },
    "54": { abbr: "WV", patients: 58, hcps: 22, adoptionRate: 64 },
    "55": { abbr: "WI", patients: 198, hcps: 76, adoptionRate: 72 },
    "56": { abbr: "WY", patients: 29, hcps: 13, adoptionRate: 63 },
  };
  

  // Color scale based on adoption rate
  const getStateColor = (stateData) => {
    if (!stateData) return "#F0F2F5"; // Lighter, more modern gray for undefined states
    
    const rate = stateData.adoptionRate;
    if (rate >= 75) return "#34A853";  // Google-inspired green, more balanced
    if (rate >= 70) return "#4285F4";  // Google-inspired blue, better contrast
    if (rate >= 65) return "#FBBC05";  // Warmer, less harsh yellow
    return "#EA4335";                  // Slightly muted red, less aggressive
};


  const handleMouseEnter = (geo) => {
    const stateId = geo.id;
    const stateData = healthcareData[stateId];
    
    if (stateData) {
      setTooltipContent(`
        State: ${stateData.abbr}
        SMA Patients: ${stateData.patients}
        Active HCPs: ${stateData.hcps}
        Adoption Rate: ${stateData.adoptionRate}%
      `);
    } else {
      setTooltipContent("No data available");
    }
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        SMA Healthcare Statistics by State
      </h2>

      <div className="flex justify-center items-center space-x-4 mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#1E824C] mr-2"></div>
          <span>Adoption Rate: 75%+</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#3498DB] mr-2"></div>
          <span>Adoption Rate: 70-74%</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#F1C40F] mr-2"></div>
          <span>Adoption Rate: 65-69%</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#E74C3C] mr-2"></div>
          <span>Adoption Rate: &lt;65%</span>
        </div>
      </div>


      <div className="relative">
        <ComposableMap projection="geoAlbersUsa" className="w-full h-[400px]">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateData = healthcareData[geo.id];
                const stateColor = getStateColor(stateData);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={stateColor}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { 
                        fill: "#3b82f6", 
                        outline: "none",
                        opacity: 0.8 
                      },
                      pressed: { 
                        fill: "#3b82f6", 
                        outline: "none",
                        opacity: 0.8 
                      },
                    }}
                    onMouseEnter={() => handleMouseEnter(geo)}
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {tooltipContent && (
          <div className="absolute top-0 right-0 bg-white p-2 rounded shadow-lg text-sm">
            <pre className="whitespace-pre-line">{tooltipContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateHealthcareMap;