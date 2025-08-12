"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Alert from "./components/Alert";

export default function Home() {
  const sketchRef = useRef(null);
  const p5Instance = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (hasError) {
      return;
    }

    import("p5").then((p5module) => {
      const p5 = p5module.default;

      const sketch = (p) => {
        let radius = 50;
        let color = [0,250,250];

        p.setup = () => {
          p.createCanvas(window.innerWidth, window.innerHeight);
          p.noStroke();
          intervalId = setInterval(fetchPrediction, 1000);
        };

        p.draw = () => {
          p.background(0, 0, 0, 0);
          p.fill(...color);

          p.noStroke();

          let spacing = Math.floor(Math.random() * (300 - 30 + 1)) + 30;
          for (let x = spacing / 2; x < p.width; x += spacing) {
            for (let y = spacing / 2; y < p.height; y += spacing) {
              p.ellipse(x * p.noise(5 * p.frameCount), y * p.noise(5 * p.frameCount), 2, 2)
            }
          }
          /*
          for (let i = 0; i < 50; i++) {
            p.fill(random()*255, random()*255, random()*255)
            p.square(100,100,40)
          }
          */
        };
        const fetchPrediction = async () => {
          const audio = {
            bass: Math.random(),
            mid: Math.random(),
            treble: Math.random()
          }

          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}predict`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(audio)
            })

            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            };

            const data = await res.json();
            radius = data.radius;
            color = data.color;

          } catch (err) {
            console.error(err);
            setHasError(true);
            clearInterval(intervalId);
          }
        }

      }

      new p5(sketch, sketchRef.current);
    });

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [hasError]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-grow-1 bg-my-gradient">
        {hasError ? (
          <div>
            <Alert alertType={'danger'} />
          </div>
        ) : (
          <div ref={sketchRef}></div>
        )}
      </main>
      <Footer />
    </div>
  );
}
