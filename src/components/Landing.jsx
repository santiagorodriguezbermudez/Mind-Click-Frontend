import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import '../assets/styles/landing.css';
import processImg from '../assets/images/VP.svg';

const Landing = () => {
  const arrayText = ['a Coach.', 'a Psychiatrist.', 'a psychologist.', 'mental health.', 'happiness.'];

  return (
    <div>
      <main className="hero">
        <h1 className="main-title">
          Find
          {' '}
          <ReactRotatingText items={arrayText} />
        </h1>
        <p className="sub-title">
          Signup and find the perfect help for your mental health.
        </p>
        <Link to="/signup" className="hero-cta">Signup</Link>
      </main>
      <div className="process">
        <div className="step-by-step">
          <div>
            <span className="material-icons">login</span>
            <p>Signup to our directory.</p>
          </div>
          <div>
            <span className="material-icons">search</span>
            <p>Search for your perfect therapist.</p>
          </div>
          <div>
            <span className="material-icons">calendar_today</span>
            <p>Book a therapist session.</p>
          </div>
        </div>
        <div className="process-img">
          <img src={processImg} alt="process" />
        </div>
      </div>
      <section>
        <Carousel
          autoPlay="true"
        >
          <div>
            <p>First Testimonial</p>
          </div>
          <div>
            <p>Second Testimonial</p>
          </div>
          <div>
            <p>Third Testimonial</p>
          </div>
        </Carousel>
      </section>
      <div className="phrase-section">
        <div className="quote">
          <h2>‘We should lock the door and scream that curse word we know. It’s a good one!’</h2>
          <h3>ANGER (Inside Out)</h3>
        </div>
        <Link to="/signup" className="hero-cta">Signup</Link>
      </div>
    </div>
  );
};

export default Landing;
