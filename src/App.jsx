//src/App.jsx
import React from 'react';
import styles from "./App.module.css";
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";
import { Suggestion } from "./components/Suggestion/Suggestion";
import { Blog } from "./components/Blog/Blog";
import { BlogForm } from './components/Blog/BlogForm';

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="blog">
        <Blog />
      </section>
      <section id="blogform">
        <BlogForm />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="suggestion">
        <Suggestion />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

export default App;
