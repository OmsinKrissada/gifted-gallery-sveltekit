<script lang="ts">
	export let hash: string;
	export let width: number;
	export let height: number;
	export let placeholder: string | undefined;

	// let options = {
	// 	root: null,
	// 	rootMargin: '0px',
	// 	threshold: 0
	// };

	const lazyLoad = (
		image: HTMLImageElement,
		data: { srcset: string; width: number; height: number }
	) => {
		const { srcset, width, height } = data;
		let loading = false;
		const loaded = () => {
			//image.classList.add('visible')                          // doesn't work in REPL
			image.style.opacity = '1'; // REPL hack to apply loading animation
			image.style.display = 'hidden';
			loading = false;
		};
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				loading = true;
				// console.log('an image has loaded'); // console log for REPL
				image.srcset = srcset; // replace placeholder src with the image src on observe
				if (image.complete) {
					// check if instantly loaded
					loaded();
				} else {
					image.addEventListener('load', loaded); // if the image isn't loaded yet, add an event listener
				}
			} else {
				if (loading) image.srcset = '';
				image.style.opacity = '0';
				loading = false;
			}
		});
		observer.observe(image); // intersection observer

		return {
			destroy() {
				image.removeEventListener('load', loaded); // clean up the event listener
			}
		};
	};

	// let loaded = false;
	// let failed = false;
	// let loading = false;

	$: srcset = `https://gifted-api.krissada.com/img/processed/${hash}_w_256_q_75.webp 256w, https://gifted-api.krissada.com/img/processed/${hash}_w_384_q_75.webp 384w, https://gifted-api.krissada.com/img/processed/${hash}_w_640_q_75.webp 640w, https://gifted-api.krissada.com/img/processed/${hash}_w_750_q_75.webp 750w, https://gifted-api.krissada.com/img/processed/${hash}_w_828_q_75.webp 828w, https://gifted-api.krissada.com/img/processed/${hash}_w_1080_q_75.webp 1080w, https://gifted-api.krissada.com/img/processed/${hash}_w_1200_q_75.webp 1200w, https://gifted-api.krissada.com/img/processed/${hash}_w_1920_q_75.webp 1920w, https://gifted-api.krissada.com/img/processed/${hash}_w_2048_q_75.webp 2048w, https://gifted-api.krissada.com/img/processed/${hash}_w_3840_q_75.webp 3840w`;

	// onMount(() => {
	// 	const img = new Image();
	// 	img.loading = 'lazy';
	// 	img.srcset = srcset;
	// 	loading = true;

	// 	img.onload = () => {
	// 		loading = false;
	// 		loaded = true;
	// 	};
	// 	img.onerror = () => {
	// 		loading = false;
	// 		failed = true;
	// 	};
	// });

	// 	{#if loaded}
	// 	<!-- style="background-image: url({placeholder}); background-size: cover;" -->
	// 	<img
	// 		sizes="(max-width: 640px) 100vw,   (max-width: 1280px) 50vw,   (max-width: 1536px) 33vw,   25vw"
	// 		{srcset}
	// 		loading="lazy"
	// 		alt="{hash}"
	// 		{width}
	// 		{height}
	// 		class="mb-4 border border-neutral-800 rounded"
	// 	/>
	// {:else if failed}
	// 	<img src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" alt="Not Found" />
	// {:else if loading}
	// 	<img
	// 		src={placeholder}
	// 		alt="${hash}"
	// 		{width}
	// 		{height}
	// 		class="mb-4 border border-neutral-800 rounded blur-sm"
	// 	/>
	// 	<!-- <img src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif" alt="Loading..." /> -->
	// {/if}
</script>

<!-- <figure> -->
<!-- 
	src="https://gifted-api.krissada.com/img/processed/{hash}_w_{Math.round(width / 50)}_q_1.webp"
	use:lazyLoadPlaceholder={{ src: placeholder, width, height }}
-->
<div class="relative mb-4 border border-neutral-800 rounded overflow-hidden">
	{#if placeholder}
		<img decoding="async" src={placeholder} {width} {height} alt="" class="relative lg:blur" />
	{/if}
	<!-- <div
		style="background-image: url({placeholder}); background-size: cover;"
		class="absolute w-10 h-10"
		/> -->
	<img
		use:lazyLoad={{ srcset, width, height }}
		decoding="async"
		sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
		{width}
		{height}
		alt={hash}
		class="absolute inset-0 rounded opacity-0 transition-opacity duration-200 z-10"
	/>
</div>

<!-- </figure> -->

<!-- {#await fetchData()}
  <p>loading</p>
{:then items}
	{#each items as image}
	<figure>
		<img use:lazyLoad={image.url} alt={image.title} />
	</figure>
	{/each}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

 -->

<!-- 
{#if loaded}
	<img {src} alt="Document" />
{:else if failed}
	<img src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" alt="Not Found" />
{:else if loading}
	<img src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif" alt="Loading..." />
{/if} -->

<!-- <style>
	figure {
		/* margin-bottom: 100vh; */
	}
	img {
		/* opacity: 0;
		transition: all 200ms ease; */
	}
</style> -->
