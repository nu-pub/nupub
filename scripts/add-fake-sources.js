const admin = require("firebase-admin");
const fetch = require("node-fetch");

// init firebase
const serviceAccount = require("./serviceAccountKey.dev.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = require("firebase-admin").firestore();

const main = async () => {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  console.log(`${data.content} —${data.author}`);

  const ref = await db.collection("sources").add({
    creator: data.author,
    title: data.content,
  });

  await db.collection("sources").doc(ref.id).collection("body").add({
    body: data.content,
    index: 1,
  });
};

main();
