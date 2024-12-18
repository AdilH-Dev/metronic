import React, { forwardRef, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader, ModalTitle } from '@/components/modal';
import { KeenIcon } from '@/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { ImageInput } from '@/components/image-input';
import axios from 'axios';
import toast from 'react-hot-toast';
const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const BACKEND_IMAGE_URL = import.meta.env.VITE_APP_BACKEND_IMAGE_URL;

const ModalPartner = forwardRef(({ open, onClose, id = null, callApi }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [logo, setLogo] = useState([]);

  // console.log(logo, 'popopopo');

  const togglePassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  // Validation schema
  const loginSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string()
      .matches(/^\d{4}$|^\d{8}$/, 'Key must be exactly 4 or 8 digits') // Allow either 4 or 8 digits
      .required('Key is required'),
    logo: Yup.mixed().required('Logo is required'),
    contact: Yup.string().required('Contact Name is required'),
    phoneNo: Yup.string()
      .matches(/^\d+(\s\d+)*$/, 'Phone no contain only numbers')
      .required('Phone number is required')
  });

  const initialValues = {
    name: '',
    email: '',
    address: '',
    password: '',
    contact: '',
    phoneNo: '',
    logo: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      if (values?.logo?.file != null) {
        formData.append('logo', values?.logo?.file); // Assuming `logo` is the file
      }
      formData.append('name', values?.name);
      formData.append('email', values?.email);
      formData.append('address', values?.address);
      formData.append('key', values?.password);
      formData.append('contact', values?.contact);
      formData.append('phoneNo', values?.phoneNo);
      if (id) {
        formData.append('id', id);
      }

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
          setLogo([]);
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

  const getEditPartnerData = async (passId) => {
    setEditLoading(true);
    try {
      const response = await axios.get(`${BACKEND_API_URL}extension-users/edit_data/${passId}`);
      if (response?.data?.success === true) {
        const data = response?.data?.data;
        const logoURL = data?.logo ? `${BACKEND_IMAGE_URL}${data?.logo}` : null;
        const logoValue = logoURL ? [{ dataURL: logoURL, file: null }] : []; // Ensure correct format

        // Update formik values
        formik.setValues({
          name: data?.name || '',
          email: data?.email || '',
          address: data?.address || '',
          password: +data?.key || '', // Map `pin` to `password`
          contact: data?.contact || '',
          phoneNo: data?.phoneNo || '',
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
      getEditPartnerData(id);
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
          password: data || '' // Map `pin` to `password`
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error('Error fetching edit data:', error);
    } finally {
      setEditLoading(false);
    }
  };

  console.log(formik.errors, 'formik.errorsformik.errors');

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
          <ModalTitle>Partners</ModalTitle>
          <button
            className="btn btn-sm btn-icon btn-light btn-clear shrink-0"
            onClick={() => {
              onClose();
              formik.resetForm();
              setLogo([]);
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
              <div className="flex flex-col gap-1">
                <label className="form-label text-gray-900 flex items-center gap-3">
                  Logo
                  {formik.touched.logo && formik.errors.logo && (
                    <span role="alert" className="text-danger text-xs">
                      {formik.errors.logo}
                    </span>
                  )}
                </label>
                <ImageInput
                  value={logo}
                  onChange={(selectedLogo) => {
                    setLogo(selectedLogo);
                    formik.setFieldValue('logo', selectedLogo.length > 0 ? selectedLogo[0] : null);
                  }}
                >
                  {({ onImageUpload }) => (
                    <div
                      className="flex items-center gap-4 border-[#464852] border rounded-[0.375rem] py-[4px] px-[12px] cursor-pointer bg-[#1f212a]"
                      onClick={onImageUpload}
                    >
                      {logo.length > 0 ? (
                        <img
                          src={logo[0].dataURL}
                          alt="logo"
                          className="w-[30px] h-[30px]  border"
                        />
                      ) : (
                        <div className="w-[30px] h-[30px]  border flex items-center justify-center text-gray-500">
                          <KeenIcon icon="user" />
                        </div>
                      )}
                      <span className="text-[#787a88] text-[13px] font-medium">
                        {logo.length > 0 ? 'Change Logo' : 'Upload Logo'}
                      </span>
                      <button
                        type="button"
                        className="ml-auto btn btn-sm btn-light"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLogo([]);
                          formik.setFieldValue('logo', null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </ImageInput>
              <div>
              <span className="text-[#787a88] text-[13px]">Size: 47x47 px</span>
              <span className="text-[#787a88] text-[13px] ms-4">Types: JPG, JPEG, PNG</span>
              </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900 flex items-center gap-3">
                    Partner
                    {formik.touched.name && formik.errors.name && (
                      <span role="alert" className="text-danger text-xs">
                        {formik.errors.name}
                      </span>
                    )}
                  </label>
                  <label className="input">
                    <input
                      placeholder="Enter partner name"
                      autoComplete="off"
                      {...formik.getFieldProps('name')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.name && formik.errors.name
                      })}
                    />
                  </label>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900 flex items-center gap-3">
                    Email
                    {formik.touched.email && formik.errors.email && (
                      <span role="alert" className="text-danger text-xs">
                        {formik.errors.email}
                      </span>
                    )}
                  </label>
                  <label className="input">
                    <input
                      placeholder="Enter email"
                      autoComplete="off"
                      {...formik.getFieldProps('email')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.email && formik.errors.email
                      })}
                    />
                  </label>
                </div>

                {/* Address Field */}
                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900 flex items-center gap-3">
                    Address
                    {formik.touched.address && formik.errors.address && (
                      <span role="alert" className="text-danger text-xs">
                        {formik.errors.address}
                      </span>
                    )}
                  </label>
                  <label className="input">
                    <input
                      placeholder="Enter address"
                      autoComplete="off"
                      {...formik.getFieldProps('address')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.address && formik.errors.address
                      })}
                    />
                  </label>
                </div>

                {/* the contact */}
                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900 flex items-center gap-3">
                    Contact Name
                    {formik.touched.contact && formik.errors.contact && (
                      <span role="alert" className="text-danger text-xs">
                        {formik.errors.contact}
                      </span>
                    )}
                  </label>
                  <label className="input">
                    <input
                      placeholder="Enter contact"
                      autoComplete="off"
                      {...formik.getFieldProps('contact')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.contact && formik.errors.contact
                      })}
                    />
                  </label>
                </div>

                {/* phone number */}

                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900 flex items-center gap-3">
                    Phone No
                    {formik.touched.phoneNo && formik.errors.phoneNo && (
                      <span role="alert" className="text-danger text-xs">
                        {formik.errors.phoneNo}
                      </span>
                    )}
                  </label>
                  <label className="input">
                    <input
                      placeholder="Enter phoneNo"
                      autoComplete="off"
                      {...formik.getFieldProps('phoneNo')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.phoneNo && formik.errors.phoneNo
                      })}
                    />
                  </label>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-1">
                    <label className="form-label text-gray-900 flex items-center gap-3">
                      Key
                      {formik.touched.password && formik.errors.password && (
                        <span role="alert" className="text-danger text-xs">
                          {formik.errors.password}
                        </span>
                      )}
                    </label>
                  </div>
                  <label className="input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter key"
                      autoComplete="off"
                      {...formik.getFieldProps('password')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.password && formik.errors.password
                      })}
                    />
                    <button className="btn btn-icon" onClick={togglePassword}>
                      <KeenIcon
                        icon="eye"
                        className={clsx('text-gray-500', { hidden: showPassword })}
                      />
                      <KeenIcon
                        icon="eye-slash"
                        className={clsx('text-gray-500', { hidden: !showPassword })}
                      />
                    </button>
                  </label>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center gap-2.5 justify-end py-2">
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
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export { ModalPartner };
