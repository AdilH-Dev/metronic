/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';
import { DataGrid, KeenIcon } from '@/components';
// import { CommonAvatars, CommonRating } from '@/partials/common';
// import { TeamsData } from './';
// import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ContentLoader } from '../../../../../components/loaders/ContentLoader';
import { ModalPartner } from '../../../../../partials/modals/partners';
import { useLayout } from '@/providers';
import CustomPagination from '../../../../../components/data-grid/components/CustomPagination';
import { formatIsoDate } from '@/utils/Date';
import { ModalPayee } from '../../../../../partials/modals/payee/ModalPayee';

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const BACKEND_IMAGE_URL = import.meta.env.VITE_APP_BACKEND_IMAGE_URL;

const Teams = () => {
  const { currentLayout } = useLayout();
  // const storageFilterId = 'teams-filter';
  const columns = [
    {
      accessorFn: (row) => row?.payee_name,
      id: 'payee_name',
      header: () => 'Payee',
      enableSorting: false,
      cell: (info) => {
        return (
          <div
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => {
              handleSettingsModalOpen();
              setSelectedId(info?.row?.original?.payee_id);
            }}
          >
            <span className="leading-none font-medium text-sm text-gray-900">
              {info?.row?.original?.payee_name}
            </span>
            {/* <span className="text-2sm text-gray-700 font-normal leading-3">
                {info.row.original.team.description}
              </span> */}
          </div>
        );
      },
      meta: {
        className: 'min-w-[190px]',
        cellClassName: 'text-gray-700 font-normal'
      }
    },
    {
      accessorFn: (row) => row.bank_name,
      id: 'bank_name',
      enableSorting: false,
      header: () => 'Bank name',
      cell: (info) => (
        <div
        >
          {info.getValue()}
        </div>
      ),
      meta: {
        className: 'min-w-[120px]',
        cellClassName: 'text-gray-700 font-normal'
      }
    },
    {
      accessorFn: (row) => row.address,
      id: 'address',
      enableSorting: false,
      header: () => 'Bank address',
      cell: (info) => info.getValue(),
      meta: {
        className: 'min-w-[300px]',
        cellClassName: 'text-gray-700 font-normal'
      }
    },
    {
      accessorFn: (row) => row.bic_code,
      id: 'bic_code',
      header: () => 'Sort code',
      enableSorting: false,
      cell: (info) => info.getValue(),
      meta: {
        className: 'min-w-[100px]',
        cellClassName: 'text-gray-700 font-normal'
      }
    },
    {
      accessorFn: (row) => row.account_number,
      id: 'account_number',
      enableSorting: false,
      header: () => 'Account',
      cell: (info) => info.getValue(),
      meta: {
        className: 'min-w-[120px]',
        cellClassName: 'text-gray-700 font-normal'
      }
    },
    {
      accessorFn: (row) => row.iban_number,
      id: 'iban_number',
      enableSorting: false,
      header: () => 'IBAN',
      cell: (info) => info.getValue(),
      meta: {
        className: 'min-w-[150px]',
        cellClassName: 'text-gray-700 font-normal'
      }
    },

    {
      accessorFn: (row) => row.phoneNo,
      id: 'phoneNo',
      enableSorting: false,
      header: () => 'Phone No',
      cell: (info) => info.getValue(),
      meta: {
        className: 'min-w-[155px]',
        cellClassName: 'text-gray-700 font-normal'
      }
    },
    {
      accessorFn: (row) => row.email,
      id: 'email',
      enableSorting: false,
      header: () => 'Email',
      cell: (info) => info.getValue(),
      meta: {
        className: 'w-[200px]',
        cellClassName: 'text-gray-700 font-normal'
      }
    }

    // {
    //   id: 'edit',
    //   header: () => '',
    //   enableSorting: false,
    //   cell: ({ row }) => (
    //     <button
    //       className="btn btn-sm btn-icon btn-clear btn-light"
    //       onClick={() => {
    //         handleSettingsModalOpen();
    //         setSelectedId(row?.original?.id);
    //       }}
    //     >
    //       <KeenIcon icon="notepad-edit" />
    //     </button>
    //   ),
    //   meta: {
    //     className: 'w-[60px]'
    //   }
    // }
    // {
    //   id: 'delete',
    //   header: () => '',
    //   enableSorting: false,
    //   cell: ({
    //     row
    //   }) => <button className="btn btn-sm btn-icon btn-clear btn-light" onClick={() => alert(`Clicked on delete for ${row.original.team}`)}>
    //           <KeenIcon icon="trash" />
    //         </button>,
    //   meta: {
    //     className: 'w-[60px]'
    //   }
    // }
  ];
  // Memoize the team data
  // const data = useMemo(() => TeamsData, []);

  // Initialize search term from localStorage if available
  // const [searchTerm, setSearchTerm] = useState(() => {
  //   return localStorage.getItem(storageFilterId) || '';
  // });

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [loading, setLoading] = useState(false);
  const [partnerData, setPartnerData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
      // Update debounced value after delay
    }, 700); // Adjust debounce delay (e.g., 300ms)

    return () => {
      clearTimeout(handler); // Clear timeout on component unmount or input change
    };
  }, [searchTerm]);

  useEffect(() => {
    getPartnerData();
  }, [debouncedSearchTerm, currentPage, pageSize]);

  const getPartnerData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}accountant-users/payee?pageNumber=${currentPage}&perPage=${pageSize}&user_type=partner&search_data=${searchTerm}`
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

  const itemRef = useRef(null);

  const [ShareProfileModalOpen, setShareProfileModalOpen] = useState(false);
  const handleSettingsModalOpen = () => {
    setShareProfileModalOpen(true);
    itemRef.current?.hide();
  };
  const handleShareProfileModalClose = () => {
    setShareProfileModalOpen(false);
    setSelectedId(null);
  };
  const handlePageSizeChange = (e) => {
    const size = Number(e.target.value);
    setPageSize(size);
    setCurrentPage(1); // Reset to the first page to avoid invalid page numbers
  };

  const handleRowClick = (rowData) => {
    // handleSettingsModalOpen();
    // setSelectedId(rowData);
  };
  return (
    <Fragment>
      {currentLayout?.name === 'demo1-layout' && (
        <Container className="px-0">
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              {/* <ToolbarDescription>
                Efficient team organization with real-time updates
              </ToolbarDescription> */}
            </ToolbarHeading>
            {/* <ToolbarActions>
              <a href="#" className="btn btn-sm btn-light" onClick={handleSettingsModalOpen}>
                Add Payee
              </a>
            </ToolbarActions> */}
          </Toolbar>
        </Container>
      )}
      <div className="card card-grid min-w-full">
        <ModalPayee
          id={selectedId}
          open={ShareProfileModalOpen}
          onClose={handleShareProfileModalClose}
          callApi={getPartnerData}
        />

        <div className="card-header flex-wrap py-5">
          <h3 className="card-title">Payee</h3>
          <div className="flex gap-6">
            <div className="relative">
              <KeenIcon
                icon="magnifier"
                className="leading-none text-md text-gray-500 absolute top-1/2 left-0 -translate-y-1/2 ml-3"
              />
              <input
                type="text"
                placeholder="Search Payee"
                className="input input-sm pl-8"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }} // Update search term
              />
            </div>
            {/* <label className="switch switch-sm">
            <input name="check" type="checkbox" value="1" className="order-2" readOnly />
            <span className="switch-label order-1">Only Active Groups</span>
          </label> */}
          </div>
        </div>

        <div className="card-body">
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
              onRowClick={handleRowClick}
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
      </div>
    </Fragment>
  );
};
export { Teams };
