import { useMemo } from 'react';
import { DataGrid } from '@/components';
import { toAbsoluteUrl } from '@/utils';
import { UsersData } from './UsersData';
import { KeenIcon } from '@/components';
const EnforceSwitch = ({
  enforce
}) => {
  return <label className="switch switch-sm">
      <input type="checkbox" checked={enforce} value="1" readOnly />
    </label>;
};
const Users = () => {
  const columns = useMemo(() => [{
    accessorFn: row => row.user,
    id: 'user',
    header: () => <span className="text-gray-700 font-normal">Subscriber</span>,
    enableSorting: true,
    cell: info => <div className="flex items-center gap-2.5">
            <img src={toAbsoluteUrl(`/media/avatars/${info.row.original.user.avatar}`)} className="size-7 rounded-full shrink-0" alt="" />
            <div className="flex flex-col">
              <a className="font-medium text-gray-900 hover:text-primary-active mb-px" href="#">
                {info.row.original.user.name}
              </a>
              <a className="text-2sm text-gray-700 hover:text-primary-active" href="#">
                {info.row.original.user.email}
              </a>
            </div>
          </div>,
    meta: {
      className: 'min-w-[300px]'
    }
  }, {
    accessorFn: row => row.labels,
    id: 'labels',
    header: () => <span className="text-gray-700 font-normal">Products</span>,
    enableSorting: true,
    cell: info => <div className="flex gap-1.5">
            {info.row.original.labels.map((label, index) => <span key={index} className="badge badge-sm">
                {label}
              </span>)}
          </div>,
    meta: {
      className: 'min-w-[200px]'
    }
  }, {
    accessorFn: row => row.license,
    id: 'license',
    header: () => <span className="text-gray-700 font-normal">License</span>,
    enableSorting: true,
    cell: info => <div className="flex flex-col">
            <span className="text-sm text-gray-800 font-medium">
              {info.row.original.license.type}
            </span>
            <span className="text-xs text-gray-600">{info.row.original.license.left}</span>
          </div>,
    meta: {
      className: 'min-w-[175px]'
    }
  }, {
    accessorFn: row => row.payment,
    id: 'payment',
    header: () => <span className="text-gray-700 font-normal">Latest Payment</span>,
    enableSorting: true,
    cell: info => info.row.original.payment,
    meta: {
      className: 'min-w-[175px]',
      cellClassName: 'text-gray-800 font-medium'
    }
  }, {
    accessorFn: row => row.enforce,
    id: 'enforce',
    header: () => <span className="text-gray-700 font-normal">Enforce 2FA</span>,
    enableSorting: true,
    cell: info => <EnforceSwitch enforce={info.row.original.enforce} />,
    meta: {
      className: 'min-w-[137px]'
    }
  }, {
    id: 'actions',
    header: () => <span className="text-gray-700 font-normal">Invoices</span>,
    enableSorting: true,
    cell: () => <button className="btn btn-link">Download</button>,
    meta: {
      className: 'w-28'
    }
  }], []);
  const data = useMemo(() => UsersData, []);
  return <div className="card card-grid min-w-full">
      <div className="card-header py-5 flex-wrap gap-2">
        <h3 className="card-title">Showing 10 of 49,053 users</h3>

        <div className="flex flex-wrap gap-2 lg:gap-5">
          <div className="flex">
            <label className="input input-sm">
              <KeenIcon icon="magnifier" />
              <input placeholder="Search users" type="text" value="" readOnly />
            </label>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <select className="select select-sm w-28">
              <option value="1">Active</option>
              <option value="2">Disabled</option>
              <option value="3">Pending</option>
            </select>

            <select className="select select-sm w-28">
              <option value="1">Latest</option>
              <option value="2">Older</option>
              <option value="3">Oldest</option>
            </select>

            <button className="btn btn-sm btn-outline btn-primary">
              <KeenIcon icon="setting-4" /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="card-body">
        <DataGrid columns={columns} data={data} rowSelect={true} pagination={{
        size: 10
      }} sorting={[{
        id: 'user',
        desc: false
      }]} />
      </div>
    </div>;
};
export { Users };