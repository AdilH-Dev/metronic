import { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';
import { PageNavbar } from '@/pages/account';
import { AccountSecurityLogContent } from '.';
import { useLayout } from '@/providers';
import { KeenIcon } from '@/components';
const AccountSecurityLogPage = () => {
  const { currentLayout } = useLayout();
  const [searchTerms, setSearchTerms] = useState({ search1: '', search2: '' });
  const [date, setDate] = useState('');
  const [toDate, setToDate] = useState('');

  const dateInputRef = useRef(null);
  const openDatePicker = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker(); // Modern browsers
      } catch (error) {
        dateInputRef.current.focus(); // Fallback for older browsers
      }
    }
  };

  const dateInputRef2 = useRef(null);
  const openDatePicker2 = () => {
    if (dateInputRef2.current) {
      try {
        dateInputRef2.current.showPicker(); // Modern browsers
      } catch (error) {
        dateInputRef2.current.focus(); // Fallback for older browsers
      }
    }
  };

  return (
    <Fragment>
      <PageNavbar />

      {currentLayout?.name === 'demo1-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                {/* <div className="flex items-center gap-2 font-medium">
                  <p className="text-sm text-gray-600">First &nbsp;&nbsp;&nbsp;</p>
                  <p className="text-sm text-gray-600">Last &nbsp;&nbsp;&nbsp;</p>
                </div> */}
                {/* <p className="text-sm text-gray-600">Email</p> */}

                {/* <span className="size-0.75 bg-gray-600 rounded-full"></span> */}
                {/* <a href="#" className="font-semibold btn btn-link link">
                    Unlink All Devices
                  </a> */}
              </ToolbarDescription>
            </ToolbarHeading>
            <div className="grid grid-cols-[1fr_1.7fr_1.7fr_1fr_1fr_1fr] gap-8 w-full">
              <div className="flex justify-center items-center">
                <p className="text-sm text-gray-600 mb-0">Search</p>
              </div>
              <div className="relative d-flex content-center items-center">
                <KeenIcon
                  icon="magnifier"
                  className="leading-none text-md text-gray-500 absolute top-1/2 left-0 -translate-y-1/2 ml-3"
                />
                <input
                  type="text"
                  placeholder="Company name or number"
                  className="input input-sm pl-8"
                  value={searchTerms.search1}
                  onChange={(e) => setSearchTerms({ ...searchTerms, search1: e.target.value })}
                />
              </div>
              <div className="relative d-flex content-center items-center">
                <KeenIcon
                  icon="magnifier"
                  className="leading-none text-md text-gray-500 absolute top-1/2 left-0 -translate-y-1/2 ml-3"
                />
                <input
                  type="text"
                  placeholder="Payee"
                  className="input input-sm pl-8"
                  value={searchTerms.search2}
                  onChange={(e) => setSearchTerms({ ...searchTerms, search2: e.target.value })}
                />
              </div>
              <div className="relative  items-center cursor-pointer">
                <input
                  // type={showPassword ? 'text' : 'password'}
                  type="date"
                  placeholder=""
                  ref={dateInputRef}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input input-sm cursor-pointer"
                  autoComplete="off"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDatePicker();
                  }}
                />

                <span
                  className="absolute right-[10px] top-1/2 transform -translate-y-1/2 text-orange-500 peer-focus:text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDatePicker();
                  }}
                >
                  📅
                </span>
              </div>
              <div className="relative  items-center cursor-pointer">
                <input
                  // type={showPassword ? 'text' : 'password'}
                  type="date"
                  placeholder="from Date"
                  ref={dateInputRef2}
                  className="input input-sm cursor-pointer"
                  autoComplete="off"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation();
                    openDatePicker2();
                  }}
                />

                <span
                  className="absolute right-[10px] top-1/2 transform -translate-y-1/2 text-orange-500 peer-focus:text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDatePicker2();
                  }}
                >
                  📅
                </span>
              </div>
              <div></div>
            </div>
            {/* <ToolbarActions>
              <Link to="/account/security/overview" className="btn btn-sm btn-light">
                Security Overview
              </Link>
            </ToolbarActions> */}
          </Toolbar>
        </Container>
      )}

      <Container>
        <AccountSecurityLogContent date={date} toDate={toDate} searchTerms={searchTerms} />
      </Container>
    </Fragment>
  );
};
export { AccountSecurityLogPage };
