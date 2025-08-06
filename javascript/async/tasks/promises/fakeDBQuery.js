// ## Implement fakeDBQuery()

// - Create a function that simulates a DB query with a random delay and returns data (like a user object).
// - Chain multiple fake queries.

const user = { id: 1, username: "john_doe" };
const posts = [
  { id: 1, title: "Post 1", userId: 1 },
  { id: 2, title: "Post 2", userId: 1 },
  { id: 3, title: "Post 3", userId: 1 },
];
const comments = [
  { id: 1, postId: 1, text: "Comment 1" },
  { id: 2, postId: 1, text: "Comment 2" },
  { id: 3, postId: 2, text: "Comment 3" },
];

const fakeDBQuery = (queryName) => {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 2000) + 500; // 500ms–2500ms
    setTimeout(() => {
      console.log(`Query "${queryName}" resolved in ${delay}ms`);
      resolve({
        name: queryName,
        data:
          queryName === "getUser"
            ? user
            : queryName === "getPostsByUser"
            ? posts
            : queryName === "getCommentsForPost"
            ? comments
            : null,
      });
    }, delay);
  });
};

fakeDBQuery("getUser")
  .then((user) => {
    console.log("User:", user);
    return fakeDBQuery("getPostsByUser");
  })
  .then((posts) => {
    console.log("Posts:", posts);
    return fakeDBQuery("getCommentsForPost");
  })
  .then((comments) => {
    console.log("Comments:", comments);
  });
