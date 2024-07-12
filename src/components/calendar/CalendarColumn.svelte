<script lang="ts">
	export let date;
	export let tasks;
	export let hours;

	$: key = 0;

	$: {
		if (tasks) {
			tasks.sort((a, b) => {
				const startA = new Date(a.customComponentFields.find((field) => field.key == 'start').value);
				const startB = new Date(b.customComponentFields.find((field) => field.key == 'start').value);
				return startA - startB;
			});

			key++
		}
	}

	function taskAtHour(hour: string) {
		return tasks.find(task => {
			// if (task.date !== date.toDateString()) return false;

			let start = task.customComponentFields.find((field) => field.key == 'start');
			let end = task.customComponentFields.find((field) => field.key == 'end');

			if (start === undefined || end === undefined) return false;

			end = end.value;
			start = start.value;

			let startDate = new Date(start);
			let endDate = new Date(end);

			if(startDate.toDateString() !== date.toDateString()) return false;

			const startHour = startDate.getHours();
			const endHour = endDate.getHours();
			const currentHour = parseInt(hour.split(':')[0]);

			return currentHour >= startHour && currentHour < endHour;
		});
	}

	function isTitleShown(hour: string) {
		const task = taskAtHour(hour);
		if (task == null) return false;

		const startHour = new Date(task.customComponentFields.find((field) => field.key == 'start').value).getHours();
		const currentHour = parseInt(hour.split(':')[0]);
		return currentHour === startHour;
	}
</script>

<div class="column">
	<div class="date">{date.toDateString()}</div>

	{#key key}
		<div class="hours">
			{#each hours as hour}
				<div class="hour">
					{#if taskAtHour(hour)}
						<div class="task">
							{#if isTitleShown(hour)}
								<div class="task-title">{taskAtHour(hour).name}</div>
								<div class="task-time">{taskAtHour(hour).start} - {taskAtHour(hour).end}</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/key}
</div>

<style>
    .column {
        background-color: #ffffff;
        text-align: left;
        display: grid;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .date {
        font-weight: bold;
        height: 38px;
    }

    .hours {
        width: 100%;
        display: grid;
        grid-template-rows: repeat(24, 1fr);
    }

    .hour {
        height: 100%;
        min-height: 38px;
        background-color: lightgray;
    }

    .hour:not(:has(.task)) {
        border-top: 1px solid #a8a8a8;
        border-left: 1px solid #a8a8a8;
        border-right: 1px solid #a8a8a8;

				box-sizing: border-box;
    }

    .task {
        background-color: var(--primary-color);
        height: 100%;
        color: white;

        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

</style>
