"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const ContactUs = () => {
    return (
      <section className="contact" id="contact">
        <div className="contact-text">
          <h2>
            Contact <span>Me!</span>
          </h2>
          <h4>If You Have Any Project In Your Mind.</h4>
          <p>
            I'm a Web & UI/UX Designer - creating bold & brave interface design for
            companies all across the world.
          </p>
          <ul className="list">
            <li>
              <a href="#">09123456789</a>
            </li>
            <li>
              <a href="#">zibit03@gmail.com</a>
            </li>
          </ul>
  
          <div className="contact-icons">
            <a href="#">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="#">
              <i className="bx bxl-instagram-alt"></i>
            </a>
            <a href="#">
              <i className="bx bxl-github"></i>
            </a>
          </div>
        </div>
  
        <div className="contact-form">
          <form action="">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email Address" required />
            <input type="tel" placeholder="Your Mobile Number" required />
            <textarea
              cols="35"
              rows="10"
              placeholder="How Can I Help You"
              required
            ></textarea>
            <input type="submit" value="Send Message" className="submit" />
          </form>
        </div>
      </section>
    );
  };
  
  export default ContactUs;
  