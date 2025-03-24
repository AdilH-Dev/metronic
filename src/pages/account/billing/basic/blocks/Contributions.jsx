import ApexChart from 'react-apexcharts';
import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { DropdownCard2 } from '@/partials/dropdowns/general';
import { Link } from 'react-router-dom';
const Contributions = ({ title }) => {
  // const data = [44, 55, 41, 17, 15];
  const data = [44, 55, 41];
  // const labels = ['ERP', 'HRM', 'DMS', 'CRM', 'DAM'];
  const labels = ['Confirmed', 'Failed', 'Processing'];
  // const colors = ['var(--tw-primary)', 'var(--tw-brand)', 'var(--tw-success)', 'var(--tw-info)', 'var(--tw-warning)'];
  const colors = ['var(--tw-primary)', 'var(--tw-brand)', 'var(--tw-success)'];
  const options = {
    series: data,
    labels: labels,
    colors: colors,
    fill: {
      colors: colors
    },
    chart: {
      type: 'donut'
    },
    stroke: {
      show: true,
      width: 2
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    legend: {
      offsetY: -10,
      offsetX: -10,
      fontSize: '13px',
      fontWeight: '500',
      itemMargin: {
        vertical: 1
      },
      labels: {
        colors: 'var(--tw-gray-700)',
        useSeriesColors: false
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };
  return (
    <div className="card h-full">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>

        <Menu className="items-stretch">
          <MenuItem
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: 'bottom-end',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 10] // [skid, distance]
                  }
                }
              ]
            }}
          >
            {/* <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear mb-2.5-">
              <KeenIcon icon="dots-vertical" />
            </MenuToggle> */}
            {DropdownCard2()}
          </MenuItem>
        </Menu>
      </div>
      <div className="card-body flex flex-col gap-4 p-5 lg:p-7.5 lg:pt-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-normal text-gray-700">This Month</span>
        </div>
      </div>

      <div className="card-body flex justify-center items-center px-3 py-1">
        <ApexChart
          id="contributions_chart"
          options={options}
          series={options.series}
          type="donut"
          width="100%"
          height="178.7"
        />
      </div>

      <div className="card-footer justify-center">
        <Link to="/public-profile/network" className="btn btn-link">
          Build report
        </Link>
      </div>
    </div>
  );
};
export { Contributions };
