const apiUrl = ("http://localhost:3000/posts");

const postList = document.getElementById("blogList");

const createForm = document.getElementById("form-section");

function escapeString(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r");
}

function getPosts() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      postList.innerHTML = "";

      data.forEach((post) => {
        const postId = post.id;
        const postTitle = post.title || "";
        const postBody = post.body || "";

        const li = document.createElement("li");

        li.innerHTML = `
          <div id="post-${postId}" class="post">
            <div>
              <h2>${postTitle}</h2>
              <p>${postBody}</p>
            </div>
            <div class="actions">
              <button class="myButton edit-btn">edit</button>
              <button class="myDeleteButton delete-btn">delete</button>
            </div>
          </div>
        `;

        postList.appendChild(li);

        const editBtn = li.querySelector(".edit-btn");
        const deleteBtn = li.querySelector(".delete-btn");

        editBtn.addEventListener("click", () => showEditForm(postId, postTitle, postBody));
        deleteBtn.addEventListener("click", () => deletePost(postId));
      });
    });
}



createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const blogTitle = document.getElementById("blog-title").value;
  const blogBody = document.getElementById("blog-content").value;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: blogTitle, body: blogBody }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Post created successfully!");
      console.log(data);
      getPosts();
      createForm.reset();
    });
});

function showEditForm(postId, currentTitle, currentBody) {
  const postDiv = document.getElementById(`post-${postId}`);

  postDiv.innerHTML = `

<div class="edit-form">
    <h3>Edit Post</h3>

    <div>
      <input type="text" id="edit-title-${postId}" value="${currentTitle}" placeholder="Edit title">
      <textarea id="edit-content-${postId}" placeholder="Edit content">${currentBody}</textarea>
    </div>

    <div>
       <button onclick="saveEdit('${postId}')" class="myButton">save</button>
       <button onclick="cancelEdit('${postId}')" class="myDeleteButton">cancel</i></button>
    </div>

</div>
`;
}


function saveEdit(postId) {
  const newTitle = document.getElementById(`edit-title-${postId}`).value;
  const newContent = document.getElementById(`edit-content-${postId}`).value;

  fetch(`${apiUrl}/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle, body: newContent }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Post updated successfully!");
      console.log(data);
      getPosts();
    });
}

function cancelEdit() {
  getPosts();
}



function deletePost(postId) {
  if (confirm("Are you sure you want to delete this post?")) {
    fetch(`${apiUrl}/${postId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Post deleted successfully!");
        console.log(data);
        getPosts();
      });
  }
}

getPosts();