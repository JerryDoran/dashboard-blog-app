import { Link } from "react-router-dom";

import { Footer } from 'flowbite-react';
import {BsFacebook, BsInstagram, BsTwitter, BsLinkedin, BsDribbble} from 'react-icons/bs'


export default function BlogFooter() {
  return (
    <Footer container className="border border-t-8 border-sky-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex sm:flex md:grid-cols-1">
          <div className="my-4"> 
            <Link className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white' to='/'>   
              <span >
                Blog{' '}
                <span className='px-2 py-1 rounded-lg bg-gradient-to-r from-blue-700 via-indigo-500 to-blue-400 text-white'>
                Maestro
                </span>
              </span>        
            </Link>
          </div> 
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 mt-4 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col={true}>
                <Footer.Link href="/about">Blog</Footer.Link>
                <Footer.Link href="https://www.jerrydoran.dev" target='_blank' rel='noopener noreferrer'>Portfolio</Footer.Link>            
              </Footer.LinkGroup>
            </div> 
            <div>
              <Footer.Title title="Follow Us" />  
                <Footer.LinkGroup col={true}>          
                <Footer.Link href="https://www.github.com/jerrydoran" target='_blank' rel='noopener noreferrer'>Github</Footer.Link>    
              <Footer.Link href="#" >Discord</Footer.Link>    
            
              </Footer.LinkGroup>
              </div>         
            <div>
              <Footer.Title title="Legal" />  
              <Footer.LinkGroup col={true}>          
                <Footer.Link href="#" >Privacy Policy</Footer.Link>    
                <Footer.Link href="#" >Terms &amp; Conditions</Footer.Link>               
              </Footer.LinkGroup>
              </div>         
          </div>        
        </div> 
        <Footer.Divider />  
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Blog Maestro" year={new Date().getFullYear()} />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitter} />
            <Footer.Icon href='#' icon={BsLinkedin} />
            <Footer.Icon href='#' icon={BsDribbble} />
          </div>
        </div>    
      </div>
     
    </Footer>
  );

}
