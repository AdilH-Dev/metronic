import { Fragment, useRef, useState } from 'react';
import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarDescription, ToolbarHeading, ToolbarPageTitle } from '@/partials/toolbar';
import { PageNavbar } from '@/pages/account';
import { AccountTeamsContent } from '.';
import { useLayout } from '@/providers';
import { ModalPartner } from '../../../../partials/modals/partners';
// import { ModalShareProfile } from '../modals/share-profile';

const AccountTeamsPage = () => {
  const {
    currentLayout
  } = useLayout();
  const itemRef = useRef(null);

  const [ShareProfileModalOpen, setShareProfileModalOpen] = useState(false);
  const handleSettingsModalOpen = () => {
    setShareProfileModalOpen(true);
    itemRef.current?.hide();
  };
  const handleShareProfileModalClose = () => {
    setShareProfileModalOpen(false);
  };

  return <Fragment>
      <PageNavbar />

      {currentLayout?.name === 'demo1-layout' && <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              {/* <ToolbarDescription>
                Efficient team organization with real-time updates
              </ToolbarDescription> */}
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-light" onClick={handleSettingsModalOpen}>
                Add Partner
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>}

      <Container>
        <AccountTeamsContent />
      </Container>

      <ModalPartner open={ShareProfileModalOpen} onClose={handleShareProfileModalClose} />
    </Fragment>;
};
export { AccountTeamsPage };