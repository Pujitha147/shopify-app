export default function Table({ columns, data }) {
  return (
    <div className="table-responsive rounded border">
      <table className="table table-sm table-bordered table-hover mb-0">
        <thead className="table-light">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} scope="col">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
