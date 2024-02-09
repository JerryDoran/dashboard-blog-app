import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

import maestro from '../assets/maestro.png';

export default function SignUp() {
  return (
    <section className='min-h-screen p-20'>
      <div className='flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto gap-4'>
        <div className='flex flex-col items-center flex-1'>                  
            <img src={maestro} alt="" className='hidden md:w-full md:block p-5' />        
         
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label>Your username</Label>
              <TextInput type='text' placeholder='Username' id='username' required={true}/>
            </div>
            <div>
              <Label>Your email</Label>
              <TextInput type='text' placeholder='name@email.com' id='email' required={true}/>
            </div>
            <div>
              <Label>Your password</Label>
              <TextInput type='text' placeholder='Password' id='password' required={true}/>
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit'>Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500 hover:underline'>Sign In</Link>
          </div>
        </div>
      </div>      
    </section>
  );
}


// bg-gradient-to-r from-gray-50 via-indigo-100 to-blue-50