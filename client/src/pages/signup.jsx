import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import maestro from "../assets/maestro.png";

import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { toast } from "react-hot-toast";
import OAuth from "../components/oauth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(formData.username);

    if (!formData.username || !formData.email || !formData.password) {
      return setError("Please fill in all fields");
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);

      if (response.ok) {
        navigate("/sign-in");
      }

      toast.success("User created successfully");
    } catch (error) {
      setError(error.message);
      setLoading(false);
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
              <Label>Your username</Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
                placeholder="Password"
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
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="mt-5 flex gap-2 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
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
