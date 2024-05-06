'use client'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import * as Yup from "yup";
import style from "./style.module.css";
import { BASE_URL } from '@/lib/constants';
import { useRouter } from 'next/navigation';

  // define type by using type
  // we need some data for register
  // such as name, email, password1,2, first_name, and last_name
type RegisterValue = {
    email: string,
    name: string,
    password1: string,
    password2: string,
    first_name: string,
    last_name: string
}

// initialize the value to the RegisterValue
const initialzeValue : RegisterValue = {
    email     : '',
    name      : '',
    password1 : '',
    password2 : '',
    first_name: '',
    last_name : ''
}

// for check if the password is strong enough
// in summery
// Contains at least one uppercase letter
// Contains at least one lowercase letter
// Contains at least one digit
// Contains at least one special character from the provided set (@#$%^&*)
// Is at least 8 characters long
const passwordValidation = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*]).{8,}$");

// I use Yup library for validation
// by using this need to install (npm install yup --save)
const schemaValidation = Yup.object().shape({
    // for email is string if wrong it will display invalid email, and it is requred
    email: Yup.string().email("Invalid Email").required("Required!"),
    // for password1
    password1: Yup.string()
        // for this mean at least 8 character for password
        .min(8, "Password is too short, at least 8 characters")
        .matches(passwordValidation, 
            "1. Password must contain at least one"+
            "2. upper case English letter"+
            "3. one lower case English letter"+
            "4. one digit and one special character").required("Requred!"),
    // for password2
    password2: Yup.string()
            // the password we re input must be matched to the first one
            .oneOf([Yup.ref("password1")], "Password Must Be Matched")
            .required("Required!"),
    // for first name
    first_name: Yup.string().required("Requred!"),
    // for last name
    last_name: Yup.string().required("Requred!"),
})

// here is our function register
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

  // handle on submit
  const handleSubmit = (values: RegisterValue) => {
		setLoading(true);
		fetch(`${BASE_URL}/api/user/register/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setLoading(false);
				setSuccess(true)
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

  // if it is loading will display this
  if (loading) {
		return (
			<div className={`${style.container}`}>
				<h1 className="text-6xl text-center">Loading...</h1>
			</div>
		);
	} 
  // if it is success so I will take to the page login
  else if (success) {
    router.push("/check-email")
    return null;
  }

  return (
    <div className={`${style.container}`}>
        <Formik
        // there are 3 props that requred in formik
        // there are...
        initialValues={initialzeValue}
        validationSchema={schemaValidation}
        onSubmit={handleSubmit}
        >
          {/* form section like a form we register */}
          <Form className="bg-gray-100 p-4 rounded-lg w-96">
          <h1 className={`${style.title}`}>Register</h1>

					{/* Email section */}
					<div className="mb-5">
						<label className={`${style.label}`} htmlFor="email">
							Email
						</label>
						<Field
							type="email"
							name="email"
							id="email"
							className={`${style.input}`}
						/>
						<ErrorMessage
							name="email"
							component="section"
							className={`${style.error}`}
						/>
					</div>

          {/* first name section */}
          <div className='mb-5'>
            <label className={`${style.label}`} htmlFor="first_name">
							First Name
						</label>
						<Field
							type="text"
							name="first_name"
							id="first_name"
							className={`${style.input}`}
						/>
						<ErrorMessage
							name="first_name"
							component="section"
							className={`${style.error}`}
						/>
          </div>

          {/* last name section */}
          <div className="mb-5">
						<label className={`${style.label}`} htmlFor="last_name">
							Last Name
						</label>
						<Field
							type="text"
							name="last_name"
							id="last_name"
							className={`${style.input}`}
						/>
						<ErrorMessage
							name="last_name"
							component="section"
							className={`${style.error}`}
						/>
					</div>

          {/* password1 section */}
          <div className="mb-5">
						<label className={`${style.label}`} htmlFor="password1">
							Password
						</label>
						<div className="relative">
							<Field
								type={showPassword ? "text" : "password"}
								name="password1"
								id="password1"
								className={`${style.input}`}
							/>
							{!showPassword ? (
								<IoEyeOffSharp
									onClick={() => handleShowPassword()}
									className="cursor-pointer absolute right-2 top-4"
								/>
							) : (
								<IoEyeSharp
									onClick={() => handleShowPassword()}
									className="cursor-pointer absolute right-2 top-4"
								/>
							)}
						</div>
						<ErrorMessage
							name="password1"
							component="section"
							className={`${style.error}`}
						/>
					</div>

          {/* password2 section */}
          <div className="mb-5">
						<label className={`${style.label}`} htmlFor="password2">
							Password
						</label>
						<div className="relative">
							<Field
								type={showPassword ? "text" : "password"}
								name="password2"
								id="password2"
								className={`${style.input}`}
							/>
							{!showPassword ? (
								<IoEyeOffSharp
									onClick={() => handleShowPassword()}
									className="cursor-pointer absolute right-2 top-4"
								/>
							) : (
								<IoEyeSharp
									onClick={() => handleShowPassword()}
									className="cursor-pointer absolute right-2 top-4"
								/>
							)}
						</div>
						<ErrorMessage
							name="password2"
							component="section"
							className={`${style.error}`}
						/>
					</div>

          {/* button submit */}
					<button type="submit" className={`${style.button}`}>
						Submit
					</button>
          </Form>
        </Formik>
      </div>
  )
}
