import ApexChart from 'react-apexcharts';
import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { DropdownCard2 } from '@/partials/dropdowns/general';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { BuildReport } from '../../../../../partials/modals/build-report/BuildReport';
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
  const itemRef = useRef(null);
    const [selectedId, setSelectedId] = useState(null);
      const [ShareProfileModalOpen, setShareProfileModalOpen] = useState(false);
  


  const handleSettingsModalOpen = () => {
    setShareProfileModalOpen(true);
    itemRef.current?.hide();
  };
  const handleShareProfileModalClose = () => {
    setShareProfileModalOpen(false);
    setSelectedId(null);
  };

    const getPartnerData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BACKEND_API_URL}extension-users?pageNumber=${currentPage}&perPage=${pageSize}&user_type=partner&search_data=${searchTerm}`
        );
        if (response?.data?.success === true) {
          // toast.success(response?.data?.message);
          setPartnerData(response?.data?.data?.data);
          console.log(response?.data?.data?.total, 'latetstst');
          setTotalRecords(response?.data?.data?.last_page);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setPartnerData([]);
        setTotalRecords(0);
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };
  return (
    <div className="card h-full">
      <BuildReport
      id={selectedId}
      open={ShareProfileModalOpen}
      onClose={handleShareProfileModalClose}
      callApi={getPartnerData}
      />
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

      <div className="card-footer justify-center" >
        <p  className="btn btn-link" onClick={handleSettingsModalOpen}>
          Build report
        </p>
      </div>
    </div>
  );
};
export { Contributions };
