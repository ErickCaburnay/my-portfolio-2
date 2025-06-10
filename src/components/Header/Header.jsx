import { useState, useEffect } from "react";
// import { motion } from "framer-motion"; // Commented out motion import
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact Me' },
  ];

  return (
    <header
      className={styles.header}
      // initial={{ y: -100, opacity: 0 }}
      // animate={{ y: 0, opacity: 1 }}
      // transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <a
        href="#home"
        className={styles.logo}
        // whileHover={{ scale: 1.1 }}
        // transition={{ type: "spring", stiffness: 300 }}
        onClick={() => handleNavClick('home')}
      >
        P<span className={styles.logoSpan}>rog</span>ra<span className={styles.logoSpan}>mer</span>.
      </a>

      <ul className={`${styles.nav} ${isMenuOpen ? styles.navActive : ""}`}>
        {navItems.map((item, index) => (
          <li
            key={item.id}
            className={styles.navItem}
            // initial={{ opacity: 0, y: -20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <a
              href={`#${item.id}`}
              className={`${styles.navLink} ${activeSection === item.id ? styles.active : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div
        className={`bx bx-menu ${styles.menuIcon}`}
        id="menu-icon"
        // whileHover={{ scale: 1.1 }}
        // whileTap={{ scale: 0.9 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
    </header>
  );
};

export default Header;
