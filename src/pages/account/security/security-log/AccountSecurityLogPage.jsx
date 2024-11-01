import { Fragment } from 'react';
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
const AccountSecurityLogPage = () => {
  const { currentLayout } = useLayout();
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
              <div className="grid grid-cols-3 md:grid-cols-[1.5fr_2fr_2fr_2fr_1.5fr] gap-8 w-full">
                <div className=' col-start-1 md:col-start-2'>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-sm text-gray-600">Mobile</p>
                  <div className="grid grid-cols-2">
                    <p className="text-sm text-gray-600">First</p>
                    <p className="text-sm text-gray-600">Last</p>
                  </div>
                </div>
                <div className=''>
                  <p className="text-sm text-gray-600">Send Currency</p>
                  <p className="text-sm text-gray-600">Receive Currency</p>
                </div>
                <div className=''>
                  <div className="grid grid-cols-2">
                    <p className="text-sm text-gray-600">From</p>
                    <p className="text-sm text-gray-600">Date</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-sm text-gray-600">To</p>
                    <p className="text-sm text-gray-600">Date</p>
                  </div>
                </div>
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
        <AccountSecurityLogContent />
      </Container>
    </Fragment>
  );
};
export { AccountSecurityLogPage };
