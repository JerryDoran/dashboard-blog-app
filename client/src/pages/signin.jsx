import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import maestro from "../assets/maestro.png";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/user-slice";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { toast } from "react-hot-toast";
import OAuth from "../components/oauth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  const { error, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill in all fields"));
    }

    try {
      // setLoading(true)
      // setError(null)
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success === false) {
        // setError(data.message)
        // setLoading(false)
        return dispatch(signInFailure(data.message));
      }

      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }

      toast.success("Successfully signed in");
    } catch (error) {
      // setError(error.message)
      // setLoading(false)
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <section className="min-h-screen p-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 p-3 md:flex-row md:items-center">
        <div className="flex flex-1 flex-col items-center">
          <img src={maestro} alt="" className="hidden p-5 md:block md:w-full" />
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label>Your email</Label>
              <TextInput
                type="email"
                placeholder="name@email.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Your password</Label>
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" light={true} />
                  <span className="pl-2">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth text="Sign in" />
          </form>
          <div className="mt-5 flex gap-2 text-sm">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </section>
  );
}
