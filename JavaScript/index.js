
function themeToggle() {
    const dataTheme = document.querySelector("[data-theme]");
    const theme = dataTheme.attributes[0].value
    console.log(theme)
    if (theme === "dark") {
      dataTheme.attributes[0].value = "light"
    }
    if (theme === "light") {
      dataTheme.attributes[0].value = "dark"
    }
  }
  
  document.getElementById("theme-toggle").addEventListener('click', () => {
    themeToggle()
  })

/*=====================================================================*/

// Get Slider Items | Array.form [ES6 Feature]
let usernames = Array.from(document.querySelectorAll(".username"));

let replyBtns = Array.from(document.querySelectorAll(".reply-btn"));
let deleteBtns = Array.from(document.querySelectorAll(".delete-btn"));
let editBtns = Array.from(document.querySelectorAll(".edit-btn"));

let body = document.querySelector("body");

/*=====================================================================*/

/*==== add card delete comment form button delete ====*/
const bgCard = document.createElement("div");
const card = document.createElement("div");

bgCard.classList.add("bg-card")
card.classList.add("card")

bgCard.appendChild(card);

card.innerHTML = `
    <p class="title">Delete comment</p>
    <p class="subtitle">Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
    </p>
    <div class="btns">
        <button class="no-btn">NO, CANCEL</button>
        <button class="yes-btn">YES, DELETE</button>
    </div> `;

/*==== Update the counter value ====*/
const plusValue = (elem) => {
    elem.closest('.comment-votes').querySelector('.votes-counter').innerHTML =
        Number.parseInt(elem.closest('.comment-votes').querySelector('.votes-counter').innerHTML) + 1
}

const minusValue = (elem) => {
    elem.closest('.comment-votes').querySelector('.votes-counter').innerHTML =
        Number.parseInt(elem.closest('.comment-votes').querySelector('.votes-counter').innerHTML) - 1
}

document.querySelector('main').addEventListener('click', (elem) => {
    /*==== card delete comment  ====*/
    if (elem.target.classList.contains('delete-btn')) {
        body.style.overflow = "hidden";
        body.appendChild(bgCard);

        document.querySelector(".no-btn").onclick = () => {
            body.style.overflow = "auto";
            bgCard.remove()
        }

        document.querySelector(".yes-btn").onclick = () => {
            body.style.overflow = "auto";
            bgCard.remove();
            elem.target.closest('.comment-btn').querySelector(".delete-btn").parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        }
    }
    /*==== edit comment  ====*/
    else if (elem.target.classList.contains('edit-btn')) {
        const div = elem.target.closest('.comment-body').querySelector(".comment-content");
        const commentBody = elem.target.closest('.comment').querySelector(".comment-body");

        if (commentBody.childNodes[3].classList.contains("textarea-content")) {
            elem.target.closest('.comment-btn').querySelector(".edit-btn").style.cursor = "no-drop";
        } else {
            const textarea = document.createElement('textarea');
            textarea.classList.add("comment-content", "textarea-content");

            const update = document.createElement('button');
            update.innerText = "update";
            update.classList.add("update-btn");
            commentBody.appendChild(update);

            textarea.innerText = div.innerText;
            div.parentNode.replaceChild(textarea, div);

            update.addEventListener("click", function () {
                elem.target.closest('.comment-btn').querySelector(".edit-btn").style.cursor = "pointer";
                div.innerText = textarea.value;
                textarea.parentNode.replaceChild(div, textarea);
                update.remove();
            })
        }
    }
    /*==== Increased or decrease the counter value ====*/
    else if (elem.target.classList.contains('plus-btn')) {
        plusValue(elem.target)
    }
    else if (elem.target.classList.contains('minus-btn')) {
        minusValue(elem.target)
    }
})

/*=====================================================================*/

function replaceBtns() {
    for (let i = 0; i < usernames.length; i++) {
        if (usernames[i].innerText === "juliusomo") {
            replyBtns[i].remove()
        } else {
            deleteBtns[i].remove();
            editBtns[i].remove();
        }
    }
}

replaceBtns();

/*=====================================================================*/

    /*==== reply comment  ====*/
