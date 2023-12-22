import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { loginRoute } from '../../utils/APIRoutes';

const useLogin = () => {
    const toastCreateUser = useRef(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (localStorage.getItem(process.env.LOCALHOST_KEY)) {
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
          localStorage.setItem(process.env.LOCALHOST_KEY, JSON.stringify(data.user));
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

    return {
        formik,
        toastCreateUser,
    }
}

export default useLogin;