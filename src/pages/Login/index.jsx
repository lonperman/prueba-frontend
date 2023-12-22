import React from 'react';
import { Link } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import logo from "../../assets/helpdesk.jpg"
import useLogin from './useLogin';

function Login() {

  const {
    toastCreateUser,
    formik
  } = useLogin()

  return (
    <div className='flex align-items-center justify-content-center '>
      <Toast ref={toastCreateUser} position="bottom-left" />
      <div className='flex align-items-center justify-content-center w-full m-8'>
        <form onSubmit={formik.handleSubmit} className='card shadow-3 border-round w-6 m-8 bg-gray-300'>
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
              <span className='uppercase font-medium'>
                Don't have an account ?
                <Link to="/register" className='no-underline'>
                  Register
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;