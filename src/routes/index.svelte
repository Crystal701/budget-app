<script>
    import { expenses } from "../stores/expensesData.js";
    import ExpensesList from "$lib/ExpenseList.svelte";

    $: totalExpenses = $expenses.reduce((acc, curr) => acc + curr.amount, 0);
</script>

<h2
    class="sticky top-10 h-45 text-slate-100 text-2xl w-full md:max-w-2xl py-10 px-6 sm:px-10 md:px-0 mb-10"
>
    Total Expenses: ${totalExpenses}
</h2>

<ExpensesList />
