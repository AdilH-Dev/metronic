import { MiscHighlightedPosts } from '@/partials/misc';
import { Details, Invoicing, PaymentMethods, Plan ,Statistics,Connections,Contributions,Highlights} from './blocks';
const AccountBasicContent = () => {
  const posts = [
    {
      icon: 'discount',
      title: 'Tailor-Made Plans Selection and Efficient Billing Systems',
      summary:
        'Select the perfect plan for your needs, complemented by an efficient, user-friendly billing system for convenience.',
      path: '#'
    },
    {
      icon: 'package',
      title: 'Customized Plans and Simple Billing Solutions',
      summary:
        'Offering an array of plans to suit diverse requirements, paired with straightforward, hassle-free billing processes.',
      path: '#'
    },
    {
      icon: 'cheque',
      title: 'Comprehensive Plan Options with Streamlined Billing',
      summary:
        'Our plans are crafted to cater to various user demands, accompanied by streamlined billing for maximum efficiency and clarity.',
      path: '#'
    }
  ];
  const items = [
    {
      number: '624',
      label: 'Partners'
    },
    {
      number: '60.7M',
      label: 'Branded'
    },
    {
      number: '369M',
      label: 'Customer'
    },
    {
      number: '27',
      label: 'Founder'
    }
  ];
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-3">
        <Statistics items={items} />
      </div>
      <div className="col-span-1">
        <Connections title="Contributors" />
      </div>
      <div className="col-span-1">
        <Contributions title="Transactions" />
      </div>
      <div className="col-span-1">
        <Highlights limit={3} />
      </div>

      <div className="col-span-3">
        <Invoicing />
      </div>

      {/* <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <Plan />

          <PaymentMethods />

          <Details />

          <Invoicing />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <MiscHighlightedPosts posts={posts} />
        </div>
      </div> */}
    </div>
  );
};
export { AccountBasicContent };
