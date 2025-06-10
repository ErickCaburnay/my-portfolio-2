"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef();
  const lastScrollY = useRef(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pulse, setPulse] = useState(false);
  const scrollTopBtnRef = useRef(null);


  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      const currentScrollY = window.pageYOffset;
      if (Math.abs(currentScrollY - lastScrollY.current) > 20) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min((currentScrollY / totalHeight) * 100, 100);
        setScrollProgress(progress);
        lastScrollY.current = currentScrollY;
      }
    });
  }, []);

  useEffect(() => {
    const onScrollShowButton = () => {
      setShowScrollTop(window.scrollY > window.innerHeight / 2);
    };
    window.addEventListener('scroll', handleScroll, { passive: true, capture: false });
    window.addEventListener('scroll', onScrollShowButton, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', onScrollShowButton);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  const handleNewsletterSubmit = useCallback((e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  }, [email]);

  const scrollToTop = useCallback(() => {
    if (scrollTopBtnRef.current) {
      scrollTopBtnRef.current.classList.remove(styles.pulse); 
      void scrollTopBtnRef.current.offsetWidth; 
      scrollTopBtnRef.current.classList.add(styles.pulse);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // const socialLinks = [
  //   { name: "GitHub", href: "https://github.com/yourusername", icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>) },
  //   { name: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>) },
  //   { name: "Twitter", href: "https://twitter.com/yourusername", icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>) },
  //   { name: "Email", href: "mailto:your.email@example.com", icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z"/></svg>) }
  // ];

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

  const serviceLinks = [
    { name: "Web Development", href: "#web-dev" },
    { name: "Mobile Apps", href: "#mobile-dev" },
    { name: "UI/UX Design", href: "#design" },
    { name: "Consultation", href: "#consulting" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" }
  ];

  return (
    <footer className={styles.footerRoot}>
      {/* Simplified Background Pattern */}
      <div className={styles.footerBackground}>
        <div className={styles.footerBackgroundPattern} />
      </div>

      {/* Main Footer Content */}
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {/* Brand & Bio Section */}
          <div className={styles.footerBrand}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={styles.footerBrandTextAndLogo}>
                <div className={styles.footerBrandLogo}>
                  <span>ZI</span>
                </div>
                <p className={styles.footerBrandDesc}>
                  Passionate about creating exceptional digital experiences through innovative web development, modern design, and cutting-edge technologies. Let\'s build something amazing together.
                </p>
              </div>

              {/* Newsletter Signup */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h4 className={styles.footerSectionTitle}>Stay Updated</h4>
                <form onSubmit={handleNewsletterSubmit} style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={{
                      flex: 1,
                      padding: "0.5rem 1rem",
                      background: "#334155",
                      border: "1px solid #64748b",
                      borderRadius: "0.5rem",
                      color: "#fff",
                      outline: "none"
                    }}
                  />
                  <motion.button
                    type="submit"
                    style={{
                      padding: "0.5rem 1.25rem",
                      background: "linear-gradient(90deg, #00e676, #00ff88)",
                      borderRadius: "0.5rem",
                      color: "#000",
                      fontWeight: 500,
                      border: "none",
                      transition: "all 0.3s",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubscribed ? "✓" : "Subscribe"}
                  </motion.button>
                </form>
                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: "#22d3ee", fontSize: "0.93rem", marginTop: "0.5rem" }}
                  >
                    Thanks for subscribing!
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className={styles.footerNavSection}
          >
            <h4 className={styles.footerSectionTitle}>Navigation</h4>
            <ul className={styles.footerLinkList}>
              {navLinks.map((link, index) => (
                <li key={index} className={styles.footerLinkItem}>
                  <Link href={link.href} className={styles.footerLink}>
                    <span className={styles.footerLinkIndicator}></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={styles.footerNavSection}
          >
            <h4 className={styles.footerSectionTitle}>Services</h4>
            <ul className={styles.footerLinkList}>
              {serviceLinks.map((link, index) => (
                <li key={index} className={styles.footerLinkItem}>
                  <Link href={link.href} className={`${styles.footerLink} ${styles.footerLinkPurple}`}>
                    <span className={`${styles.footerLinkIndicator} ${styles.footerLinkPurple}`}></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className={styles.footerNavSection}
          >
            <h4 className={styles.footerSectionTitle}>Contact</h4>
            <ul className={styles.footerLinkList}>
              <li className={styles.footerLinkItem}>
                <span className={styles.footerLink}>Email:&nbsp;<a href="mailto:ayesxazeida06@gmail.com" style={{ color: '#00e676' }}>ayesxazeida06@gmail.com</a></span>
              </li>
              <li className={styles.footerLinkItem}>
                <span className={styles.footerLink}>Mobile:&nbsp;<a href="tel:+639214318847" style={{ color: '#00e676' }}>+63 921-431-8847</a></span>
              </li>
              <li className={styles.footerLinkItem}>
                <span className={styles.footerLink}>Location:&nbsp;<span style={{ color: '#00e676' }}>General Trias, Cavite, Philippines</span></span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Social Media Links */}
        {/* <motion.div
          className={styles.footerSocials}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerSocialBtn}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.name}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div> */}

        {/* Divider */}
        <hr className={styles.footerDivider} />

        {/* Bottom Section */}
        <div className={styles.footerBottom}>
          <div className={styles.footerCopyright}>
            <p>&copy; {currentYear} Erick Caburnay. All rights reserved.</p>
            <span>Built with Next.js, Tailwind CSS &amp; Framer Motion</span>
          </div>
          <div className={styles.footerLegalLinks}>
            {legalLinks.map((link, index) => (
              <Link key={index} href={link.href} className={styles.footerLegalLink}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll To Top Floating Button */}
      <AnimatePresence>
      {showScrollTop && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={styles.scrollTopBtn}
          ref={scrollTopBtnRef}
          onAnimationEnd={() => {
            if (scrollTopBtnRef.current) {
              scrollTopBtnRef.current.classList.remove(styles.pulse);
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>

    </footer>
  );
};

export default Footer;
