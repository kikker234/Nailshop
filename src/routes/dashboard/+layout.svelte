<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n'

	$: isSelected = (page: string) => {
		return $page.url.pathname === page;
	};
</script>

<div class="container">

	<nav>
		<ul>
			<li><a class="{isSelected('/dashboard')  ? 'selected' : ''}" href="/dashboard">
				{$_("dashboard.navbar.dashboard")}
			</a></li>

			<li><a class="{isSelected('/dashboard/calendar')  ? 'selected' : ''}" href="/dashboard/calendar">
				{$_("dashboard.navbar.calendar")}
			</a></li>

			<li><a class="{isSelected('/dashboard/customers')  ? 'selected' : ''}" href="/dashboard/customers">
				{$_("dashboard.navbar.customers")}
			</a></li>

			<li><a class="{isSelected('/dashboard/treatment')  ? 'selected' : ''}" href="/dashboard/treatment">
				{$_("dashboard.navbar.treatment")}
			</a></li>

			<li><a class="{isSelected('/dashboard/account')  ? 'selected' : ''}" href="/dashboard/account">
				{$_("dashboard.navbar.account")}
			</a></li>
		</ul>
	</nav>

	<section>
		<slot></slot>
	</section>
</div>

<style>

    .container {
        display: flex;
    }

    nav {
        width: 16%;
        height: 100vh;
        background: white;
        box-shadow: var(--shadow);
    }

    section {
        height: 100vh;
        flex: 1;

				overflow-y: scroll;
				overflow-x: hidden;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        padding: 10px;
    }

    a {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        border-radius: var(--border-radius);
        background-color: var(--secondary-background-color);
        text-decoration: none;
        color: inherit;
    }

    .selected {
        background-color: var(--primary-color);
        color: white;
    }
</style>