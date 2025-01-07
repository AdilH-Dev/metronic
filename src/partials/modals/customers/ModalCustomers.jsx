import React, { forwardRef, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader, ModalTitle } from '@/components/modal';
import { KeenIcon } from '@/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { ImageInput } from '@/components/image-input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { parse, format } from 'date-fns';
const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const BACKEND_IMAGE_URL = import.meta.env.VITE_APP_BACKEND_IMAGE_URL;

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const ModalCustomers = forwardRef(({ open, onClose, id = null, callApi }, ref) => {
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [logo, setLogo] = useState([]);

  const togglePassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  // Validation schema
  const loginSchema = Yup.object().shape({
    company_name: Yup.string().required('required'),
    company_no: Yup.string()
      .matches(/^\d{8}$/, 'Must be 8 digits') // Allow only 8 digits
      .required('Company no is required'),
    name: Yup.string().required('Contact Name is required'),
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    address: Yup.string().required('Address is required'),
    phoneNo: Yup.string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Invalid phone number', (value) => isPhoneValid(value)),
    status: Yup.string().required('Status is required'),
    package_expiry_date: Yup.string().required('Expires is required')
  });

  const initialValues = {
    company_name: '',
    company_no: '',
    name: '',
    email: '',
    address: '',
    phoneNo: '',
    accountant_purchasing_plan_id: '',
    package_expiry_date: '',
    status: '1'
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('company_name', values?.company_name);
      formData.append('company_no', values?.company_no);
      formData.append('name', values?.name);
      formData.append('email', values?.email);
      formData.append('address', values?.address);
      formData.append('phoneNo', values?.phoneNo);
      formData.append(
        'accountant_purchasing_plan_id',
        values?.accountant_purchasing_plan_id === '' ? null : values?.accountant_purchasing_plan_id
      );
      formData.append('package_expiry_date', format(values?.package_expiry_date, 'dd-MM-yyyy'));
      formData.append('status', values?.status);
      formData.append('user_type', 'customer');
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
        console.log(data?.package_expiry_date);
        let date;
        if (data?.package_expiry_date) {
          date = parse(data?.package_expiry_date, 'dd-MM-yyyy', new Date());
        } else {
          date = '';
        }
        formik.setValues({
          company_name: data?.company_name || '',
          company_no: data?.company_number || '',
          name: data?.name || '',
          email: data?.email || '',
          address: data?.address || '',
          phoneNo: data?.phoneNo || '',
          status: data?.status === '1' ? '1' : '0' || '',
          accountant_purchasing_plan_id: data?.accountant_purchasing_plan_id || '',
          package_expiry_date: date ? format(date, 'yyyy-MM-dd') : ''
        });

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
  }, [id]);

  // console.log(formik.errors,"errorooroor")
  console.log(formik.values, 'valuesssss');

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        formik.resetForm();
      }}
      ref={ref}
    >
      <ModalContent className="max-w-[600px] top-[15%]">
        <ModalHeader>
          <ModalTitle>Customers</ModalTitle>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Field */}
                {/* <div className="flex flex-col gap-1">
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
                      formik.setFieldValue(
                        'logo',
                        selectedLogo.length > 0 ? selectedLogo[0] : null
                      );
                    }}
                  >
                    {({ onImageUpload }) => (
                      <div
                        className="flex items-center gap-4 border-[#464852] border rounded-[0.375rem] h-[39px] px-[12px] cursor-pointer bg-[#1f212a]"
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
                </div> */}

                {/* Business Name Field */}
                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900 flex items-center gap-3">
                    Business Name
                    {formik.touched.company_name && formik.errors.company_name && (
                      <span role="alert" className="text-danger text-xs">
                        {formik.errors.company_name}
                      </span>
                    )}
                  </label>
                  <label className="input">
                    <input
                      placeholder="Enter Business name"
                      autoComplete="off"
                      {...formik.getFieldProps('company_name')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.company_name && formik.errors.company_name
                      })}
                    />
                  </label>
                </div>
                {/* Company No Field */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-1">
                    <label className="form-label text-gray-900 flex items-center gap-3">
                      Company No
                      {formik.touched.company_no && formik.errors.company_no && (
                        <span role="alert" className="text-danger text-xs">
                          {formik.errors.company_no}
                        </span>
                      )}
                    </label>
                  </div>
                  <label className="input">
                    <input
                      type={'tel'}
                      placeholder="Enter company no"
                      autoComplete="off"
                      {...formik.getFieldProps('company_no')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.company_no && formik.errors.company_no
                      })}
                    />
                    {/* <button className="btn btn-icon" onClick={togglePassword}>
                      <KeenIcon
                        icon="eye"
                        className={clsx('text-gray-500', { hidden: showPassword })}
                      />
                      <KeenIcon
                        icon="eye-slash"
                        className={clsx('text-gray-500', { hidden: !showPassword })}
                      />
                    </button> */}
                  </label>
                  <div>
                    <span className="text-[#787a88] text-[13px]">Enter 8 digit company number</span>
                    {/* <span className="text-[#787a88] text-[13px] ms-4">Types: JPG, JPEG, PNG</span> */}
                  </div>
                </div>

                {/* the contact */}
                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900 flex items-center gap-3">
                    Contact Name
                    {formik.touched.name && formik.errors.name && (
                      <span role="alert" className="text-danger text-xs">
                        {formik.errors.name}
                      </span>
                    )}
                  </label>
                  <label className="input">
                    <input
                      placeholder="Enter contact name"
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
                    {/* <input
                      placeholder="Enter phoneNo"
                      autoComplete="off"
                      {...formik.getFieldProps('phoneNo')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.phoneNo && formik.errors.phoneNo
                      })}
                    /> */}
                    <PhoneInput
                      value={formik.values.phoneNo}
                      onChange={(value) => formik.setFieldValue('phoneNo', value)}
                      // {...formik.getFieldProps('phoneNo')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.phoneNo && formik.errors.phoneNo
                      })}
                      defaultCountry="gb"
                      placeholder="Enter your mobile"
                      inputStyle={{
                        backgroundColor: 'transparent',
                        marginBottom: '0', // Matches `mb-0`
                        fontSize: '13px', // Matches `text-[14px]`
                        borderRadius: '0px',
                        color: '#9a9cae', // Matches `text-[#212058]`
                        width: '100%', // Takes up full width
                        border: 'none', // Removes additional borders
                        outline: 'none' // Removes focus outline
                      }}
                    />
                  </label>
                </div>

                {/* Package Type Field */}
                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900 flex items-center gap-3">
                    Package Type
                    {formik.touched.accountant_purchasing_plan_id &&
                      formik.errors.accountant_purchasing_plan_id && (
                        <span role="alert" className="text-danger text-xs">
                          {formik.errors.accountant_purchasing_plan_id}
                        </span>
                      )}
                  </label>
                  <label className="input p-0 border-none">
                    <select
                      className={clsx('form-control select', {
                        'is-invalid':
                          formik.touched.accountant_purchasing_plan_id &&
                          formik.errors.accountant_purchasing_plan_id
                      })}
                      {...formik.getFieldProps('accountant_purchasing_plan_id')}
                    >
                      <option value="">Select Package Type</option>
                      <option value="1">Start Pack</option>
                      <option value="2">Pro Pack</option>
                    </select>
                  </label>
                </div>

                {/* key Field */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-1">
                    <label className="form-label text-gray-900 flex items-center gap-3">
                      Expires
                      {formik.touched.package_expiry_date && formik.errors.package_expiry_date && (
                        <span role="alert" className="text-danger text-xs">
                          {formik.errors.package_expiry_date}
                        </span>
                      )}
                    </label>
                  </div>
                  <label className="input">
                    <input
                      // type={showPassword ? 'text' : 'password'}
                      type="date"
                      placeholder=""
                      autoComplete="off"
                      {...formik.getFieldProps('package_expiry_date')}
                      className={clsx('form-control', {
                        'is-invalid':
                          formik.touched.package_expiry_date && formik.errors.package_expiry_date
                      })}
                    />
                    {/* <button className="btn btn-icon" onClick={togglePassword}>
                      <KeenIcon
                        icon="eye"
                        className={clsx('text-gray-500', { hidden: showPassword })}
                      />
                      <KeenIcon
                        icon="eye-slash"
                        className={clsx('text-gray-500', { hidden: !showPassword })}
                      />
                    </button> */}
                  </label>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center  justify-between py-2">
                <div className="flex items-center gap-2">
                  <label className="switch switch-sm">
                    <span className="switch-label">Status</span>
                    <input
                      type="checkbox"
                      value="1"
                      name="status"
                      checked={formik.values.status === '1'} // Check if the value is 1
                      onChange={(e) => formik.setFieldValue('status', e.target.checked ? '1' : '0')}
                      // readOnly
                      // {...formik.getFieldProps('status')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.status && formik.errors.status
                      })}
                    />
                    {formik.touched.status && formik.errors.status && (
                      <span role="alert" className="text-danger text-xs">
                        {formik.errors.status}
                      </span>
                    )}
                  </label>
                </div>
                <div className="flex items-center justify-end gap-2.5">
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
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export { ModalCustomers };
