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

        display: flex;
        justify-content: center;
        align-items: center;
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

</style>

<div id="modal" style={isOpen ? 'display: flex' : 'display: none'} on:click="{closeModal}">
	<div class="modal-content" on:click|stopPropagation>
		<slot></slot>

		<div class="btn-bar">
			<slot name="btn-bar"></slot>

			<button type="button" class="close-button" on:click="{closeModal}">Close</button>
		</div>
	</div>
</div>
