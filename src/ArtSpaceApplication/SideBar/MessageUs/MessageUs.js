import {useRef} from 'react'
import './MessageUs.css';

import emailjs from '@emailjs/browser';


const MessageUs = () => {
    const form= useRef(); 
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_ganq2os', 'template_whqoqoi', form.current, 'SEK5Sfq83Okt79K-v')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset(); 
      };
  return (
    <section>
        <div className="main-menu"> 
        <div > 
            <h1 class='headingquyen'>
                Message Us 
            </h1>
            </div>
            
            
            
            <form ref={form} onSubmit={sendEmail} className='--form-control --card --flex-center --dir-column'> 
            <input type='text' placeholder='Full name' name='user_name' required /> 
            <input type='email' placeholder='Email' name='user_email' required /> 
            <input type='text' placeholder='Subject' name='subject' required /> 
            <textarea name='message' cols='30' rows='10' > </textarea>
            <button type='submit' className='--btn --btn-primary '> Send Message </button>
           


            </form>
            </div>
            
            

      
        
    </section>
  )
}

export default MessageUs