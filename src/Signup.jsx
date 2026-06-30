import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "./axios";

import AuthLayout from "./AuthLayout";
import AuthCard from "./AuthCard";
import InputField from "./InputField";
import Button from "./Button";
import Divider from "./Divider";
import SocialButtons from "./SocialButtons";

export default function Signup() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSignup = async () => {

    if(!name || !email || !password || !confirmPassword){
      toast.error("All fields are required");
      return;
    }

    if(password !== confirmPassword){
      toast.error("Passwords do not match");
      return;
    }

    try{

      setLoading(true);

      await api.post("/auth/register",{
        name,
        email,
        password
      });

      toast.success(
        "Account created successfully"
      );

      navigate("/");

    }catch(error){

      toast.error(
        error?.response?.data ||
        "Signup failed"
      );

    }finally{

      setLoading(false);
    }
  };

  return (

    <AuthLayout>

      <AuthCard>

        {/* Logo */}

        <div className="flex justify-center mb-8">

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-white
              flex
              items-center
              justify-center
            "
          >

            <span className="text-black font-bold">
              AI
            </span>

          </div>

        </div>

        {/* Heading */}

        <div className="text-center mb-8">

          <h1
            className="
              text-3xl
              font-semibold
              text-white
              mb-2
            "
          >
            Create account
          </h1>

          <p className="text-slate-400 text-sm">
            Get started with your account
          </p>

        </div>

        {/* Form */}

        <InputField
          label="Full name"
          placeholder="John Doe"
          value={name}
          onChange={(e)=>
            setName(e.target.value)
          }
        />

        <InputField
          label="Email address"
          placeholder="name@example.com"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <InputField
          label="Confirm password"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e)=>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        <div className="mt-6">

          <Button
            onClick={handleSignup}
            loading={loading}
          >
            Create Account
          </Button>

        </div>

        <Divider />

        <SocialButtons />

        <p
          className="
            text-center
            text-slate-400
            mt-8
            text-sm
          "
        >

          Already have an account?

          <Link
            to="/"
            className="
              text-white
              font-medium
              ml-2
              hover:underline
            "
          >
            Sign in
          </Link>

        </p>

      </AuthCard>

    </AuthLayout>
  );
}