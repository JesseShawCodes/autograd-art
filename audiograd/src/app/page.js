"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import p5 from "p5";
import styles from "./page.module.css";

export default function Home() {
  const sketchRef = useRef(null);
  const p5Instance = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      debugger
      let radius = 50;
      let color = [0,250,250];

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.noStroke();
        setInterval(fetchPrediction, 100)
      }

      p.draw = () => {
        p.background(0, 20);
        p.fill(...color);
        p.ellipse(p.width /2, p.height / 2, radius);
      }

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

          const data = await res.json();
          radius = data.radius;
          color = data.color;
          console.log(data);

        } catch (err) {
          console.error(err);
        }
      }
    };

    p5Instance.current = new p5(sketch, sketchRef.current);
    return () => p5Instance.current.remove();
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Audiogradasfa</h1>
        </div>
        <div ref={sketchRef}>

        </div>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
