import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../Pages/Page.css'; // Ensure CSS is imported

import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const Navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: '',
    message: ''
  });

  const [status, setStatus] = useState(''); // 'success' | 'error' | ''

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic Validation logic is handled by HTML5 attributes mostly, 
    // but we can add more here if needed.

    // Simulate API call
    console.log("Submitting Form Data:", formData);

    // Simulating success for now
    setStatus('success');
    setTimeout(() => setStatus(''), 5000);

    // Reset form on success (optional)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      reason: '',
      message: ''
    });
  };

  return (
    <div className="contact-page-container">
       <div className="path-page">
                <ul className="light-weigth-ul-li flex-in-ul-li ">
                    <li onClick={()=> Navigate("/")}>
                        HOME /
                    </li>
                    <li>Contact us</li>


                    <li> </li>
                </ul>
                <p className="path-heading">Contact us</p>
            </div>

            <hr></hr>

      <div className="contact-content-wrapper">
        {/* Left Side: Contact Details */}
        <div className="contact-info-section">
          <h2>Get in Touch</h2>
          <p className="info-desc">
            Have a question about our products or need assistance with your order?
            Our team is here to help.
          </p>

          <div className="contact-details-list">
            <div className="contact-item">
              <div className="icon-box"><FaEnvelope /></div>
              <div className="details">
                <h3>Email</h3>
                <p>ordersmmdc@gmail.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon-box"><FaPhoneAlt /></div>
              <div className="details">
                <h3>Phone</h3>
                <p>+91 98112 68090</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon-box"><FaMapMarkerAlt /></div>
              <div className="details">
                <h3>Office</h3>
                <p>123 Music Street, Me<br /> New Delhi, India - 110001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder=""
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder=""
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder=""
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Mobile Number <span className="required">*</span></label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  placeholder=""
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason for Contact <span className="required">*</span></label>
              <select
                id="reason"
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
              >
                <option value="" disabled>Select a reason</option>
                <option value="Buy Products">Buy Products</option>
                <option value="Enquiry for Product">Enquiry for Product</option>
                <option value="Problem While Ordering">Problem While Ordering</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message <span className="required">*</span></label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Enquiry Message"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Contact Us</button>

            {status === 'success' && <p className="success-msg">Message sent successfully!</p>}
            {status === 'error' && <p className="error-msg">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="map-section">
        <iframe
          title="Google Map Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.8262449818244!2d77.407907!3d28.532542399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce9f94f729e59%3A0x9c070b0c50eb2344!2sMusic%20%26%20More%20Distribution%20Co.!5e1!3m2!1sen!2sin!4v1770714990722!5m2!1sen!2sin"
          width="100%"


          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactUs;