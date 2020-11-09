import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import '../assets/styles/landing.css';

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
      <div>
        Value Proposition
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
      <div>
        Call to Action
      </div>
    </div>
  );
};

export default Landing;
