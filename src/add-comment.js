import superagent from 'superagent';
// import { bindShowHideComments } from './showhide';
import {getComments} from './showhide'

export const sendComment = (id) => {
    const tbody = document.querySelector('tbody');
    tbody.addEventListener('click', (e) => {
        if ('addComment' in e.target.dataset) {
            return superagent
            .post('http://localhost:3000/comments')
            .send({
                id: getComID(e.target.dataset.id) + 1,
                body: e.target.previousElementSibling.value,
                postId: e.target.dataset.id
            })
            .end((err, res) => {
                // console.log(res)
                e.target.previousElementSibling.value = ''
                const commentTD = e.target.parentElement.parentElement;
                commentTD.innerHTML  = '';
                getComments(e.target.dataset.id)
            })
        } 
    })
}

const getComID = (id) => {
    let maxID = 0;
    const comments = document.querySelectorAll('p[data-post-id="' + id + '"]');
    const IDArray = Array.from(comments);
    IDArray.forEach(comment => {
        const commentId = parseInt(comment.dataset.id);
        if (commentId > maxID) {
            maxID = commentId;
        }
        return maxID;
    })
}
