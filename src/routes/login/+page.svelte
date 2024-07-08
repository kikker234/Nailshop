<script lang="ts">
    import {onMount} from "svelte";

    export let form;

    let errorMessage = "";

    onMount(() => {
        if(form !== null) {
            if(typeof form === "string") {
                errorMessage = form;
                return;
            }

            let formData: any = form.data;
            let token = formData.token;
            document.cookie = "flexi=" + token;

            window.location.href = "/dashboard";
        }
    });


</script>

<div class="form-card center">

    <form method="POST">
        <h1>Login</h1>

        <div class="">
            <input name="email" type="text" placeholder="Email">
        </div>

        <div class="">
            <input name="password" type="password" placeholder="Password">
        </div>

        <div class="">
            <button>Login</button>
        </div>

        {#if errorMessage}
            {errorMessage}
        {/if}
    </form>
</div>