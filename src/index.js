const apiUrl = "http://localhost:3000/posts";

const postList = document.getElementById("blogList");

const createForm = document.getElementById("form-section");

function getPosts() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      postList.innerHTML = "";

      data.forEach((post) => {
        const blogId = post.id;
        const blogTitle = post.title || "";
        const blogBody = post.body || "";

        const li = document.createElement("li");

        li.innerHTML = ` 
        <div id="post-${blogId}" class="post">

        <div>
          <b>${blogTitle}</b>
          <p>${blogBody}</p>
        </div>
        <div class="actions">
          <button onclick="showEditForm('${blogId}', '${blogTitle}', '${blogBody}')" class="myButton">edit</button>
          <button onclick="deletePost('${blogId}')" class="myDeleteButton">delete</button>
        </div>
        </div>
        
        `;

        postList.appendChild(li);
      });
    });
}

createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("post-content").value;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
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
  const postDiv = document.getElementById(`post-${blogId}`);

  postDiv.innerHTML = `

<div class="edit-form">
    <h3>Edit Post</h3>
   <div>
        <input type="text" id="edit-title-${postId}" value="${currentTitle}" placeholder="Edit title">
<textarea id="edit-content-${postId}" placeholder="Edit content">${currentBody}</textarea>
   </div>
<div>
<button onclick="saveEdit('${postId}')" class="myButton"><i class='bx bx-check'></i></button>
<button onclick="cancelEdit('${postId}')" class="myDeleteButton"><i class='bx bx-x'></i></button>
</div>

</div>
`;
}

// Patch request to update a post

function saveEdit(postId) {
  const newTitle = document.getElementById(`edit-title-${postId}`).value;
  const newContent = document.getElementById(`edit-content-${postId}`).value;

  fetch(`${apiUrl}/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
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