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

const ModalPayee = forwardRef(({ open, onClose, id = null, callApi }, ref) => {

  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const togglePassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  // Validation schema
  const loginSchema = Yup.object().shape({
    payee_name: Yup.string().required('Payee name is required'),
    company_name: Yup.string().required('Business name is required'),
    bic_code: Yup.string().required('Sort code is required'),
    address: Yup.string().required('Address is required'),
    account_number: Yup.string().required('Account number is required'),
    iban_number: Yup.string().required('IBAN is required'),
    // phoneNo: Yup.string()
      // .required('Phone number is required')
      // .test('is-valid-phone', 'Invalid phone number', (value) => isPhoneValid(value)),
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      // .required('Email is required')
  });

  const initialValues = {
    payee_name: '',
    company_name: '',
    bic_code: '',
    address: '',
    account_number: '',
    iban_number: '',
    phoneNo: '',
    email: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('payee_name', values?.payee_name);
      formData.append('company_name', values?.company_name);
      formData.append('bic_code', values?.bic_code);
      formData.append('address', values?.address);
      formData.append('account_number', values?.account_number);
      formData.append('iban_number', values?.iban_number);
      formData.append('phoneNo', values?.phoneNo);
      formData.append('email', values?.email);
      if (id) {
        formData.append('id', id);
      }

      try {
        let response;
        if (id) {
          response = await axios.post(`${BACKEND_API_URL}accountant-users/exe-edit-payee/${id}`, formData);
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
    const body ={
      payee_id:passId
    }
    try {
      const response = await axios.post(`${BACKEND_API_URL}accountant-users/payee`,body);
      if (response?.data?.success === true) {
        const data = response?.data?.data;

        formik.setValues({
          payee_name: data?.payee_name || '',
          company_name: data?.company_name || '',
          bic_code: data?.bic_code || '',
          address: data?.address || '',
          account_number: data?.account_number || '',
          iban_number: data?.iban_number || '',
          phoneNo: data?.phoneNo || '',
          email: data?.email || '',
        });
        
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
    // if (!id && open) {
    //   getKeyGenator();
    // }
  }, [id, open]);

  // const getKeyGenator = async () => {
  //   setEditLoading(true);
  //   try {
  //     const response = await axios.get(`${BACKEND_API_URL}extension-users/generate-key`);
  //     if (response?.data?.success === true) {
  //       const data = response?.data?.data;
  //       formik.setValues({
  //         company_name: '',
  //         company_no: '',
  //         email: '',
  //         address: '',
  //         name: '',
  //         phoneNo: '',
  //         logo: null, // Set formik value
  //         password: data || '' // Map `pin` to `password`
  //       });
  //     }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message);
  //     console.error('Error fetching edit data:', error);
  //   } finally {
  //     setEditLoading(false);
  //   }
  // };

  const handleSmsIconClick = (event) => {
    // Prevent default behavior and stop event propagation
    event.preventDefault();
    event.stopPropagation();
  };

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
          <ModalTitle>Payee</ModalTitle>
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

                 {/* Name Field */}
                 <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900 flex items-center gap-3">
                    Payee
                    {formik.touched.payee_name && formik.errors.payee_name && (
                      <span role="alert" className="text-danger text-xs">
                        {formik.errors.payee_name}
                      </span>
                    )}
                  </label>
                  <label className="input">
                    <input
                      placeholder="Enter payee name"
                      autoComplete="off"
                      {...formik.getFieldProps('payee_name')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.payee_name && formik.errors.payee_name
                      })}
                    />
                  </label>
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
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
                      placeholder="Enter business name"
                      autoComplete="off"
                      readOnly
                      {...formik.getFieldProps('company_name')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.company_name && formik.errors.company_name
                      })}
                    />
                  </label>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1">
                  <label className="form-label text-gray-900 flex items-center gap-3">
                    Sort Code
                    {formik.touched.bic_code && formik.errors.bic_code && (
                      <span role="alert" className="text-danger text-xs">
                        {formik.errors.bic_code}
                      </span>
                    )}
                  </label>
                  <label className="input">
                    <input
                      placeholder="Enter sort code"
                      autoComplete="off"
                      {...formik.getFieldProps('bic_code')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.bic_code && formik.errors.bic_code
                      })}
                    />
                                         {/* <img
                     onClick={handleSmsIconClick}
                      className="h-[20px] w-[20px] cursor-pointer"
                      src="/media/brand-logos/emailIcon.png"
                      alt=""
                    /> */}
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
                    Account No
                    {formik.touched.account_number && formik.errors.account_number && (
                      <span role="alert" className="text-danger text-xs">
                        {formik.errors.account_number}
                      </span>
                    )}
                  </label>
                  <label className="input">
                    <input
                      placeholder="Enter account number"
                      autoComplete="off"
                      {...formik.getFieldProps('account_number')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.account_number && formik.errors.account_number
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
                  <label className="input relative pr-0">
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
                    <img
                     onClick={handleSmsIconClick}
                      className="h-[20px] w-[20px] absolute right-[12px] cursor-pointer"
                      src="/media/brand-logos/smsIcon.png"
                      alt=""
                    />
                  </label>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-1">
                    <label className="form-label text-gray-900 flex items-center gap-3">
                      IBAN
                      {formik.touched.iban_number && formik.errors.iban_number && (
                        <span role="alert" className="text-danger text-xs">
                          {formik.errors.iban_number}
                        </span>
                      )}
                    </label>
                  </div>
                  <label className="input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter IBAN"
                      autoComplete="off"
                      {...formik.getFieldProps('iban_number')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.iban_number && formik.errors.iban_number
                      })}
                    />
                    <button className="btn btn-icon" onClick={togglePassword}>
                      {/* <KeenIcon
                        icon="eye"
                        className={clsx('text-gray-500', { hidden: showPassword })}
                      />
                      <KeenIcon
                        icon="eye-slash"
                        className={clsx('text-gray-500', { hidden: !showPassword })}
                      /> */}
                    </button>
                  </label>
                </div>
                {/* company no Field */}
                {/* <div className="flex flex-col gap-1 pb-2">
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
                      placeholder="Enter 8 digit company no"
                      autoComplete="off"
                      {...formik.getFieldProps('company_no')}
                      className={clsx('form-control', {
                        'is-invalid': formik.touched.company_no && formik.errors.company_no
                      })}
                    />
                  </label>
                  <div>
                    <span className="text-[#787a88] text-[13px]">Enter 8 digit company number</span>
                  </div>
                </div> */}

                <div className="flex flex-col gap-1 pb-2">
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
                                         <img
                     onClick={handleSmsIconClick}
                      className="h-[20px] w-[20px] cursor-pointer"
                      src="/media/brand-logos/emailIcon.png"
                      alt=""
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-1 justify-end pb-2">
                  {/* Footer Buttons */}
                  <div className="flex items-center gap-2.5 justify-end">
                    <button
                      onClick={() => {
                        onClose();
                        formik.resetForm();
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

export { ModalPayee };
