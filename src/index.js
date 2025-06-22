const apiUrl = ('http://localhost:3000/posts');
const postContent = document.getElementById("postContent");
const formSection = document.getElementById("form-section");

//get post

function getPost() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      postContent.innerHTML = "";

      data.forEach(post => {
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
          <button onclick="showEditForm('${blogId}', '${blogTitle}', '${blogBody}')" class="myButton"><i class='bx bx-edit-alt'></i></button>
          <button onclick="deletePost('${blogId}')" class="myDeleteButton"><i class='bx bx-trash'></i></button>
        </div>
        </div>
        
        `;

        postContent.appendChild(li);
      });
    });
}

// post(create)

formSection.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("blog-title").value;
  const body = document.getElementById("myBlogText").value;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ title, body }),
  })

    .then(res => res.json())
    .then(data => {
      alert("post created successfully")
      console.log(data);
      getPost();
      formSection.reset();
    });

});

//

function showEditForm(blogId, currentTitle, currentBody) {
  const postDiv = document.getElementById(`post-${blogId}`);

  postDiv.innerHTML = `

<div class="edit-form">
    <h3>Edit Post</h3>
   <div>
        <input type="text" id="edit-title-${blogId}" value="${currentTitle}" placeholder="Edit title">
<textarea id="edit-content-${blogId}" placeholder="Edit content">${currentBody}</textarea>
   </div>
<div>
<button onclick="saveEdit('${blogId}')" class="myButton"><i class='bx bx-check'></i></button>
<button onclick="cancelEdit('${blogId}')" class="myDeleteButton"><i class='bx bx-x'></i></button>
</div>

</div>
`;
}

// patch(update)

function saveEdit(postId) {
  const newTitle = document.getElementById(`edit-title-${blogId}`).value;
  const newContent = document.getElementById(`edit-content-${blogId}`).value;

  fetch(`${API_URL}/${blogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle, body: newContent }),
  })
    .then((response) => response.json())
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
    fetch(`${API_URL}/${postId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Post deleted successfully!");
        console.log(data);
        getPosts();
      });
  }
}

getPosts();
