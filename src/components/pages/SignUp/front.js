import React from 'react';
import './FrontSection.css';
import { Button } from '../../Button';
import { Link } from 'react-router-dom';

function UserSignUp(props) {
  return (
    <>
      <div
        className={false ? 'home__hero-section' : 'home__hero-section darkBg'}
      >
        <div className='container'>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: '' === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='home__hero-text-wrapper'>
                <div className='top-line'>{'SIGN UP TODAY'}</div>
                <h1 className={true ? 'heading' : 'heading dark'}>
                  {'Blockchain based Land Records System'}
                </h1>
                <div className='input-areas'>
                  <form>
                    <div>
                      <input className='footer-input' name='email' type='email' placeholder='Your Email' />
                    </div>
                    <div>
                      <input className='footer-input' name='password' type='password' placeholder='Your Password' />
                    </div>
                    <div>
                      <input className='footer-input' name='password' type='password' placeholder='Your Password' />
                    </div>
             
                    <Button buttonSize='btn--wide' buttonColor='blue'>Sign Up</Button>
                  </form>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
                <img src={'images/svg-6.svg'} alt={'Credit Card'} className='home__hero-img' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FrontSection({
  lightBg,
  topLine,
  lightText,
  headline,
  buttonLabel,
  form,
  img,
  alt,
  imgStart
}) {
  if (form) {
    return (<UserSignUp />);
  }

  return (
    <>
      <div
        className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
      >
        <div className='container'>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='home__hero-text-wrapper'>
                <div className='top-line'>{topLine}</div>
                <h1 className={lightText ? 'heading' : 'heading dark'}>
                  {headline}
                </h1>

                <Link to='/sign-up'>
                  <Button buttonSize='btn--wide' buttonColor='blue'>
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
                <img src={img} alt={alt} className='home__hero-img' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontSection;
