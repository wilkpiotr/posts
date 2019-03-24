import superagent from 'superagent';
import {bindShowHideComments} from './showhide';
import {sendComment} from './add-comment';

const postsUrl = 'http://localhost:3000/posts/';

export const bindPost = () => {
    renderPosts();
    bindForm();
    clickDeleteButton();
    bindShowHideComments();
    sendComment();
};

const clickDeleteButton = () => {
    const tbody = document.querySelector('tbody');
    tbody.addEventListener('click', (e) => {
        if ('delete' in e.target.dataset) {
            deletePost(e.target.dataset.id)
        }
    })
};

const deletePost = (id) => {
    return superagent
    .delete(postsUrl + id)
    .then(res => {
        renderPosts();
    })
};

const renderPosts = () => {
    return superagent
    .get(postsUrl)
    .end((err, response) => {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        response.body.forEach((el, index) => {
            const post = document.createElement('tr');
            post.classList.add("post") 
            post.dataset.id = `${el.id}`;
            post.innerHTML = `<td>${index + 1}</td>
                                <td>${el.author}</td>
                                <td>${el.title}</td>
                                <td><button class="button is-link is-small" data-show="false" data-id="${el.id}">Show comments</button><button class="button is-danger is-small" data-id="${el.id}" data-delete="">Delete Post</button></td>`;
            const comment = document.createElement('tr');
            comment.classList.add("comment") 
            comment.dataset.id = `${el.id}`;
            comment.style.display = "none";
            comment.innerHTML = `<td colspan="4"><p class="no-comment">This post has no comments.</p></td>`
            tbody.appendChild(post);
            tbody.appendChild(comment);            
        });
    });
    
}

const getID = () => {
    let maxID = 0;
    const posts = Array.from(document.querySelectorAll('tbody > tr'));
    posts.forEach(post => {
        const postid = parseInt(post.dataset.id);
        if (postid > maxID) {
            maxID = postid;
        }
        return maxID;
    })
};

const bindForm = () => {
    const postAuthor = document.querySelector('#input-author');
    const postTitle = document.querySelector('#input-title');
    const button = document.querySelector('.button-add');
    button.addEventListener('click', (e) => {
        if (validatePost(postAuthor, postTitle)) {
            return superagent
            .post(postsUrl)
            .send({
                id: getID() + 1,
                author: postAuthor.value,
                title: postTitle.value
            })
            .end((err, res) => {
                const tbody = document.querySelector('tbody');
                tbody.innerHTML = '';
                renderPosts();
                clearForm(postAuthor, postTitle);
            });
        }
    });
};

const validatePost = (author, title) => {
    const isAuthorValid = author.value.trim().length > 0;
    const isTitleValid = title.value.trim().length > 0;
    if (isAuthorValid && isTitleValid) {
        return isAuthorValid && isTitleValid
    } if (!isAuthorValid && isTitleValid) {
        author.classList.add('invalid');
        author.placeholder = 'Please, enter your name';
    } if (isAuthorValid && !isTitleValid) {
        title.placeholder = 'Please, enter title of the post';
        title.classList.add('invalid');
    } else if (!isAuthorValid && !isTitleValid) {
        author.classList.add('invalid');
        author.placeholder = 'Please, enter your name';
        title.placeholder = 'Please, enter title of the post';
        title.classList.add('invalid');
    }
}

const clearForm = (author, title) => {
    author.value = '';
    author.placeholder = "Your Nickname";
    author.classList.remove('invalid');
    title.value = '';
    title.placeholder = "Title of Post";
    title.classList.remove('invalid');
};

