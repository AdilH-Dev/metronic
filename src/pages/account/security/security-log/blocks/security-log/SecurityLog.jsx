/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useState } from 'react';
import { DataGrid, KeenIcon } from '@/components';
import { SecurityLogData } from '.';
import toast from 'react-hot-toast';
import axios from 'axios';
import CustomPagination from '../../../../../../components/data-grid/components/CustomPagination';
import { ContentLoader } from '../../../../../../components/loaders/ContentLoader';
const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const BACKEND_IMAGE_URL = import.meta.env.VITE_APP_BACKEND_IMAGE_URL;
import { formatIsoDate } from '@/utils/Date';



const SecurityLog = ({date,toDate,searchTerms}) => {
  const columns = [{
    accessorFn: row => row.updated_at,
    id: 'updated_at',
    header: () => 'Created',
    enableSorting: false,
    cell: (info) => formatIsoDate(info.row.original.updated_at),
    meta: {
      className: 'min-w-[200px]'
    }
  }, 
  {
    accessorFn: row => row.payee_name,
    id: 'payee_name',
    header: () => 'Payee',
    enableSorting: false,
    cell: info => <div className="flex items-center gap-1.5">
            {/* <KeenIcon icon={info.row.original.eventType.icon.name} className={`text-lg ${info.row.original.eventType.icon.variant}`} /> */}
            <span className="leading-none font-semibold text-gray-700">
              {info.row.original.payee_name}
            </span>
          </div>,
    meta: {
      className: 'min-w-[200px]'
    }
  }, 
  // {
  //   accessorFn: row => row.eventType,
  //   id: 'eventType',
  //   header: () => 'Status',
  //   enableSorting: false,
  //   cell: info => <div className="flex items-center gap-1.5">
  //           <KeenIcon icon={info.row.original.eventType.icon.name} className={`text-lg ${info.row.original.eventType.icon.variant}`} />
  //           <span className="leading-none font-semibold text-gray-700">
  //             {info.row.original.status}
  //           </span>
  //         </div>,
  //   meta: {
  //     className: 'min-w-[200px]'
  //   }
  // }, 
  // {
  //   accessorFn: row => row.email,
  //   id: 'email',
  //   header: () => 'Email',
  //   enableSorting: false,
  //   cell: info => info?.getValue(),
  //   meta: {
  //     className: 'min-w-[200px]'
  //   }
  // }, 
  {
    accessorFn: row => row.sending_amount,
    id: 'sending_amount',
    header: () => 'Sending',
    enableSorting: false,
    cell: info => info.getValue() ?  info.getValue() +" " + "EUR" :"0" +" " + "EUR",
    meta: {
      className: 'min-w-[130px]'
    }
  }, 
  {
    accessorFn: row => row.recieving_amount,
    id: 'recieving_amount',
    header: () => 'Receiving',
    enableSorting: false,
    cell: info => info.getValue() ?  info.getValue() +" " + "GBP" :"0" +" " + "GBP",
    meta: {
      className: 'min-w-[140px]'
    }
  }, 
  // {
  //   accessorFn: row => row.severity,
  //   id: 'severity',
  //   header: () => 'API',
  //   enableSorting: true,
  //   cell: info => <span className={`badge badge-sm badge-outline ${info.row.original.severity.variant}`}>
  //           {info.row.original.severity.label}
  //         </span>,
  //   meta: {
  //     className: 'min-w-[110px]'
  //   }
  // }, 
  // {
  //   id: 'click',
  //   header: () => '',
  //   enableSorting: false,
  //   cell: () => <button className="btn btn-icon btn-light btn-clear btn-sm">
  //           {/* <KeenIcon icon="notepad" /> */}
  //         </button>,
  //   meta: {
  //     className: 'w-[60px]'
  //   }
  // }
];
  // const data = useMemo(() => SecurityLogData, []);



  // ---------------
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [loading, setLoading] = useState(false);
  const [partnerData, setPartnerData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerms);
      setCurrentPage(1);
      // Update debounced value after delay
    }, 700); // Adjust debounce delay (e.g., 300ms)

    return () => {
      clearTimeout(handler); // Clear timeout on component unmount or input change
    };
  }, [searchTerms]);

  useEffect(() => {
    getPartnerData();
  }, [debouncedSearchTerm, currentPage, pageSize,date,toDate]);

  const getPartnerData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}accountant-users/transaction-listing?pageNumber=${currentPage}&perPage=${pageSize}&search=${searchTerms.search1}&payee=${searchTerms.search2}&from_date=${date}&to_date=${toDate}`
      );
      if (response?.data?.success === true) {
        // toast.success(response?.data?.message);
        setPartnerData(response?.data?.data?.data);
        // console.log(response?.data?.data?.total, 'latetstst');
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

  const handlePageSizeChange = (e) => {
    const size = Number(e.target.value);
    setPageSize(size);
    setCurrentPage(1); // Reset to the first page to avoid invalid page numbers
  };

  return <div className="card card-grid min-w-full">
      <div className="card-header py-5 flex-wrap">
        <h3 className="card-title">Transactions</h3>
        {/* <label className="switch switch-sm">
          <input name="check" type="checkbox" value="1" defaultChecked className="order-2" readOnly />
          <span className="switch-label order-1">
            Push Alerts
          </span>
        </label> */}
      </div>

      <div className="card-body">
        {/* <DataGrid columns={columns} data={partnerData} rowSelect={true} pagination={{
        size: 10
      }} sorting={[{
        id: 'timestamp',
        desc: false
      }]} /> */}
        {loading ? (
            <div className="border text-center flex justify-center py-2">
              <ContentLoader />
            </div> // Show loader while fetching data
          ) : (
            <DataGrid
              columns={columns}
              data={partnerData}
              serverSide={true}
              rowSelect={false}
              pagination={false}
              // onRowClick={handleRowClick}
              // search ={false}
              // pagination={{
              //   size: pageSize,
              // }}
              // sorting={[
              //   {
              //     id: 'name',
              //     desc: true
              //   }
              // ]}
            />
          )}
          <div
            className="flex justify-between items-center"
            style={{ borderTop: '1px solid #26272F' }}
          >
            <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-3 text-gray-600 text-2sm font-medium">
              <div className="flex items-center gap-2">
                Show
                <select
                  className="select select-sm w-16"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                >
                  {[5, 10, 25, 50, 100]?.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                Per Page
              </div>
            </div>
            <CustomPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalRecords={totalRecords}
            />
          </div>
      </div>
    </div>;
};
export { SecurityLog };