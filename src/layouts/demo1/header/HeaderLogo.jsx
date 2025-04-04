import { Link } from 'react-router-dom';
import { KeenIcon } from '@/components/keenicons';
import { toAbsoluteUrl } from '@/utils';
import { useDemo1Layout } from '../';
const HeaderLogo = () => {
  const {
    setMobileSidebarOpen,
    setMobileMegaMenuOpen,
    megaMenuEnabled
  } = useDemo1Layout();
  const handleSidebarOpen = () => {
    setMobileSidebarOpen(true);
  };
  const handleMegaMenuOpen = () => {
    setMobileMegaMenuOpen(true);
  };
  return <div className="flex gap-1 items-center">
    {/* remove lg:hidden on above div */}
      <Link to="/" className="shrink-0">
        <img src={toAbsoluteUrl('/media/app/Senda-line-logo-w.png')} className="h-[25px]" alt="mini-logo" />
      {/* change mini logo to default logo dark */}
      </Link>


      <div className="flex items-center">
        {/* <button type="button" className="btn btn-icon btn-light btn-clear btn-sm" onClick={handleSidebarOpen}>
          <KeenIcon icon="menu" />
        </button> */}

        {megaMenuEnabled && <button type="button" className="btn btn-icon btn-light btn-clear btn-sm" onClick={handleMegaMenuOpen}>
            <KeenIcon icon="burger-menu-2" />
          </button>}
      </div>
    </div>;
};
export { HeaderLogo };