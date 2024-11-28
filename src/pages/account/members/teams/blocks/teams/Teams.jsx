/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
import { DataGrid, KeenIcon } from '@/components';
// import { CommonAvatars, CommonRating } from '@/partials/common';
// import { TeamsData } from './';
// import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ContentLoader } from '../../../../../../components/loaders/ContentLoader';
import { ModalPartner } from '../../../../../../partials/modals/partners';
const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const BACKEND_IMAGE_URL = import.meta.env.VITE_APP_BACKEND_IMAGE_URL;

const Teams = () => {
  // const storageFilterId = 'teams-filter';
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row?.name,
        id: 'name',
        header: () => 'Partner',
        enableSorting: true,
        cell: (info) => {
          return (
            <div className="flex flex-col gap-2">
              <span className="leading-none font-medium text-sm text-gray-900">
                {info?.row?.original?.name}
              </span>
              {/* <span className="text-2sm text-gray-700 font-normal leading-3">
                {info.row.original.team.description}
              </span> */}
            </div>
          );
        },
        meta: {
          className: 'w-[150px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
      {
        accessorFn: (row) => row.address,
        id: 'address',
        enableSorting: true,
        header: () => 'Address',
        cell: (info) => info.getValue(),
        meta: {
          className: 'w-[350px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
      {
        accessorFn: (row) => row.logo,
        id: 'members',
        header: () => 'Logo',
        enableSorting: true,
        cell: (info) => (
          <div>
            {/* <img src="/media/app/default-logo-dark.svg" alt="" /> */}
            {info?.row?.original?.logo && (
              <img
                className="h-[30px] w-[30px]"
                src={`${BACKEND_IMAGE_URL}${info?.row?.original?.logo}`}
                alt=""
              />
            )}
          </div>
        ),

        // <CommonAvatars size="size-[30px]" group={info.row.original.members.group} more={info.row.original.members.more} />,
        meta: {
          className: 'w-[200px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
      {
        id: 'edit',
        header: () => '',
        enableSorting: false,
        cell: ({ row }) => (
          <button
            className="btn btn-sm btn-icon btn-clear btn-light"
            onClick={() => {
              handleSettingsModalOpen();
              console.log(row, 'opopopopopopopo');
              setSelectedId(row?.original?.id);
            }}
          >
            <KeenIcon icon="notepad-edit" />
          </button>
        ),
        meta: {
          className: 'w-[60px]'
        }
      }
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
    ],
    []
  );

  // Memoize the team data
  // const data = useMemo(() => TeamsData, []);

  // Initialize search term from localStorage if available
  // const [searchTerm, setSearchTerm] = useState(() => {
  //   return localStorage.getItem(storageFilterId) || '';
  // });

  const [searchTerm, setSearchTerm] = useState('');

  const [loading, setLoading] = useState(false);
  const [partnerData, setPartnerData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  console.log(partnerData, 'partnerDatapartnerDatapartnerData');

  const getPartnerData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_API_URL}extension-users`);
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        setPartnerData(response?.data?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPartnerData();
  }, []);

  // Update localStorage whenever the search term changes
  // useEffect(() => {
  //   localStorage.setItem(storageFilterId, searchTerm);
  // }, [searchTerm]);

  // Filtered data based on search term
  // const filteredData = useMemo(() => {
  //   if (!searchTerm) return data; // If no search term, return full data

  //   return data.filter(team => team.team.name.toLowerCase().includes(searchTerm.toLowerCase()) || team.team.description.toLowerCase().includes(searchTerm.toLowerCase()));
  // }, [searchTerm, data]);

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
  return (
    <div className="card card-grid min-w-full">
      <ModalPartner
        id={selectedId}
        open={ShareProfileModalOpen}
        onClose={handleShareProfileModalClose}
        callApi={getPartnerData}
      />

      <div className="card-header flex-wrap py-5">
        <h3 className="card-title">Partners</h3>
        <div className="flex gap-6">
          <div className="relative">
            <KeenIcon
              icon="magnifier"
              className="leading-none text-md text-gray-500 absolute top-1/2 left-0 -translate-y-1/2 ml-3"
            />
            <input
              type="text"
              placeholder="Search Teams"
              className="input input-sm pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
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
            rowSelect={true}
            pagination={{
              size: 10
            }}
            sorting={[
              {
                id: 'name',
                desc: true
              }
            ]}
          />
        )}
      </div>
    </div>
  );
};
export { Teams };
