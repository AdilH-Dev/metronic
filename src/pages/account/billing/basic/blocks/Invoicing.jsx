import { KeenIcon } from '@/components';
const Invoicing = () => {
  const tables = [{
    number: 'Invoice-2024-xd912c',
    date: '6 Aug, 2024',
    ammount: '24.00',
    label: 'March 2025',
    color: 'badge-warning'
  }, {
    number: 'Invoice-2024-rq857m',
    date: '17 Jun, 2024',
    ammount: '29.99',
    label: 'Feburary 2025',
    color: 'badge-success'
  }, {
    number: 'Invoice-2024-jk563z',
    date: '30 Apr, 2024',
    ammount: '24.00',
    label: 'Janurary 2025',
    color: 'badge-success'
  }, {
    number: 'Invoice-2024-hg234x',
    date: '21 Apr, 2024',
    ammount: '6.59',
    label: 'December 2024',
    color: 'badge-danger'
  }, {
    number: 'Invoice-2024-lp098y',
    date: '14 mar, 2024',
    ammount: '24.00',
    label: 'November 2024',
    color: 'badge-success'
  }];
  const renderItem = (table, index) => {
    return <tr key={index}>
        <td className="">
        {table.label}
          {/* <div className={`badge badge-sm ${table.color} badge-outline`}>{table.label}</div> */}
        </td>
        <td className="text-sm text-gray-800 font-normal text-center">{table.number}</td>
        <td className="text-sm text-gray-800 font-normal lg:text-right">{table.date}</td>
        <td className="text-sm text-gray-700 font-normal lg:text-right">${table.ammount}</td>
        <td>
          <div className="btn btn-sm btn-icon btn-clear btn-primary">
            <KeenIcon icon="exit-down" />
          </div>
        </td>
      </tr>;
  };
  return <div className="card">
      <div className="card-header">
        <h3 className="card-title">Financial reports</h3>

        {/* <button className="btn btn-light btn-sm">
          <KeenIcon icon="exit-down" />
          Download All
        </button> */}
      </div>
      <div className="card-table scrollable-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="min-w-52">Month</th>
              <th className="min-w-24 text-center">Document number</th>
              <th className="min-w-32 text-right">Submitted</th>
              <th className="min-w-20 text-right">Paid</th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table, index) => {
            return renderItem(table, index);
          })}
          </tbody>
        </table>
      </div>
      <div className="card-footer justify-center">
        <a href="#" className="btn btn-link">
          View all Payments
        </a>
      </div>
    </div>;
};
export { Invoicing };