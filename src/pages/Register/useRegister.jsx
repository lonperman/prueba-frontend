import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerRoute } from '../../utils/APIRoutes';
import { useRef } from 'react';

const useRegister = () => {
    const toastCreateUser = useRef(null);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmpassword: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('required field'),
            email: Yup.string().email('Invalid email address').required('required field'),
            password: Yup.string().required('required field').min(5, "Password have minimum 5 characters"),
            confirmpassword: Yup.string()
                .oneOf([Yup.ref('password'), ''], 'passwords do not match')
                .required('required field')
        }),
        onSubmit: async (values) => {
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username, email, password
            });
            if (data.status === false) {
                showError()
            }
            if (data.status === true) {
                showSucces();
                localStorage.setItem(process.env.REACT_APP_API_KEY, JSON.stringify(data.user));
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
            detail: 'User created',
            life: 1000,
        });
    }

    const showError = () => {
        toastCreateUser.current?.show({
            severity: "error",
            summary: "Error",
            detail: 'User no created',
            life: 1000,
        });
    }

    return {
        formik,
        toastCreateUser,
    }

}

export default useRegister;