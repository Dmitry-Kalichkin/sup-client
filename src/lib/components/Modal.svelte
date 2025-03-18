<script>
    import { on } from "svelte/events";

	let { showModal = $bindable(), onsubmit=null, header, children, onClose=null } = $props();

	let dialog = $state();

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<div class="modal-container" style:display={showModal ? 'flex' : 'none'}>
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
    <dialog
        bind:this={dialog}
        onclose={() => {showModal = false; onClose?.()}}
        onclick={(e) => { if (e.target === dialog) dialog.close(); }}
    >
        <form class="modal" {onsubmit}>
            {@render header?.()}
            {@render children?.()}
            <!-- svelte-ignore a11y_autofocus -->
			{#if onsubmit}
			 	<button autofocus type="submit">Создать</button>
			{/if}
		</form>
    </dialog>
</div>

<style>
    .modal-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

	dialog {
		max-width: 32em;
		border-radius: 10px;
		border: none;
        display: flex;
        margin: auto;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.2);
	}

	dialog > form {
		padding: 1em;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

    button {
        padding: 10px;
        border: 0px;
        border-radius: 5px;
        border-color: var(--brand-color);
        background-color: var(--brand-color);
        color: #ffffff;
        cursor: pointer;
        margin: 5px;
    }

	.modal {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>