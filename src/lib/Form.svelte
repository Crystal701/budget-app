<script>
    import { fade, fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { expenses } from "../stores/expensesData.js";

    export let hidden = true;
    export let id = "";
    export let title = "";
    export let amount = "";
    export let buttonName = "add expense";

    let valid = false;
    let error = {
        title: "",
        amount: "",
    };

    const dispatch = createEventDispatcher();

    const handleExpense = () => {
        valid = true;

        if (title.trim() === "") {
            valid = false;
            error.title = "Cannot be empty";
        } else {
            error.title = "";
        }

        if (amount === "") {
            valid = false;
            error.amount = "Cannot be empty";
        } else {
            error.amount = "";
        }

        if (valid) {
            if (buttonName === "add expense") {
                const newData = { id: Math.random(), title, amount };
                expenses.update((currentData) => {
                    return [...currentData, newData];
                });
            } else if (buttonName === "edit expense") {
                const updatedData = $expenses.map((item) => {
                    return item.id === id
                        ? { ...item, title, amount }
                        : { ...item };
                });

                expenses.update(() => {
                    return updatedData;
                });
            }

            id = "";
            title = "";
            amount = "";

            dispatch("closeForm");
        }
    };
</script>

{#key hidden}
    <div
        class="fixed top-0 left-0 h-full w-screen bg-[rgba(0,0,0,0.6)] flex justify-center items-center"
        class:hidden
        in:fade={{ duration: 100 }}
        out:fade={{ duration: 300 }}
    >
        <form
            class="w-full max-w-2xl bg-slate-100 border-0 rounded-md p-14 flex flex-col justify-between gap-6 relative"
            in:fly={{ y: 200, duration: 300, delay: 300 }}
            on:submit|preventDefault={handleExpense}
        >
            <div class="absolute top-6 right-6" on:click>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 hover:cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>

            <h2 class="text-xl text-slate-800">Add Expense</h2>

            <input
                type="text"
                id="name"
                placeholder="Title"
                class="p-4 placeholder-slate-600 border-b-4 border-slate-700 focus:outline-0 focus:border-red-600"
                bind:value={title}
            />
            <p class="text-red-600">{error.title}</p>
            <input
                type="number"
                id="name"
                placeholder="Amount"
                class="p-4 placeholder-slate-600 border-b-4 border-slate-700 focus:outline-0 focus:border-red-600"
                bind:value={amount}
            />
            <p class="text-red-600">{error.amount}</p>

            <button
                class="uppercase bg-slate-800 text-slate-100 p-2 border-0 rounded-full hover:bg-slate-100 hover:outline hover:outline-2 hover:outline-slate-800 hover:text-slate-800 transition duration-300"
                >{buttonName}</button
            >
        </form>
    </div>
{/key}
