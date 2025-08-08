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
          p.background(0, 20);
          p.fill(...color);
          p.ellipse(p.width / 2, p.height / 2, radius);
        };

        const fetchPrediction = async () => {
          const audio = {
            bass: Math.random(),
            mid: Math.random(),
            treble: Math.random()
          }

          try {
            const res = await fetch('http://localhost:8000/predict', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(audio)
            })

            console.log(res);

            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            };

            const data = await res.json();
            radius = data.radius;
            color = data.color;
            console.log(data);

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
      <main className="flex-grow-1">
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
