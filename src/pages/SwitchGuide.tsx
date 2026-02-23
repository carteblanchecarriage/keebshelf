import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Guide.css';

export default function SwitchGuide() {
  return (
    <div className="guide-page">
      <Header />
      <main className="guide-content">
        <h1>Switch Guide</h1>
        
        <section>
          <h2>What Are Mechanical Switches?</h2>
          <p>
            Mechanical switches are the heart of mechanical keyboards. Unlike membrane keyboards, 
            each key has its own individual switch mechanism that provides tactile feedback and 
            a satisfying click or bump when pressed.
          </p>
        </section>

        <section>
          <h2>Switch Types</h2>
          
          <h3>Linear Switches</h3>
          <p>Smooth keystrokes from top to bottom. No tactile bump or click. Great for gaming and fast typing.</p>
          <ul>
            <li><strong>Cherry MX Red:</strong> Light, smooth, 45g actuation</li>
            <li><strong>Cherry MX Black:</strong> Heavier, smooth, 60g actuation</li>
            <li><strong>Gateron Yellow:</strong> Budget-friendly linear</li>
          </ul>
          
          <h3>Tactile Switches</h3>
          <p>Bump feeling when actuated. Good balance of feedback and speed.</p>
          <ul>
            <li><strong>Cherry MX Brown:</strong> Light tactile, 55g</li>
            <li><strong>Cherry MX Clear:</strong> Heavier tactile, 65g</li>
            <li><strong>Holy Panda:</strong> Premium tactile</li>
          </ul>
          
          <h3>Clicky Switches</h3>
          <p>Audible click with tactile bump. Satisfying feedback but louder.</p>
          <ul>
            <li><strong>Cherry MX Blue:</strong> Classic clicky, 50g</li>
            <li><strong>Cherry MX Green:</strong> Heavier clicky, 80g</li>
            <li><strong>Kailh Box White:</strong> Crisp click, water-resistant</li>
          </ul>
        </section>

        <section>
          <h2>Actuation Force</h2>
          <p>The amount of pressure needed to register a keystroke:</p>
          <ul>
            <li><strong>Light (&lt;50g):</strong> Easy to press, prone to accidental presses</li>
            <li><strong>Medium (50-60g):</strong> Balanced feel, most popular</li>
            <li><strong>Heavy (&gt;60g):</strong> Purposeful presses, less finger fatigue for some</li>
          </ul>
        </section>

        <section>
          <h2>Sound Comparison</h2>
          <p>Different switches produce different sound profiles:</p>
          <ul>
            <li><strong>Silent:</strong> Linear or tactile with dampening. Office-friendly.</li>
            <li><strong>Thocky:</strong> Deep, muted sound. Popular in custom keyboards.</li>
            <li><strong>Clicky:</strong> Sharp, crisp click. Satisfying but loud.</li>
            <li><strong>Clacky:</strong> Higher pitched plastic sound.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
