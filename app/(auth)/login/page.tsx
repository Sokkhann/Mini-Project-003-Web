"use client";

import React, { useState } from "react";
import style from "./style.module.css";

import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { BASE_URL } from "@/lib/constants";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ValueTypes = {
	email: string;
	password: string;
};

const initialValues: ValueTypes = {
	email: "",
	password: "",
};

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string().required("Required"),
});

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
		// Toggle password visibility
	};

  if (session) {
    return router.push("/");
  }

	//  handle submit
  const handleSubmit = (values: ValueTypes) => {
		setLoading(true);
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then(res=>res.json())
			.then((data) => {
				console.log(data);
				setLoading(false);
				dispatch(setAccessToken(data.accessToken));
				setUser(data.user);
				console.log(data.accessToken);
        router.push('/')
			})
			.catch((error) => {
				console.error("Error:", error);
				setLoading(false);
			});	
			
	};

	if (loading) {
		return (
			<div className={`${style.container}`}>
				<h1 className="text-6xl text-center">Loading...</h1>
			</div>
		);
	}


	return (
		<main className={`${style.container}`}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, actions) => {
					handleSubmit(values);
				}}
			>
				<Form className="bg-gray-100 p-4 rounded-lg w-96">
        <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
              <h5>Register with</h5>
            </div>
            <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12">
              <div className="w-6/12 max-w-full px-1 ml-auto flex-0">
                <div onClick={()=>signIn('github')} className="flex items-center gap-2 w-full px-6 py-3 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="32px"
                    width="24px"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <h5 className="text-base text-black">Github</h5>
                </div>
              </div>
			  
              <div className="w-6/12 max-w-full px-1 mr-auto flex-0">
                <div onClick={()=>signIn('google')} className="flex items-center gap-2 w-full px-6 py-3 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
                  <svg
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 64 64"
                    height="32px"
                    width="24px"
                  >
                    <g
                      fillRule="evenodd"
                      fill="none"
                      strokeWidth={1}
                      stroke="none"
                    >
                      <g
                        fillRule="nonzero"
                        transform="translate(3.000000, 2.000000)"
                      >
                        <path
                          fill="#4285F4"
                          d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"
                        />
                        <path
                          fill="#34A853"
                          d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"
                        />
                        <path
                          fill="#FBBC05"
                          d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"
                        />
                        <path
                          fill="#EB4335"
                          d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"
                        />
                      </g>
                    </g>
                  </svg>
                  <h5 className="text-base text-red-400">Google</h5>
                </div>
              </div>
              <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0">
                <p className="z-20 inline px-4 mb-2 font-semibold leading-normal bg-white text-sm text-slate-400">
                  or
                </p>
              </div>
            </div>
					{/* Email */}
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

					{/* Password */}
					<div className="mb-5">
						<label className={`${style.label}`} htmlFor="password">
							Password
						</label>
						<div className="relative">
							<Field
								type={showPassword ? "text" : "password"}
								name="password"
								id="password"
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
							name="password"
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
		</main>
	);
}
function setAccessToken(accessToken: any): any {
  throw new Error("Function not implemented.");
}

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

function setUser(user: any) {
  throw new Error("Function not implemented.");
}

