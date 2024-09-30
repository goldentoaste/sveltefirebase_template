<script lang="ts">
    import type {  Post } from "$lib/types";
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";

    import { fly } from "svelte/transition";

    // take in a post object in order to "render" the Conpomnent
    export let post: Post;

    // content currently in the input field.
    let commentInput = "";

    // createEventDispatcher returns a function, which lets use dispatch custom events
    // stuff below in <...> is typescript generics to provide type info on our custom event
    const dispatch = createEventDispatcher<{
        // this is how to type eventDispatcher
        liketoggle: {
            state: boolean;
        };
    }>();

    export let liked: boolean = false;



</script>

<div class="messageParent" transition:fly={{ x: -50, duration: 500 }}>
    <!-- use the post obj to fill in the blanks -->
    <p id="userName">{post.userName}</p>
    <p>{post.content}</p>

    <div id="votes">
        <Button highLighted={liked} on:click={
            ()=>{
                dispatch("liketoggle", {
                    state:liked
                })
            }
        }>
            <span class="thumb">👍 {post.likes}</span>
        </Button>
    </div>




</div>

<style>
    .messageParent {
        padding: 1rem;
        border: 2px solid var(--focus);
        background-color: var(--bg1);

        min-width: 400px;
        max-width: 400px;
    }

    #userName {
        margin-top: 0.25rem;
        font-weight: bold;
    }

    #votes {
        display: flex;
        gap: 0.5rem;
    }

    .thumb {
        font-size: large;
        transition: transform 400s ease-out;
    }

</style>
