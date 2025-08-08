"use client"
import { React } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
      <div className="container">
        <Link href="/" className="nav-link active navbar-brand">
          Audiograd
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
