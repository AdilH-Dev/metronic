import { MenuSub } from '@/components/menu';
import { MegaMenuSubDropdown } from './components';
const MegaMenuSubHelp = items => {
  const helpItem = items[5];
  return <MenuSub className="menu-default lg:py-2.5 lg:w-[220px]">
      {helpItem.children && MegaMenuSubDropdown(helpItem.children)}
    </MenuSub>;
};
export { MegaMenuSubHelp };