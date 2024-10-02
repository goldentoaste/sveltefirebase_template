<script lang="ts">
    // some starting data to test our UI before database is made yet.
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
    let posts: { [id: string]: Post } = {};
    let idIndex = 0; // remove this when db is ready, until then, use this to index objs.

    // TODO create variables to track userName, content of the post input, and likedPost ids

    // TODO do a reactive statement to update list of likes whenever username changes.

    // TODO onMount/when app loads to setup onPostChange() callbacks, that updates posts list on change.

    function addPost() {
        // TODO add new Posts to the list when this function is called.
        // TODO once database is ready, reflect changes in db.
    }

    function toggleLike(postid: string, liked: boolean) {
        // TODO if liked, make it not liked and vice versa.
        // TODO once db is ready, reflect changes in db.
    }
</script>

<h1>My Message Board</h1>

<div style="display: flex; flex-direction:column; width:400px;">
    <!--TODO Name input -->

    <!-- TODO input field for post content -->
    <!-- TODO button to submit post content -->
</div>

<div class="posts">
    <!-- TODO do a #each statement to render each post -->
</div>


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
