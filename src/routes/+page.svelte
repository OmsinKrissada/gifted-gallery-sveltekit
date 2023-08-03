<script lang="ts">
	import { onMount } from 'svelte';
	import Dialog from '../components/Dialog.svelte';
	import Image from '../components/Image.svelte';
	import { env } from '$env/dynamic/public';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { ImageType } from './+page';

	export let data;
	// const images = (async () => {
	// 	const res = await fetch('http://192.168.1.37:3001/list/img');
	// 	return await res.json();
	// })();

	// const totalWidth = data.images.reduce((total, img) => total + img.height, 0);
	// console.log(totalWidth / 4);

	// let imagePromise: Promise<ImageType[]>;
	// onMount(() => {
	// 	imagePromise = getImages();
	// });
	let currentPhoto: ImageType | null;

	function closeDialog() {
		currentPhoto = null;
	}

	function setFocus(photo: ImageType) {
		currentPhoto = photo;
		// $page.url.searchParams.set('p', photoId);
		// goto(`${$page.url.pathname}?${$page.url.searchParams.toString()}`, {
		// 	noScroll: true
		// });
	}
</script>

<div class="bg-black">
	{#if currentPhoto}
		<Dialog onClose={closeDialog} {currentPhoto} />
	{/if}

	<div class="relative flex">
		<div class="sticky flex flex-col gap-4 top-0 h-fit p-4 pr-0">
			<div class="p-4 w-56 bg-neutral-900 border border-neutral-600 rounded-md">
				Showing {data.images.length} images
			</div>
			<div class="p-4 w-56 bg-neutral-900 border border-neutral-600 rounded-md">
				<h3 class="font-semibold text-xl">Filters</h3>
				<div class="mt-4">
					<p class="mb-2 font-bold text-xs text-neutral-300">BY RANGE</p>
					<div class="flex flex-col gap-2">
						<label
							class="px-3 py-2 bg-blue-600 transition-colors cursor-pointer rounded"
							for="pre-graduation"
						>
							<input type="checkbox" id="pre-graduation" class="mr-2" />
							Pre-Graduation
						</label>
						<label
							class="px-3 py-2 hover:bg-neutral-700 transition-colors cursor-pointer rounded"
							for="graduation"
						>
							<input type="checkbox" id="graduation" class="mr-2" />
							Graduation
						</label>
						<label
							class="px-3 py-2 hover:bg-neutral-700 transition-colors cursor-pointer rounded"
							for="ping-noey"
						>
							<input type="checkbox" id="ping-noey" class="mr-2" />
							Ping Noey
						</label>
					</div>
				</div>
				<div class="mt-4">
					<p class="mb-2 font-bold text-xs text-neutral-300">BY RANGE</p>
					<div class="flex flex-col gap-2">
						<label class="px-4 py-2 transition-colors cursor-pointer rounded" for="all-time">
							<input type="checkbox" id="all-time" class="mr-2" />
							All time
						</label>
						<label
							class="px-4 py-2 hover:bg-neutral-700 transition-colors cursor-pointer rounded"
							for="all-time"
						>
							<input type="checkbox" id="all-time" class="mr-2" />
							All time
						</label>
						<label
							class="px-4 py-2 hover:bg-neutral-700 transition-colors cursor-pointer rounded"
							for="all-time"
						>
							<input type="checkbox" id="all-time" class="mr-2" />
							All time
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="m-4">
			{#await data.images}
				<p class="text-white">Loading...</p>
			{:then images}
				{#if images}
					<div class="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 bg-black">
						{#each images as img}
							<button on:click={() => setFocus(img)}>
								<Image
									hash={img.hash}
									width={img.width}
									height={img.height}
									placeholder={img.blurDataUrl}
								/>
							</button>
						{/each}
					</div>
				{/if}
			{:catch error}
				<p class="text-white">Unable to load image list: {error}</p>
			{/await}
		</div>
	</div>
</div>
