<script>
  export let title
  export let description
</script>

<svelte:head>
  <meta name="description" content={description} />
  <meta content={title} property="og:title" />
  <meta property="og:site_name" content="mollermethod" />
  <meta property="og:type" content="article" />
  <meta property="og:description" content={description} />
  <title>{title}</title>
</svelte:head>

<h1>{title}</h1>
<slot />
