import React from 'react';
import { FaXTwitter, FaInstagram, FaGithub } from 'react-icons/fa6';
import { PiBrainFill } from 'react-icons/pi';

function AboutUs() {
  return (
    <footer className='footer bg-cementGray text- p-10 mt-10 RnM-font-regular text-black'>
      <aside>
        <PiBrainFill size={'50'} />
        <p className='text-xl'>
          Geek Squad Ltd.
          <br />
          Geeking out since 2000
        </p>
      </aside>
      <main className='footer-center'>
        <p className='text-lg normal-case'>
          We dont own any of this data, Rick and Morty api is solely the
          property of its respective owners. Regarding any issue or complaint
          you can reach out to us using any one of our socials.
        </p>
        <p className='text-lg'>
          Copyright © {new Date().getFullYear()} - All right reserved by Geek
          Squad Ltd.
        </p>
      </main>
      <nav>
        <h6 className='footer-title text-2xl'>Social</h6>
        <div className='grid grid-flow-col gap-4'>
          <a href='https://X.com/udTheDev4u' target='_blank'>
            <FaXTwitter size={'24'} />
          </a>
          <a href='https://instagram.com/that_guy_uddeshya_' target='_blank'>
            <FaInstagram size={'24'} />
          </a>
          <a href='https://github.com/Uddeshya4u' target='_blank'>
            <FaGithub size={'24'} />
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default AboutUs;
