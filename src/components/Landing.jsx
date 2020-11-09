import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import '../assets/styles/landing.css';
import processImg from '../assets/images/VP.svg';
import testimonialImg1 from '../assets/images/martin.jpg';
import testimonialImg2 from '../assets/images/paul.jpg';
import testimonialImg3 from '../assets/images/michael.jpg';

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
      <section className="carousel">
        <Carousel
          autoPlay="true"
          showArrows="true"
          infiniteLoop="true"
          showThumbs={false}
        >
          <div className="testimonial">
            <img src={testimonialImg1} alt="testimonial" />
            <p className="legend">
              It is an option that makes life easier and allows me to continue having
              therapy up close without leaving home.
              <span>
                - Maria Teresa U.
              </span>
            </p>
          </div>
          <div className="testimonial">
            <img src={testimonialImg2} alt="testimonial" />
            <p className="legend">
              I believe 100% that mental health is very important in the life of a human being
              and we need to pay a lot of attention,
              especially in these moments where one meets stress and anxiety.
              <span>
                - Ana O.
              </span>
            </p>
          </div>
          <div className="testimonial">
            <img src={testimonialImg3} alt="testimonial" />
            <p className="legend">
              It is essential to give importance to mental health,
              I think that sometimes we neglect it because of the laziness of looking for someone.
              <span>
                - Adriana H.
              </span>
            </p>
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
