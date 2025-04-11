import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;

const Statistics = ({ items, defaultValue = false }) => {
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(defaultValue);

  useEffect(() => {
    setIsChecked(defaultValue);
  }, [defaultValue]);
  const changeStatus = async (checked) => {
    setLoading(true);
    const payload = {
      value: checked ? 1 : 0
    };
    try {
      const response = await axios.post(`${BACKEND_API_URL}set-founding-member-setting`, payload);
      if (response?.data?.success === true) {
        setIsChecked(checked);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  const renderItems = (item, index) => {
    return (
      <React.Fragment key={index}>
        <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center relative">
          <span className="text-gray-900 text-2xl lg:text-2.5xl leading-none font-semibold">
            {item.number}
          </span>
          <span className="text-gray-700 text-sm">{item.label}</span>
          <div className="flex items-center gap-2 justify-center absolute right-10 top-1/2 -translate-y-1/2">
            {item.label === 'Founder' &&
              (loading ? (
                <svg
                  className="animate-spin -ml-1 h-5 w-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <label className="switch switch-sm">
                  <input
                    type="checkbox"
                    name="check"
                    checked={isChecked}
                    onChange={(e) => changeStatus(e.target.checked)}
                    readOnly
                  />
                </label>
              ))}
          </div>
        </div>

        {index !== items.length - 1 && (
          <span className="[&:not(:last-child)]:border-r border-r-gray-300 my-1"></span>
        )}
      </React.Fragment>
    );
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex lg:px-10 py-1.5 gap-2">
          {items.map((item, index) => {
            return renderItems(item, index);
          })}
        </div>
      </div>
    </div>
  );
};
export { Statistics };
