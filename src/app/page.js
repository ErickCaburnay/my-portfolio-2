"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Portfolio from "@/components/Portfolio";

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const portfolioContentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Header scroll effect
    const header = document.querySelector("header");
    const handleScroll = () => {
      header.classList.toggle("sticky", window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);

    // Fade in animations for sections
    gsap.utils.toArray('section').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      });
    });

    // Service boxes animation - slide in from bottom
    gsap.utils.toArray('.services .box').forEach((box) => {
      gsap.from(box, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: box,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });


    // Portfolio items animation
    gsap.utils.toArray('.row').forEach((row, i) => {
      gsap.from(row, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          end: "top 20%",
          scrub: 1
        }
      });
    });

    // Animate service section headings
    gsap.from('.services .main-text p', {
      opacity: 0,
      y: -30,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.services .main-text',
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from('.services .main-text h2', {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: '.services .main-text',
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });


    // Text animations
    gsap.from('.home-text h1', {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5
    });

    gsap.from('.home-text h3', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.7
    });

    gsap.from('.home-text p', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.9
    });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Scroll function for buttons
  const scrollPortfolio = (direction) => {
    if (portfolioContentRef.current) {
      const scrollAmount = 330; // Adjust based on card width and gap (300px card + 20px gap approx)
      if (direction === 'left') {
        portfolioContentRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        portfolioContentRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <div className="zoom-container" style={{ display: 'none' }}>
        <div className="zoom-window"></div>
      </div>

      <header>
        <a href="#" className="logo">P<span>rog</span>ra<span>mer</span>.</a>

        <ul className={`navlist ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#about">About Me</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact Me</a></li>
        </ul>

        <div className="bx bx-menu" id="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}></div>
      </header>

      <div className="wrapper">
        <div className="content">
          <section className="home" id="home">
            <div className="home-text">
              <div className="slide">
                <span className="one">Hello</span>
                <span className="two">I'm</span>
              </div>
              <h1>Erick <span>CABURNAY</span></h1>
              <h3>Web<span> Developer</span>.</h3>
              <p>Web Developer with 1 year experience that keep customers <br /> coming back for about services makes best effort.</p>
              <div className="button">
                <a href="#" className="btn">Hire me</a>
                <a href="#" className="btn2"><span><i className='bx bx-play'></i></span>Watch My Work</a>
              </div>
            </div>
          </section>

          <section className="about" id="about">
            <div className="about-img">
              <Image src="/3d1.jpg" alt="About Me" width={530} height={400} className="about-image" />
            </div>

            <div className="about-text">
              <h2>About <span>Me</span></h2>
              <h4>Web & UI/UX Designer!</h4>
              <p>I'm Erick Jefferson R. Caburnay, a dedicated web developer passionate about creating captivating digital experiences.
                With Beginner in HTML, CSS, JavaScript, I specialize in building responsive websites and dynamic web applications.
                Collaborative and detail-oriented, I work closely with clients to bring their visions to life.
                Let's connect and create something amazing together.</p>
              <a href="#" className="btn">More About</a>
            </div>
          </section>

          <section className="services" id="services">
            <div className="main-text">
              <p>What I am Expert In</p>
              <h2><span>My</span> Services</h2>
            </div>

            <div className="services-content">
              <div className="box">
                <div className="s-icons">
                  <i className='bx bx-mobile-alt'></i>
                </div>
                <h3>Web Design</h3>
                <p>Web design encompasses the visual aspects of a website, including layout, color scheme, typography, and imagery.
                  It focuses on creating an aesthetically pleasing and user-friendly interface that enhances the overall user experience.</p>
                <a href="#" className="read">Read More</a>
              </div>

              <div className="box">
                <div className="s-icons">
                  <i className='bx bx-code-alt'></i>
                </div>
                <h3>Web Development</h3>
                <p>Web development involves the technical implementation of a website, including coding, scripting, and database management.
                  It encompasses both front-end development (client-side) and back-end development (server-side) to ensure functionality and performance.</p>
                <a href="#" className="read">Read More</a>
              </div>

              <div className="box">
                <div className="s-icons">
                  <i className='bx bx-edit-alt'></i>
                </div>
                <h3>Creative Design</h3>
                <p>Creative design explores innovative and artistic approaches to visual communication. It encompasses graphic design,
                  illustration, branding, and multimedia design, aiming to evoke emotion, inspire action, and leave a lasting impression.</p>
                <a href="#" className="read">Read More</a>
              </div>
            </div>
          </section>

          <section>
            <Portfolio />
          </section>

          <section className="contact" id="contact">
            <div className="contact-text">
              <h2>Contact <span>Me!</span></h2>
              <h4>If You Have Any Project In Your Mind.</h4>
              <p>I'm a Web & UI/UX Designer - creating bold & brave interface design for companies all across the world.</p>
              <div className="list">
                <li><a href="#">09123456789</a></li>
                <li><a href="#">zibit03@gmail.com</a></li>
              </div>

              <div className="contact-icons">
                <a href="#"><i className='bx bxl-facebook'></i></a>
                <a href="#"><i className='bx bxl-twitter'></i></a>
                <a href="#"><i className='bx bxl-instagram-alt'></i></a>
                <a href="#"><i className='bx bxl-github'></i></a>
              </div>
            </div>

            <div className="contact-form">
              <form action="">
                <input type="name" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email Address" required />
                <input type="" placeholder="Your Mobile Number" required />
                <textarea name="" id="" cols="35" rows="10" placeholder="How Can I Help You" required></textarea>
                <input type="submit" value="Send Message" className="submit" required />
              </form>
            </div>
          </section>

          <div className="image-container">
            <Image src="/bg3.png" alt="Background" fill className="object-cover" />
          </div>
        </div>
      </div>

      <section className="end">
        <div className="last-text">
          <p>Copyright © 2024 by Erick Caburnay All Rights Reserved.</p>
        </div>

        <div className="top">
          <a href="#home"><i className='bx bx-up-arrow-alt'></i></a>
        </div>
      </section>
    </>
  );
}
