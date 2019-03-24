import  './css/index.css';
import  './css/other.css';
import  'bulma/css/bulma.css';
import axios from 'axios';
import superagent from 'superagent';
import $ from 'jquery';
import  { bindPost } from './postslist.js';


console.log('JavaScript was attached to the page!');

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded. Ready to go!");
    bindPost();  
  });

const postsUrl = 'http://localhost:3000/posts'

// axios
// .get(postsUrl)
// .then((result) => { return result.data })
// .then((data) => { 
//     console.log('AXIOS');
//     console.log(data);
//     // const body = document.querySelector('body')
//     // const html = data.reduce((html, data) => {
//     //     return html + `<table>
//     //     <tr>
//     //       <td>${data.id}</td>
//     //       <td>${data.title}</td>
//     //       <td>${data.author}</td>
//     //     </tr>
//     //   </table>`
//     // }, '');
//     // return body.innerHTML = body.firstElementChild + html;
// });

// superagent
// .get(postsUrl)
// .end((err, response) => {
//     console.log('SUPERAGENT');
//     console.log(response.body);
// });

// $.get(postsUrl)
// .then((response) => {
//     console.log('JQUERY');
//     console.log(response);
// })

