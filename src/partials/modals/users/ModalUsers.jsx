import React, { forwardRef, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalHeader, ModalTitle } from '@/components/modal';
import { KeenIcon } from '@/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import axios from 'axios';
import toast from 'react-hot-toast';
const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;

const ModalUsers = forwardRef(({ open, onClose, id = null, callApi }, ref) => {
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const handleDelete = (event,index) => {
    event.preventDefault();
    const userField = `user${index + 1}`;
  const pinField = `pin${index + 1}`;

  // Remove from Formik values
  formik.setFieldValue(userField, '');
  formik.setFieldValue(pinField, '');
  };

  // Validation schema
  const loginSchema = Yup.object().shape({
    company_name: Yup.string().required('Business name is required'),
    // user1: Yup.string().required('User is required'),
    // pin1: Yup.string()
    //   .required('PIN 1 is required')
    //   .matches(/^\d{4}$/, 'Must be 4 digits'),
    pin1: Yup.string().test('pin1-validation', 'Must be 4 digits', function (value) {
      const { user1 } = this.parent; // Access the form's values using `this.parent`

      // If user2 exists and pin2 is empty, we need to throw an error for pin2 being required
      if (user1 && user1.length > 0) {
        if (!value || value.length === 0) {
          return this.createError({ message: 'PIN is required' });
        }
        // If pin2 has a value, check if it contains exactly 4 digits
        return /^\d{4}$/.test(value);
      }

      // If user2 doesn't have a value, pin2 doesn't need to be required, but validate if provided
      if (value && value.length > 0) {
        return /^\d{4}$/.test(value); // Check for 4-digit PIN if provided
      }

      // If user2 is not provided and pin2 is empty, it's considered valid
      return true;
    }),

    user1: Yup.string().test('user1-validation', 'User is required', function (value) {
      const { pin1 } = this.parent; // Access the form's values using `this.parent`

      // If pin2 exists and is provided, user2 must also be provided
      if (pin1 && pin1.length > 0 && !value) {
        return this.createError({ message: 'User is required' });
      }

      return true; // Otherwise, user2 is not required if pin2 is not filled
    }),
    pin2: Yup.string().test('pin2-validation', 'Must be 4 digits', function (value) {
      const { user2 } = this.parent; // Access the form's values using `this.parent`

      // If user2 exists and pin2 is empty, we need to throw an error for pin2 being required
      if (user2 && user2.length > 0) {
        if (!value || value.length === 0) {
          return this.createError({ message: 'PIN is required' });
        }
        // If pin2 has a value, check if it contains exactly 4 digits
        return /^\d{4}$/.test(value);
      }

      // If user2 doesn't have a value, pin2 doesn't need to be required, but validate if provided
      if (value && value.length > 0) {
        return /^\d{4}$/.test(value); // Check for 4-digit PIN if provided
      }

      // If user2 is not provided and pin2 is empty, it's considered valid
      return true;
    }),

    user2: Yup.string().test('user2-validation', 'User is required', function (value) {
      const { pin2 } = this.parent; // Access the form's values using `this.parent`

      // If pin2 exists and is provided, user2 must also be provided
      if (pin2 && pin2.length > 0 && !value) {
        return this.createError({ message: 'User is required' });
      }

      return true; // Otherwise, user2 is not required if pin2 is not filled
    }),

    pin3: Yup.string().test('pin3-validation', 'Must be 4 digits', function (value) {
      const { user3 } = this.parent; // Access the form's values using `this.parent`

      // If user3 exists and pin3 is empty, we need to throw an error for pin3 being required
      if (user3 && user3.length > 0) {
        if (!value || value.length === 0) {
          return this.createError({ message: 'PIN is required' });
        }
        // If pin3 has a value, check if it contains exactly 4 digits
        return /^\d{4}$/.test(value);
      }

      // If user3 doesn't have a value, pin3 doesn't need to be required, but validate if provided
      if (value && value.length > 0) {
        return /^\d{4}$/.test(value); // Check for 4-digit PIN if provided
      }

      // If user3 is not provided and pin3 is empty, it's considered valid
      return true;
    }),

    user3: Yup.string().test('user3-validation', 'User is required', function (value) {
      const { pin3 } = this.parent; // Access the form's values using `this.parent`

      // If pin3 exists and is provided, user3 must also be provided
      if (pin3 && pin3.length > 0 && !value) {
        return this.createError({ message: 'User is required' });
      }

      return true; // Otherwise, user3 is not required if pin3 is not filled
    }),

    pin4: Yup.string().test('pin4-validation', 'Must be 4 digits', function (value) {
      const { user4 } = this.parent; // Access the form's values using `this.parent`

      // If user4 exists and pin4 is empty, we need to throw an error for pin4 being required
      if (user4 && user4.length > 0) {
        if (!value || value.length === 0) {
          return this.createError({ message: 'PIN is required' });
        }
        // If pin4 has a value, check if it contains exactly 4 digits
        return /^\d{4}$/.test(value);
      }

      // If user4 doesn't have a value, pin4 doesn't need to be required, but validate if provided
      if (value && value.length > 0) {
        return /^\d{4}$/.test(value); // Check for 4-digit PIN if provided
      }

      // If user4 is not provided and pin4 is empty, it's considered valid
      return true;
    }),

    user4: Yup.string().test('user4-validation', 'User is required', function (value) {
      const { pin4 } = this.parent; // Access the form's values using `this.parent`

      // If pin4 exists and is provided, user4 must also be provided
      if (pin4 && pin4.length > 0 && !value) {
        return this.createError({ message: 'User is required' });
      }

      return true; // Otherwise, user4 is not required if pin4 is not filled
    })
  });

  const initialValues = {
    company_name: '',
    user1: '',
    pin1: '',
    user2: '',
    pin2: '',
    user3: '',
    pin3: '',
    user4: '',
    pin4: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const users = [];
      for (let i = 1; i <= 4; i++) {
        if (values[`id${i}`]) {
          users.push({
            id: values[`id${i}`] || '', // Always include id, set to "" if not present
            name: values[`user${i}`] || '',
            pin: values[`pin${i}`] || ''
          });
        } else if (values[`user${i}`] || values[`pin${i}`]) {
          users.push({
            name: values[`user${i}`] || '',
            pin: values[`pin${i}`] || ''
          });
        }
      }

      const payload = {
        users
      };

      try {
        let response;
        if (id) {
          response = await axios.post(
            `${BACKEND_API_URL}accountant-users/customer-user/${id}`,
            payload
          );
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

  const getEditUserData = async (passId) => {
    setEditLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}accountant-users/get-user-by-id/${passId}`
      );
      if (response?.data?.success === true) {
        const data = response?.data?.data;
        // const users = response?.data?.data?.users
        let users = response?.data?.data?.users || [];

        // Ensure 4 user slots (fill missing ones)
        while (users.length < 4) {
          users.push({ id: '', name: '', pin: '' });
        }
        // Prepare Formik values dynamically
        const formikValues = {
          company_name: data?.company_name || ''
        };

        users?.forEach((user, index) => {
          formikValues[`id${index + 1}`] = user?.id || '';
          formikValues[`user${index + 1}`] = user?.name || '';
          formikValues[`pin${index + 1}`] = user?.pin || '';
        });

        formik.setValues(formikValues);

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
      getEditUserData(id);
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
  //       // Update formik values
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

  // Prevent default behavior and stop event propagation
  // const handleSmsIconClick = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  // };

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
          <ModalTitle>Users</ModalTitle>
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
                    placeholder="Enter payee name"
                    autoComplete="off"
                    readOnly
                    {...formik.getFieldProps('company_name')}
                    className={clsx('form-control', {
                      'is-invalid': formik.touched.company_name && formik.errors.company_name
                    })}
                  />
                </label>
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="form-label text-gray-900 flex items-center gap-3">
                      User
                      {formik.touched.user1 && formik.errors.user1 && (
                        <span role="alert" className="text-danger text-xs">
                          {formik.errors.user1}
                        </span>
                      )}
                    </label>
                    <label className="input">
                      <input
                        placeholder="Enter user name"
                        autoComplete="off"
                        {...formik.getFieldProps('user1')}
                        className={clsx('form-control', {
                          'is-invalid': formik.touched.user1 && formik.errors.user1
                        })}
                      />
                    </label>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-1">
                      <label className="form-label text-gray-900 flex items-center gap-3">
                        PIN
                        {formik.touched.pin1 && formik.errors.pin1 && (
                          <span role="alert" className="text-danger text-xs">
                            {formik.errors.pin1}
                          </span>
                        )}
                      </label>
                    </div>
                    <label className="input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter pin"
                        autoComplete="off"
                        {...formik.getFieldProps('pin1')}
                        className={clsx('form-control', {
                          'is-invalid': formik.touched.pin1 && formik.errors.pin1
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

                  <div className="flex flex-col gap-1">
                    <label className="form-label text-gray-900 flex items-center gap-3">
                      User
                      {formik.touched.user2 && formik.errors.user2 && (
                        <span role="alert" className="text-danger text-xs">
                          {formik.errors.user2}
                        </span>
                      )}
                    </label>
                    <label className="input">
                      <input
                        placeholder="Enter user name"
                        autoComplete="off"
                        {...formik.getFieldProps('user2')}
                        className={clsx('form-control', {
                          'is-invalid': formik.touched.user2 && formik.errors.user2
                        })}
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-1">
                      <label className="form-label text-gray-900 flex items-center gap-3">
                        PIN
                        {formik.touched.pin2 && formik.errors.pin2 && (
                          <span role="alert" className="text-danger text-xs">
                            {formik.errors.pin2}
                          </span>
                        )}
                      </label>
                    </div>
                    <label className="input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter pin"
                        autoComplete="off"
                        {...formik.getFieldProps('pin2')}
                        className={clsx('form-control', {
                          'is-invalid': formik.touched.pin2 && formik.errors.pin2
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

                  <div className="flex flex-col gap-1">
                    <label className="form-label text-gray-900 flex items-center gap-3">
                      User
                      {formik.touched.user3 && formik.errors.user3 && (
                        <span role="alert" className="text-danger text-xs">
                          {formik.errors.user3}
                        </span>
                      )}
                    </label>
                    <label className="input">
                      <input
                        placeholder="Enter user name"
                        autoComplete="off"
                        {...formik.getFieldProps('user3')}
                        className={clsx('form-control', {
                          'is-invalid': formik.touched.user3 && formik.errors.user3
                        })}
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-1">
                      <label className="form-label text-gray-900 flex items-center gap-3">
                        PIN
                        {formik.touched.pin3 && formik.errors.pin3 && (
                          <span role="alert" className="text-danger text-xs">
                            {formik.errors.pin3}
                          </span>
                        )}
                      </label>
                    </div>
                    <label className="input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter pin"
                        autoComplete="off"
                        {...formik.getFieldProps('pin3')}
                        className={clsx('form-control', {
                          'is-invalid': formik.touched.pin3 && formik.errors.pin3
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

                  <div className="flex flex-col gap-1">
                    <label className="form-label text-gray-900 flex items-center gap-3">
                      User
                      {formik.touched.user4 && formik.errors.user4 && (
                        <span role="alert" className="text-danger text-xs">
                          {formik.errors.user4}
                        </span>
                      )}
                    </label>
                    <label className="input">
                      <input
                        placeholder="Enter user name"
                        autoComplete="off"
                        {...formik.getFieldProps('user4')}
                        className={clsx('form-control', {
                          'is-invalid': formik.touched.user4 && formik.errors.user4
                        })}
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-1">
                      <label className="form-label text-gray-900 flex items-center gap-3">
                        PIN
                        {formik.touched.pin4 && formik.errors.pin4 && (
                          <span role="alert" className="text-danger text-xs">
                            {formik.errors.pin4}
                          </span>
                        )}
                      </label>
                    </div>
                    <label className="input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter IBAN"
                        autoComplete="off"
                        {...formik.getFieldProps('pin4')}
                        className={clsx('form-control', {
                          'is-invalid': formik.touched.pin4 && formik.errors.pin4
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
                </div> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => {
                  const userField = `user${index + 1}`;
                  const pinField = `pin${index + 1}`;

                  return (
                    <React.Fragment key={index}>
                      {/* User Input */}
                      <div className="flex flex-col gap-1">
                        <label className="form-label text-gray-900 flex items-center gap-3">
                          User
                          {formik.touched[userField] && formik.errors[userField] && (
                            <span role="alert" className="text-danger text-xs">
                              {formik.errors[userField]}
                            </span>
                          )}
                        </label>
                        <label className="input">
                          <input
                            placeholder="Enter user name"
                            autoComplete="off"
                            {...formik.getFieldProps(userField)}
                            className={clsx('form-control', {
                              'is-invalid': formik.touched[userField] && formik.errors[userField]
                            })}
                          />
                        </label>
                      </div>

                      {/* PIN Input */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-1">
                          <label className="form-label text-gray-900 flex items-center gap-3">
                            PIN
                            {formik.touched[pinField] && formik.errors[pinField] && (
                              <span role="alert" className="text-danger text-xs">
                                {formik.errors[pinField]}
                              </span>
                            )}
                          </label>
                        </div>
                        <label className="input">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter pin"
                            autoComplete="off"
                            {...formik.getFieldProps(pinField)}
                            className={clsx('form-control', {
                              'is-invalid': formik.touched[pinField] && formik.errors[pinField]
                            })}
                          />
                          <span
                          onClick={() => handleDelete(event, index)}
                            className={`badge badge-sm badge-outline badge-danger cursor-pointer`}
                          >
                            Delete
                          </span>
                          {/* <button className="btn btn-icon" onClick={togglePassword} type="button">
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
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="flex items-center  justify-end py-2">
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
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export { ModalUsers };
