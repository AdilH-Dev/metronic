import { MiscHighlightedPosts } from '@/partials/misc';
import {
  Details,
  Invoicing,
  PaymentMethods,
  Plan,
  Statistics,
  Connections,
  Contributions,
  Highlights
} from './blocks';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ContentLoader } from '../../../../components/loaders/ContentLoader';
const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;

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

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const getStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_API_URL}get-founding-member-setting`);
      if (response?.data?.success === true) {
        const checked = response?.data?.data === '1' ? true : false;
        setIsChecked(checked);
        // toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-3">
        {loading ? (
          <div className="border text-center flex justify-center py-2">
            <ContentLoader />
          </div> // Show loader while fetching data
        ) : (
          <Statistics items={items} defaultValue={isChecked} />
        )}
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
