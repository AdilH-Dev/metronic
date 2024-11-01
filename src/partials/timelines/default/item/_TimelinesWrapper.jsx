import { KeenIcon } from '@/components';
const TimelinesWrapper = ({
  line,
  icon,
  children
}) => {
  return <div className="flex items-start relative">
      {line && <div className="w-9 left-0 top-9 absolute bottom-0 translate-x-1/2 border-l border-l-gray-300"></div>}

      <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
        <KeenIcon icon={icon} className="text-base" />
      </div>
      <div className="pl-2.5 mb-7 text-md grow">{children}</div>
    </div>;
};
export { TimelinesWrapper };