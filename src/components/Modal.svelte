<script>
	export let isOpen = false;

	function closeModal() {
		isOpen = false;
	}
</script>

<style>
    #modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);

        justify-content: center;
        align-items: center;

        transition: all 0.3s ease-in-out;
    }

    .modal-content {
        overflow: hidden;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

        width: 75vw;
        height: 75vh;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .btn-bar {
        display: flex;
        justify-content: end;
        padding: 1rem;
    }

    .btn-bar > * {
        width: 10%;
        padding: 10px;
    }

    .show {
        display: flex;
        animation: forwards fade-in 250ms ease-in-out;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .hide {
				display: none;
    }
</style>

<div id="modal" class={isOpen ? 'show' : 'hide'} on:click="{closeModal}">
	<div class="modal-content" on:click|stopPropagation>
		<slot></slot>
	</div>
</div>
