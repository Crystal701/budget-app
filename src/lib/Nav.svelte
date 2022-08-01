<script>
    import Form from "$lib/Form.svelte";

    let hidden = true;
</script>

<Form
    {hidden}
    on:closeForm={() => (hidden = true)}
    on:click={() => (hidden = true)}
/>

<header
    class="sticky top-0 w-screen flex justify-center py-6 px-6 sm:px-10 z-40"
>
    <nav class="flex items-center justify-between w-full md:max-w-2xl gap-2">
        <h1 class="text-slate-100 font-semibold">Budget Calculator</h1>
        <button
            class="text-sm border-0 rounded-full bg-slate-100 py-2 px-4 flex items-center gap-2 text-slate-800 hover:transform hover:scale-105 transition duration-500"
            on:click={() => (hidden = false)}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 hidden sm:inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4v16m8-8H4"
                />
            </svg>
            Add Expense</button
        >
    </nav>
</header>
