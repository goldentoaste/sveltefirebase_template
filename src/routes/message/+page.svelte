<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import TextInput from "$lib/components/TextInput.svelte";
    import PostItem from "$lib/components/PostItem.svelte";
    import { addLike, getUserLikes, newPost, onPostChange, removeLike } from "$lib/firebase";
    import type {  Post } from "$lib/types";
    import { onMount } from "svelte";


    let _posts: { [id: string]: Post } = {
        "1": {
            id: "1",
            userName: "Alice",
            content: "Hello everyone!",
            likes: 10,
        },

        "2": {
            id: "2",
            userName: "Bob",
            content: "Wee woo!",
            likes: 0,
        },
        "3": {
            id: "3",
            userName: "Charlie",
            content: "Bee boop!",
            likes: 0,
        },
    };

    let userName = "Anon";
    let posts: { [id: string]: Post } = {};
    let postContent = "";
    let likedPosts = new Set<string>();

    $: if (userName && userName.length > 0) {
        getUserLikes(userName).then((likes) => {
            likedPosts = new Set<string>(likes);
        });
    }

    $:console.log(posts);
    

    onMount(async () => {
        onPostChange((changedPosts) => {
            changedPosts.forEach((post) => {
                posts[post.id] = post;
            });
        });
    });

    function addPost() {
        newPost(userName, postContent);
        // no need to modify posts list here, onPostChange will trigger
        // local changes will trigger onPostChange immediately, before the data is written to db.
        // see:https://firebase.google.com/docs/firestore/query-data/listenhttps://firebase.google.com/docs/firestore/query-data/listen
    }

    function toggleLike(postid: string, liked: boolean) {
        if (liked) {
            removeLike(postid, userName);
            likedPosts.delete(postid)
        } else {
            addLike(postid, userName);
            likedPosts.add(postid);
        }
    }
</script>

<h1>My Message Board</h1>

<div style="display: flex; flex-direction:column; width:400px;">
    <TextInput label="My name is" placeholder="name here" bind:value={userName} />

    <div class="hori">
        <TextInput
            label="Post"
            placeholder="Body of your post here..."
            style="flex:1;"
            bind:value={postContent}
            disabled={userName.length == 0}
        />
        <Button
            disabled={userName.length == 0}
            on:click={() => {
                addPost();
            }}
        >
            Submit
        </Button>
    </div>
</div>

<div class="posts">
    {#each Object.values(posts) as post, index (post.id)}
        <PostItem
            {post}
            on:liketoggle={(e) => {
                toggleLike(post.id, e.detail.state);
            }}
            liked={likedPosts.has(post.id)}
        />
    {/each}
</div>

<!-- Import and put the TodoList Component here, and give it the list of todoItems. -->

<style>
    .hori {
        display: flex;
        gap: 0.5rem;
    }
    .posts {
        display: flex;
        flex-direction: column-reverse;
        gap: 0.5rem;
    }
</style>
