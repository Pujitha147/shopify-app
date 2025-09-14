import React from "react";

const ChartCard = ({ title }) => {
  return (
    <div className="card shadow-sm p-3 bg-white rounded">
      <h3 className="card-title h5 mb-2">{title}</h3>
      <div className="d-flex align-items-center justify-content-center text-muted" style={{ height: "10rem" }}>
        Chart Placeholder
      </div>
    </div>
  );
};

export default ChartCard;
