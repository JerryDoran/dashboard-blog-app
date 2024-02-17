import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import maestro from '../assets/maestro.png';

import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import {toast} from 'react-hot-toast'


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  async function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
    
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(formData.username)

    if(!formData.email || !formData.password) {
     return setError('Please fill in all fields');      
    }
    
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json();

      if(data.success === false){
        setError(data.message)     
        setLoading(false)
        return;   
      }

      setLoading(false)

      if(response.ok){
        navigate('/')
      }

      toast.success('Successfully signed in')
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <section className='min-h-screen p-20'>
      <div className='flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto gap-2'>
        <div className='flex flex-col items-center flex-1'>                  
            <img src={maestro} alt="" className='hidden md:w-full md:block p-5' />          
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
           
            <div>
              <Label>Your email</Label>
              <TextInput type='email' placeholder='name@email.com' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label>Your password</Label>
              <TextInput type='password' placeholder='********' id='password'  
              onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' disabled={loading}>
              {loading ? (<><Spinner size='sm' light={true} /><span className='pl-2'>Loading...</span></>) : 'Sign In'}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don&apos;t have an account?</span>
            <Link to='/sign-up' className='text-blue-500 hover:underline'>Sign Up</Link>
          </div>
          {error && (<Alert className='mt-5' color='failure'>{error}</Alert>)}
        </div>
      </div>      
    </section>
  );
}


// bg-gradient-to-r from-gray-50 via-indigo-100 to-blue-50