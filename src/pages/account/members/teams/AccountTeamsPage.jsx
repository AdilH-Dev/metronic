import { Fragment, useRef, useState } from 'react';
import { Container } from '@/components/container';
// import { Toolbar, ToolbarActions, ToolbarDescription, ToolbarHeading, ToolbarPageTitle } from '@/partials/toolbar';
import { PageNavbar } from '@/pages/account';
import { AccountTeamsContent } from '.';
// import { useLayout } from '@/providers';
// import { ModalShareProfile } from '../modals/share-profile';

const AccountTeamsPage = () => {
  // const {
  //   currentLayout
  // } = useLayout();


  return <Fragment>
      <PageNavbar />

      {/* {currentLayout?.name === 'demo1-layout' && <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                Efficient team organization with real-time updates
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-light" onClick={handleSettingsModalOpen}>
                Add Partner
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>} */}

      <Container>
        <AccountTeamsContent />
      </Container>
    </Fragment>;
};
export { AccountTeamsPage };