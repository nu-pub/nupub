const admin = require("firebase-admin");
const fetch = require("node-fetch");
const fs = require("fs").promises;
const cheerio = require("cheerio");

// init firebase
const serviceAccount = require("./serviceAccountKey.dev.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = require("firebase-admin").firestore();

const main = async () => {
  const f = await fs.readFile("./data/stick.html");
  const $ = cheerio.load(f);
  const paragraphs = $("p").map((i, e) => {
    return { body: $(e).text(), index: i };
  });

  const ref = await db.collection("sources").add({
    creator: "HTML",
    title: "stick",
  });

  await Promise.all(
    paragraphs.map((i, e) =>
      db.collection("sources").doc(ref.id).collection("body").add({
        body: e.body,
        index: e.index,
      })
    )
  );
};

main();
