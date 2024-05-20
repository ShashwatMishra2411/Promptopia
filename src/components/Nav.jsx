"use client";

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {useSession, signOut, signIn, getProviders} from 'next-auth/react';

export default function Nav() {
  return (
    <nav className='flex-between gap-10'>
      <Link href="/" className='flex gap-2 flex-center'>hoi</Link>
      <Link href="/" className='flex gap-2 flex-center'>hoi</Link>
    </nav>
  )
}
