
// listen for a form submit event
let el = document.getElementById("newComment");
if (el){
    el.addEventListener("submit", (e) => {
        // prevent the default form behavior
        // serialize the form data into an object
        e.preventDefault();
        var form = document.getElementById("newComment");
        console.log(form);
        let comment = $("form").serializeArray();
        var datas = {};
        console.log(comment);
        $(comment).each(function(index, obj){
            datas[obj.name] = obj.value;
        });
        // use axios to initialize a post request and send in the form data
        console.log(datas);

        //axios.post('/reviews/comments', data)
        axios({method: 'post', url: '/reviews/comments', data: datas})
        .then(function (response) {
            // wait for the success response from the server
            console.log(response);
            // remove the information from the form
            form.reset();
            // display the data as a new comment on the page
            var parentnode = document.getElementById("comments");
            console.log(parentnode);
            $(parentnode).prepend(
                `
                <div class="card" id="${response.data.comment._id}">
                <div class="card-block">
                <h4 class="card-title">${response.data.comment.title}</h4>
                <p class="card-text">${response.data.comment.content}</p>
                <p>
                <button class="btn btn-link" id="deleteComment-${response.data.comment._id}" data-comment-id=${response.data.comment._id}>Delete</button>
                </p>
                </div>
                </div>
                `
            );
        })
    });
}
/*
document.getElementById('deleteComment').addEventListener('click', (e) => {
  console.log("click!");
  //this only gets the first delete button. How to fix?
  let commentId = document.getElementById('deleteComment').getAttribute('data-comment-id');
  console.log(commentId);
  axios.delete(`/reviews/comments/${commentId}`)
    .then(response => {
      console.log(response);
      comment = document.getElementById(commentId);
      comment.parentNode.removeChild(comment);
    })
    .catch(error => {
      console.log(error);
    });
});
*/
elementsArray = document.querySelectorAll('[id^="deleteComment-"]');
console.log(elementsArray);
elementsArray.forEach(function(elem) {
    elem.addEventListener('click',  (e) => {
      console.log("click!");
      let commentId = elem.getAttribute('data-comment-id');
      console.log(commentId);
      axios.delete(`/reviews/comments/${commentId}`)
        .then(response => {
          console.log(response);
          comment = document.getElementById(commentId);
          comment.parentNode.removeChild(comment);
        })
        .catch(error => {
          console.log(error);
        });
    });
});

reviewsArray = document.querySelectorAll('[id^="deleteReview-"]');
console.log(reviewsArray);
reviewsArray.forEach(function(elem) {
    elem.addEventListener('click',  (e) => {
      console.log("click!");
      let reviewId = elem.getAttribute('data-review-id');
      console.log(reviewId);
      axios.delete(`/admin/reviews/${reviewId}`)
        .then(response => {
          console.log(response);
          review = document.getElementById(reviewId);
          review.parentNode.removeChild(review);
        })
        .catch(error => {
          console.log(error);
        });
    });
});
