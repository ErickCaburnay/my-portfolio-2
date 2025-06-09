"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Contact.module.css";

const ContactUs = () => {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles["contact-text"]}>
        <h2>
          Contact <span>Me!</span>
        </h2>
        <h4>If You Have Any Project In Your Mind.</h4>
        <p>
          I'm a Web & UI/UX Designer - creating bold & brave interface design for
          companies all across the world.
        </p>
        {/* <ul className={styles.list}>
          <li>
            <a href="#">09123456789</a>
          </li>
          <li>
            <a href="#">zibit03@gmail.com</a>
          </li>
        </ul> */}

        <div className={styles["contact-icons"]}>
          <a href="https://www.facebook.com/zibit03">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="mailto:ayesxazeida06@gmail.com">
            <i className="bx bxl-gmail"></i>
          </a>
          {/* <a href="#">
            <i className="bx bxl-instagram-alt"></i>
          </a> */}
          <a href="https://github.com/ErickCaburnay">
            <i className="bx bxl-github"></i>
          </a>
        </div>
      </div>

      <div className={styles["contact-form"]}>
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
          <input
            type="submit"
            value="Send Message"
            className={styles.submit}
          />
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
