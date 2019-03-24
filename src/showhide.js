import superagent from 'superagent';
import {sendComment} from './add-comment';


export const bindShowHideComments = () => {
    const tbody = document.querySelector('tbody');
    tbody.addEventListener('click', (e) => {
        if (e.target.dataset.show === 'false') {
            showComments(e.target)
        } else if (e.target.dataset.show === 'true') {
            hideComments(e.target)
        }
    })
};

const showComments = (btn) => {
    btn.textContent = 'Hide comments';
    btn.dataset.show = 'true';
    const commentsContainer = btn.parentElement.parentElement.nextElementSibling;
    commentsContainer.style.display= 'table-row';
    getComments(btn.dataset.id);
    };

const hideComments = (btn) => {
    btn.textContent = 'Show comments';
    btn.dataset.show = 'false';
    const commentsContainer = btn.parentElement.parentElement.nextElementSibling;
    commentsContainer.style.display=  'none';
    commentsContainer.firstElementChild.innerHTML = `<p>This post has no comments.</p>`;                         
};  

export const getComments = (id) => {
    const commentsList = document.querySelector('.comment[data-id="' + id + '"] > td')
        return superagent
        .get('http://localhost:3000/comments?postId=' + id)
        .then((response) => {
            const comments = response.body.reduce((html,el) => {
                return `${html}<p data-id=${el.id} data-post-id=${el.postId}>${el.body}</p>`
            },"")

            commentsList.innerHTML = response.body.length === 0 ? `<p>This post has no comments.</p>` : comments;

            // response.body.forEach(el => {
            //     // if  (commentsList.firstElementChild.textContent === "This post has no comments.") {
            //     //     commentsList.removeChild(commentsList.firstElementChild);
            //     // }
            //         const comment = document.createElement('p');
            //         comment.dataset.id = `${el.id}`;
            //         comment.dataset.postId = `${el.postId}`;
            //         comment.innerText = el.body;     
            //         commentsList.appendChild(comment);
            // }) ;

            const addComment = document.createElement('div');
            addComment.classList.add('control')
            addComment.innerHTML = `<textarea class="textarea is-primary" type="text" placeholder="Put your comment"></textarea><button class="button is-success" data-add-comment data-id=${id}>Add Comment</button>`
            commentsList.appendChild(addComment);
        })
}
