import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types.js';

export type ImageType = { hash: string; originalName: string; width: number; height: number; blurDataUrl?: string; uploadAt: Date; shotAt?: Date; };

export const load = (async ({ url, fetch }) => {
	console.log('load triggered');
	const res = await fetch(`${env.PUBLIC_ENDPOINT}/list/img?withBlurData=true`);
	let images;
	// if (res.ok) {
	// console.log(res);
	console.log('before json');
	images = <ImageType[]>await res.json();
	console.log('after json');
	// }
	// return images;
	console.log(images.length);



	console.log(url.searchParams.get('p'));

	return { images: images, photoId: url.searchParams.get('p') };
}) satisfies PageLoad;

// import { error } from '@sveltejs/kit';

export const ssr = false;
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