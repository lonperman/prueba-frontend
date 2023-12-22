import React from 'react';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import logo from "../../assets/helpdesk.jpg"
import useRegister from './useRegister';


function Register() {
   
    const {
        formik,
        toastCreateUser
    } = useRegister()
    
    return (
        <div className='flex align-items-center justify-content-center'>
            <Toast ref={toastCreateUser} position="bottom-left" />
            <div className='flex align-items-center justify-content-center w-full m-8'>
                <form onSubmit={formik.handleSubmit} className='card shadow-2 border-round w-6 m-8 bg-gray-300'>
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
                            <InputText
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder='Email'
                                className='w-full'
                            />
                            {formik.errors.email && formik.touched.email && (
                                <small className='p-error'>{formik.errors.email}</small>
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
                        <span className="mb-2">
                            <Password
                                id="confirmpassword"
                                name="confirmpassword"
                                value={formik.values.confirmpassword}
                                onChange={formik.handleChange}
                                placeholder='Confirm Password'
                                toggleMask
                                feedback={false}
                                className='w-full'
                                inputClassName='w-full'
                            />
                            {formik.errors.confirmpassword && formik.touched.confirmpassword && (
                                <small className='p-error'>{formik.errors.confirmpassword}</small>
                            )}
                        </span>
                        <Button
                            type='submit'
                            label='Create User'
                            severity='success'
                            className='w-full mb-2'
                        />
                        <div className='flex justify-content-center'>
                            <span className='uppercase font-medium'>already have an account ? <Link to="/login" className='no-underline'>Login</Link></span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;