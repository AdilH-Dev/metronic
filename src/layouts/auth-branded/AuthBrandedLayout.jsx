import { Link, Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { toAbsoluteUrl } from '@/utils';
import useBodyClasses from '@/hooks/useBodyClasses';
import { AuthBrandedLayoutProvider } from './AuthBrandedLayoutProvider';
const Layout = () => {
  // Applying body classes to manage the background color in dark mode
  useBodyClasses('dark:bg-coal-500');
  return <Fragment>
      <style>
        {/* {`
          .branded-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/1.png')}');
          }
          .dark .branded-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/1-dark.png')}');
          }
        `} */}
      </style>

      <div className="grid lg:grid-cols-1 grow">


        <div className="lg:rounded-xl text-center lg:border lg:border-gray-200 lg:m-5 order-1 lg:order-2 bg-top xxl:bg-center xl:bg-cover bg-no-repeat branded-bg">
          <div className="flex flex-col px-8 lg:px-8 pt-6 pb-4  gap-4">
            <Link to="/">
              <img src={toAbsoluteUrl('/media/app/Senda-line-logo-w.png')} className="h-[28px] max-w-none mx-auto" alt="" />
            </Link>

            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-gray-900">Secure Access Portal</h3>
              <div className="text-base font-medium text-gray-600">
                <span className="text-gray-900 font-semibold">WARNING: </span>Unauthorised access can result in
                <br /> criminal prosecution 
                <br />under applicable law.
                {/* <br /> secure&nbsp;
                &nbsp;to the Metronic
                <br /> Dashboard interface. */}
              </div>
            </div>

            <div className="flex justify-center items-center p-0 lg:p-0 order-2 lg:order-1">
          <Outlet />
        </div>
          </div>
        </div>
      </div>
    </Fragment>;
};

// AuthBrandedLayout component that wraps the Layout component with AuthBrandedLayoutProvider
const AuthBrandedLayout = () => <AuthBrandedLayoutProvider>
    <Layout />
  </AuthBrandedLayoutProvider>;
export { AuthBrandedLayout };