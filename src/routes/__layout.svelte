<script>
    import "../app.css";
    import Nav from "$lib/Nav.svelte";
</script>

<Nav />

<main class="h-screen flex flex-col items-center">
    <slot />
</main>
