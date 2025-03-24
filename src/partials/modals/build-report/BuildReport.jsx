import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader, ModalTitle } from '@/components/modal';
import { KeenIcon } from '@/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import { parse, format } from 'date-fns';
const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const BACKEND_IMAGE_URL = import.meta.env.VITE_APP_BACKEND_IMAGE_URL;


const BuildReport = forwardRef(({ open, onClose, id = null, callApi }, ref) => {
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);


  // Validation schema
  const loginSchema = Yup.object().shape({
    file_name: Yup.string().required('File name is required'),
    month: Yup.string().required('Month is required'),
  });

  const initialValues = {
    file_name: '',
    month: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('file_name', values?.file_name);
      formData.append('month', values?.month);

      try {
        let response;
        if (id) {
          response = await axios.post(`${BACKEND_API_URL}extension-users/update/${id}`, formData);
        } else {
          response = await axios.post(`${BACKEND_API_URL}extension-users/add`, formData);
        }
        if (response?.data?.success === true) {
          toast.success(response?.data?.message);
          onClose();
          console.log('Form submitted', response?.data);
          formik.resetForm();
          callApi();
        }
        // Example: Replace with your login logic
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    }
  });
  console.log(formik.errors.company_name, 'formik valuesss');
  const getEditPartnerData = async (passId) => {
    setEditLoading(true);
    try {
      const response = await axios.get(`${BACKEND_API_URL}extension-users/edit_data/${passId}`);
      if (response?.data?.success === true) {
        const data = response?.data?.data;
        const logoURL = data?.logo ? `${BACKEND_IMAGE_URL}${data?.logo}` : null;
        const logoValue = logoURL ? [{ dataURL: logoURL, file: null }] : []; // Ensure correct format

        formik.setValues({
          company_name: data?.company_name || '',
          email: data?.email || '',
          address: data?.address || '',
          password: +data?.key || '', // Map `pin` to `password`
          name: data?.name || '',
          phoneNo: data?.phoneNo || '',
          company_no: data?.company_number || '',
          branding_recieve_date: data?.branding_recieve_date || '',
          logo: logoValue.length > 0 ? logoValue[0] : null // Set formik value
        });

        // Update logo state
        setLogo(logoValue);

        // toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch edit data');
      console.error('Error fetching edit data:', error);
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      // getEditPartnerData(id);
    }
    if (!id && open) {
      getKeyGenator();
    }
  }, [id, open]);

  const getKeyGenator = async () => {
    setEditLoading(true);
    try {
      const response = await axios.get(`${BACKEND_API_URL}extension-users/generate-key`);
      if (response?.data?.success === true) {
        const data = response?.data?.data;
        // Update formik values
        formik.setValues({
          file_name: 'SVL649876987645',
          month: '',
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error('Error fetching edit data:', error);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        formik.resetForm();
        setLogo([]);
      }}
      ref={ref}
    >
      <ModalContent className="max-w-[600px] top-[15%]">
        <ModalHeader>
          <ModalTitle>Build report</ModalTitle>
          <button
            className="btn btn-sm btn-icon btn-light btn-clear shrink-0"
            onClick={() => {
              onClose();
              formik.resetForm();
            }}
          >
            <KeenIcon icon="cross" />
          </button>
        </ModalHeader>
        <ModalBody className="grid gap-5 px-0">
          {editLoading ? (
            <div className="relative py-4">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center gap-2 px-4 py-2 font-medium leading-none text-2sm border border-gray-200 shadow-default rounded-md text-gray-500 bg-light">
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
                  Loading
                </div>
              </div>
            </div>
          ) : (
            <form className="card-body flex flex-col gap-5 py-0" onSubmit={formik.handleSubmit}>
              {/* Logo Field */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
                  <label className="form-label text-gray-900 flex items-center gap-3">
                    Filename
                    {formik.touched.file_name && formik.errors.file_name && (
                      <span role="alert" className="text-danger text-xs">
                        {formik.errors.file_name}
                      </span>
                    )}
                  </label>
                  <label className="input">
                    <input
                      readOnly
                      placeholder="Enter filename"
                      autoComplete="off"
                      {...formik.getFieldProps('file_name')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.file_name && formik.errors.file_name
                      })}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900 flex items-center gap-3">
                    Month
                    {formik.touched.month &&
                      formik.errors.month && (
                        <span role="alert" className="text-danger text-xs">
                          {formik.errors.month}
                        </span>
                      )}
                  </label>
                  <label className="input p-0 border-none">
                    <select
                      className={clsx('form-control select', {
                        'is-invalid':
                          formik.touched.month &&
                          formik.errors.month
                      })}
                      {...formik.getFieldProps('month')}
                    >
                      <option value="">Select Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </label>
                </div>

                <div className="flex flex-col gap-1 justify-end pb-2 w-full col-span-1 md:col-span-2">
                  {/* Footer Buttons */}
                  <div className="flex items-center gap-2.5 justify-end">
                    <button
                      onClick={() => {
                        onClose();
                        formik.resetForm();
                        setLogo([]);
                      }}
                      className="btn btn-sm btn-light w-20 flex justify-center items-center"
                      data-modal-dismiss="true"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary w-20 flex justify-center items-center"
                      disabled={loading || formik.isSubmitting}
                    >
                      {loading ? 'Please wait...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export { BuildReport };