function reply() {
    let commentContainer = document.querySelectorAll(".comment-container")

    for (let i = 0; i < replyBtns.length; i++) {
        replyBtns[i].addEventListener("click", function () {
            const replyContainer = document.createElement('div');

            if (commentContainer[i].lastElementChild.classList.contains("reply-content")) {
                // replyBtns[i].style.cursor = "no-drop";
            } else {
                // replyContainer.classList.add("reply-container");
                replyContainer.classList.add("reply-content");
                replyContainer.innerHTML = `
                            <div class="add-comment reply-comment">
                                <div class="add-comment-container reply-comment-container">
                                    <div class="profile-pic"></div>
                                    <textarea class="comment-input" name="input" placeholder="Add a comment">@amyrobson, </textarea>
                                    <button class="add-btn reply-comment-btn">reply</button>
                                </div>
                            </div>`
                commentContainer[i].appendChild(replyContainer);

                document.querySelector(".reply-comment-btn").addEventListener("click", function () {
                    // editBtns[i].style.cursor = "pointer";
                    replyContainer.classList.add("reply-container");
                    textInput = document.querySelector(".comment-input").value.slice(11,);
                    // console.log(textInput);

                    const currentComment = `
                        <div class="comment">
                            <div class="comment-votes">
                                <button class="plus-btn" aria-label="plus-btn">
                                    <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #aec4e9;"></path>
                                    </svg>
                                </button>
                                <div class="votes-counter">0</div>
                                <button class="minus-btn" aria-label="minus-btn"><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #aec4e9;"></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="comment-body comment-body-now">
                                <div class="comment-header">
                                    <div class="comment-pic">
                                        <div class="profile-pic juliusomo"></div>
                                        <div class="username">juliusomo</div>
                                        <div class="you-tag">you</div>
                                        <div class="comment-posted-time">1 days ago</div>
                                    </div>
                                    <div class="comment-btn">
                                        <button class="delete-btn delete-btn-now ">
                                            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #ed6469;"></path>
                                            </svg>
                                            Delete</button>
                                        <button class="edit-btn edit-btn-now ">
                                            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #6385bd;"></path>
                                            </svg>
                                            Edit</button>
                                    </div>
                                </div>
                                <div class="comment-content comment-content-now comment-value">
                                    <span class="replyingTo">@ramsesmiron</span>
                                    ${textInput}
                                </div>
                            </div>
                        </div>
                `
                    replyContainer.innerHTML = currentComment

                })
            }
        })
    }
}

reply();

/*=====================================================================*/

let container = document.querySelector(".container");
let addComment = document.querySelector(".add-comment");

let send = document.querySelector(".send");
let commentInput = document.querySelector(".comment-input");

    /*==== send comment  ====*/
send.addEventListener("click", function () {
    // console.log(commentInput.value);

    if (commentInput.value != false) {
        const newContainer = document.createElement('div');
        container.insertBefore(newContainer, addComment);
        newContainer.classList.add("comment-container");
        textInput = commentInput.value;

        newContainer.innerHTML = `
                <div class="comment">
                            <div class="comment-votes">
                                <button class="plus-btn" aria-label="plus-btn">
                                    <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #aec4e9;"></path>
                                    </svg>
                                </button>
                                <div class="votes-counter">0</div>
                                <button class="minus-btn" aria-label="minus-btn"><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #aec4e9;"></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="comment-body comment-body-now">
                                <div class="comment-header">
                                    <div class="comment-pic">
                                        <div class="profile-pic juliusomo"></div>
                                        <div class="username">juliusomo</div>
                                        <div class="you-tag">you</div>
                                        <div class="comment-posted-time">1 days ago</div>
                                    </div>
                                    <div class="comment-btn">
                                        <button class="delete-btn  delete-btn-now">
                                            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #ed6469;"></path>
                                            </svg>
                                            Delete</button>
                                        <button class="edit-btn edit-btn-now ">
                                            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #6385bd;"></path>
                                            </svg>
                                            Edit</button>
                                    </div>
                                </div>
                                <div class="comment-content comment-content-now comment-value">
                                    <span class="replyingTo">@ramsesmiron</span>
                                    ${textInput}
                                </div>
                            </div>
                        </div>
                `
        commentInput.value = "";

    }
})

/*=====================================================================*/
