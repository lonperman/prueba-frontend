import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import logo from "../assets/helpdesk.jpg"

function Login() {
  const toastCreateUser = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('required field'),
      password: Yup.string().required('required field'),
    }),
    onSubmit: async (values) => {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username, password
      });
      if (data.status === false) {
        showError()
      }
      if (data.status === true) {
        showSucces();
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        setTimeout(() => {
          navigate('/')
        }, 1000)
      }
    }
  })

  const showSucces = () => {
    toastCreateUser.current?.show({
      severity: "success",
      summary: "Success",
      detail: 'Login Correct',
      life: 1000,
    });
  }

  const showError = () => {
    toastCreateUser.current?.show({
      severity: "error",
      summary: "Error",
      detail: 'Incorrect username or password',
      life: 1000,
    });
  }

  return (
    <div className='flex align-items-center justify-content-center bg-gray-300'>
      <Toast ref={toastCreateUser} position="bottom-left" />
      <div className='flex align-items-center justify-content-center w-full m-8'>
        <form onSubmit={formik.handleSubmit} className='card shadow-3 border-round w-6 m-8 bg-gray-100'>
          <div className='flex flex-column justify-content-center align-items-center mt-3'>
            <img
              src={logo}
              alt="logo"
              className='h-5rem w-5rem'
            />
            <h1>Help Desk</h1>
          </div>
          <div className='flex flex-column m-2'>
            <span className="mb-2">
              <InputText
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder='Username'
                className='w-full'
              />
              {formik.errors.username && formik.touched.username && (
                <small className='p-error'>{formik.errors.username}</small>
              )}
            </span>
            <span className="mb-2">
              <Password
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                toggleMask
                feedback={false}
                className='w-full'
                inputClassName='w-full'
                placeholder='Password'
              />
              {formik.errors.password && formik.touched.password && (
                <small className='p-error'>{formik.errors.password}</small>
              )}
            </span>
            <Button
              type='submit'
              label='Login User'
              severity='success'
              className='w-full mb-2'
            />
            <div className='flex justify-content-center'>
              <span className='uppercase font-medium'>Don't have an account ? <Link to="/register" className='no-underline'>Register</Link></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;