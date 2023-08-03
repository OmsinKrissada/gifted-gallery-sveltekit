<script lang="ts">
	// import { goto } from '$app/navigation';
	// import { page } from '$app/stores';
	import type { ImageType } from '../routes/+page';
	import Image from './Image.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { XCircle, ArrowDownOnSquare } from '@steeze-ui/heroicons';
	import { downloadFile } from '$lib/download';

	import { env } from '$env/dynamic/public';
	// import faces from '$lib/faces.json';

	console.log('dialog mounted');

	export let currentPhoto: ImageType;
	export let onClose: any;

	// function close() {
	// 	goto(`${$page.url.pathname}`, {
	// 		noScroll: true
	// 	});
	// }

	function download() {
		// const ghostDownloadButton = document.createElement('a');
		// ghostDownloadButton.download = currentPhoto.originalName;
		// ghostDownloadButton.href = `https://gifted-api.krissada.com/img/full/${currentPhoto.hash}`;
		// document.body.appendChild(ghostDownloadButton);
		// ghostDownloadButton.click();
		// ghostDownloadButton.remove();
		downloadFile(
			`https://gifted-api.krissada.com/img/full/${currentPhoto.hash}`,
			`gifted-gallery-${currentPhoto.originalName}`
		);
	}

	// $: presentFaces = (faces as any)[currentPhoto.hash];
</script>

<div class="fixed inset-0 flex justify-center items-center w-screen h-screen bg-black/80 z-40">
	<div class="relative inset-0 flex flex-wrap justify-evenly items-center gap-10 h-full p-10">
		<!-- <div class="h-full"> -->
		<img
			class="object-contain h-full rounded-md"
			src="https://gifted-api.krissada.com/img/processed/{currentPhoto?.hash}_w_3840_q_75.webp"
			alt=""
		/>
		<!-- <Image {...currentPhoto} placeholder={currentPhoto?.blurDataUrl} /> -->
		<!-- </div> -->

		<div class="h-full p-4 bg-neutral-900 border border-neutral-600 rounded-md">
			<div class="flex mb-4">
				<button
					class="flex items-center gap-2 px-3 py-2 bg-white font-medium text-black rounded-md"
					on:click={download}
				>
					<Icon src={ArrowDownOnSquare} size="28" />
					Download Full Quality
				</button>
				<button class="ml-auto" on:click={onClose}> <Icon src={XCircle} size="40" /> </button>
			</div>
			<!-- <p>Present faces: {presentFaces}</p> -->
			{#if currentPhoto.shotAt}
				<p>Shot at {new Date(currentPhoto.shotAt)}</p>
			{/if}
			<p>Original file name: {currentPhoto.originalName}</p>
		</div>
	</div>
</div>
