import React from "react";

const MetricCard = ({ title, value }) => {
  return (
    <div className="card shadow-sm p-3 text-center bg-white rounded">
      <h3 className="text-muted small fw-medium">{title}</h3>
      <p className="display-5 fw-bold">{value}</p>
    </div>
  );
};

export default MetricCard;

