import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLinkedin } from '@fortawesome/free-solid-svg-icons';

function ContactUs() {
  return (
    <div>
      <div className="Hero">
        <h1>We value your feedback!</h1>
        <h3> Reach out to us for any inquiries or suggestions.</h3>
        
      </div>

      <div className="ContactDetails">
        <div className="ContactItem">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <p>Email : ujjwal.rob11@gmail.com</p>
        </div>
        <div className="ContactItem">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <p>Contact No. : +9178605624816</p>
        </div>
        <div className="ContactItem">
          <p1>LinkedIn :</p1>
          <a href="https://linkedin.com/in/uk2023" target="_blank" rel="noopener noreferrer">
            <p> https://linkedin.com/in/uk2023</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
