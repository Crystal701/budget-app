<script>
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { expenses } from "../stores/expensesData.js";
    import Form from "$lib/Form.svelte";

    let hidden = true;
    let buttonName = "edit expense";
    let id = "";
    let title = "";
    let amount = "";

    const deleteExpense = (id) => {
        expenses.update((currentData) => {
            return currentData.filter((expense) => expense.id !== id);
        });
    };

    const deleteAllExpenses = () => {
        expenses.update(() => {
            return [];
        });
    };

    const handleEdit = (identifier) => {
        hidden = false;

        const expense = $expenses.find((item) => item.id === identifier);
        id = expense?.id;
        title = expense?.title;
        amount = expense?.amount;
    };
</script>

<Form
    {hidden}
    {buttonName}
    on:click={() => (hidden = true)}
    on:closeForm={() => (hidden = true)}
    bind:id
    bind:title
    bind:amount
/>

{#key deleteExpense}
    <div
        class="bg-slate-100 text-slate-800 w-full h-full flex flex-col justify-between items-center rounded-t-3xl pb-10"
    >
        <div
            class="w-full md:max-w-2xl h-full flex flex-col gap-10 py-6 px-6 sm:px-10 md:px-0"
        >
            <h2 class="text-2xl pt-6">Expenses List</h2>

            {#each $expenses as { id, title, amount } (id)}
                <div
                    class="flex justify-between items-center shadow-md bg-white p-6 rounded-md"
                    animate:flip
                    transition:fly={{ x: 100, duration: 300 }}
                >
                    <p>{title} <span>- ${amount}</span></p>
                    <div class="flex gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 text-slate-800 hover:cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            on:click={() => handleEdit(id)}
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 text-red-600 hover:cursor-pointer"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            on:click={() => deleteExpense(id)}
                        >
                            <path
                                fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            {:else}
                <p>No expenses added to the list</p>
            {/each}

            <button
                class="uppercase bg-slate-800 text-slate-100 p-2 rounded-full text-sm shadow-md hover:bg-red-600 transition duration-500"
                on:click={deleteAllExpenses}>clear expenses</button
            >
        </div>
    </div>
{/key}
