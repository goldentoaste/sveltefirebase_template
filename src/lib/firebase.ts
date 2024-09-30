// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, increment, onSnapshot, query, QueryDocumentSnapshot, setDoc, updateDoc } from "firebase/firestore";
import type { Post } from "./types";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyBWe29kEXwqUrpDcFfActe1vrtgrfVp7VU",

    authDomain: "simpler-sveltefirebase-demo.firebaseapp.com",

    projectId: "simpler-sveltefirebase-demo",

    storageBucket: "simpler-sveltefirebase-demo.appspot.com",

    messagingSenderId: "1096851355580",

    appId: "1:1096851355580:web:a2374a415bd3ad25109db9"

};


// Initialize Firebase



// Initialize Firebase

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase)

export async function newPost(userName: string, content: string) {

    // make a ref to a collection called posts, then add a doc to it
    await addDoc(collection(db, "posts"), {
        // each json field is converted to a document property in firebase
        userName: userName,
        content: content,
        likes: 0
    })
}


export async function addLike(postid: string, userName: string) {

    console.log(postid, userName);
    
    // functions like doc and collection takes any number of string args as the path to doc or collection
    await updateDoc(doc(db, 'posts', postid), {
        // increment is a kind of special function in the value field to represent an action on the db
        likes: increment(1)
    })

    // also add a record to track which posts the current user liked already
    await setDoc(doc(db, "likes", userName), {
        likes: arrayUnion(postid) // adds postid to the array, but do nothing if its already in.
    }, {
        // when merge is true, setDoc acts like updateDoc, but also creates the doc if it doenst exist yet.
        merge: true
    })
}


export async function removeLike(postid: string, userName: string) {
    await updateDoc(doc(db, "posts", postid), {
        likes: increment(-1)
    })

    await setDoc(doc(db, "likes", userName), {
        likes: arrayRemove(postid)
    }, {
        merge: true
    })
}


export async function onPostChange(onChange: (changes: Post[]) => void) {
    const unsub = onSnapshot(query(collection(db, "posts")), snap => {
        const posts: Post[] = [];

        // .docChanges() contains only the changes, while .doc contains all the docs.
        // note that onSnapshots read everything on the first call, so could be expensive
        // see: https://medium.com/firebase-tips-tricks/how-to-drastically-reduce-the-number-of-reads-when-no-documents-are-changed-in-firestore-8760e2f25e9e
        snap.docChanges().forEach(change => {
            const data = change.doc.data();

            // document in db doesnt include a id field so we are going to include it
            data.id = change.doc.id;
            posts.push( data as Post);
        })

        // call the callback to notify frontend that this batch of posts needs to be updated.
        onChange(posts);
        
    })

    return unsub;
}

export async function getUserLikes(userName: string) {

    // get each posts the current user liked
    const userLikeDoc = await getDoc(doc(db, "likes", userName))

    if (userLikeDoc.exists()){

        return userLikeDoc.data().likes as string[];
    }
    return [];

}