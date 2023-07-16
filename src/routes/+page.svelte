<script lang="ts">
	import Image from '../components/Image.svelte';
	import type { PageData } from './$types';

	// export let data: PageData;
	// const images = (async () => {
	// 	const res = await fetch('http://192.168.1.37:3001/list/img');
	// 	return await res.json();
	// })();

	// const totalWidth = data.images.reduce((total, img) => total + img.height, 0);
	// console.log(totalWidth / 4);

	type ImageType = { hash: string; width: number; height: number; blurDataUrl?: string };
	async function getImages() {
		// const res = await fetch('https://gifted-api.krissada.com/list/img?withBlurData=true');
		const res = await fetch('http://192.168.1.37:3001/list/img?withBlurData=true');
		// const res = await fetch('http://192.168.1.37:3001/list/img');
		let images;
		// if (res.ok) {
		console.log(res);
		console.log('before json');
		images = <ImageType[]>await res.json();
		console.log('after json');
		// }
		return images;
	}
</script>

<div class="bg-black">
	<!-- <p class="text-white">Um....</p> -->
	{#await getImages()}
		<p class="text-white">Loading...</p>
	{:then images}
		<!-- {JSON.stringify(images)} -->
		<div class="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 m-4 bg-black">
			{#each images as img}
				<!-- <div style="width: {img.width}px; height: {img.height}px;" class="block bg-black m-4" /> -->
				<!-- <picture> -->
				<!-- <source
					/> -->
				<a href="https://gifted-api.krissada.com/img/full/{img.hash}">
					<Image
						hash={img.hash}
						width={img.width}
						height={img.height}
						placeholder={img.blurDataUrl}
					/>
				</a>
				<!-- </picture> -->
			{/each}
		</div>
	{:catch error}
		<p class="text-white">Unable to load image list: {error}</p>
	{/await}
</div>
