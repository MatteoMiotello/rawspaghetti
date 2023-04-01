import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '@/components/navbar';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div>
			<Navbar></Navbar>
			<Component {...pageProps} />
		</div>
	);
}
