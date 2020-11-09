import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../assets/styles/landing.css';

const Landing = () => {
  const arrayText = ['a Psiquiatris', 'your coach', 'therapist', 'psychologist'];

  return (
    <div>
      <main className="hero">
        <h1 className="main-title">
          Find your
          {' '}
          <ReactRotatingText items={arrayText} />
          .
        </h1>
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
