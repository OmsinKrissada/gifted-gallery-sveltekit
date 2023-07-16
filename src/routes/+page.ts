// import { error } from '@sveltejs/kit';
// import type { PageLoad } from './$types.js';

// // export const ssr = false;
// // export const csr = true;

// type ImageType = { hash: string, width: number, height: number, blurDataUrl?: string; };
// export const load = (async ({ params }) => {
// 	const res = await fetch('https://gifted-api.krissada.com/list/img?withBlurData=true', { mode: 'no-cors' });
// 	// const res = await fetch('http://192.168.1.37:3001/list/img');
// 	let images;
// 	if (res.ok) {
// 		console.log('before json');
// 		images = (<ImageType[]>await res.json());
// 		console.log('after json');
// 	}
// 	else throw new Error('bruh');

// 	return { images };
// }) satisfies PageLoad;