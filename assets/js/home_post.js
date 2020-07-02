/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
// method to submit the form data for new post using AJAX

function noty_flash(type, message) {
  new Noty({
    theme: "metroui",
    text: message,
    type: type,
    layout: "topRight",
    timeout: 1000,
  }).show();
}

 {
     let createPost = function(){
         let newPostForm = $('#new-post-form');

         newPostForm.submit(function(e){
             e.preventDefault();

             $.ajax ({
                 type: 'POST',
                 url: '/posts/create',
                 data: newPostForm.serialize(),
                 success: function(data){
                     let newPost =  newPostDom(data.data.post);
                     $('#posts-container').prepend(newPost);
                     noty_flash("success", "Post Created Successfully!");
                      $("textarea")[0].value = "";

                     deletePost($(".delete-post-button",newPost));
                     
                     
                     
                 }, error: function(error){
                     console.log(err.responseText)
                 }
             });
         });
     }

    //  method to create a post in DOM
    let newPostDom = function(post){
        return $(`<div class="card w-100 mt-3 mb-2" id="post_${post._id}">
    <div class="card-body">

        <!-- options to delete a post and stuff -->
 
        <div class="dropdown">
            <a class="float-right" href="" id="more_options_${post._id}" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                <i class="fas fa-ellipsis-h"></i>
            </a>
            <div class="dropdown-menu" aria-labelledby="more_options_${post._id}">
                <a class="dropdown-item delete-post-button" href="/posts/destroy/${ post._id }"><i
                        class="fas fa-trash-alt"></i>
                    Delete</a>
                    <a class="dropdown-item" href="#"><i class="fas fa-bookmark"></i>&nbsp;Save Post</a>
                    <a class="dropdown-item" href="#"><i class="fas fa-eye-slash"></i>&nbsp;Hide Post</a>
            </div>
        </div>
        
        <h5 class="card-title">${post.user_name}</h5>
        <div class="card-text mt-2"><small>${post.updatedAt.toString().substr(0, 15)}</small></div>
        <p class="card-text" style="margin-top:12px">${ post.content }</p>
        <div class="card-text mt-2"><small>11:30 PM</small></div>
        
        <hr>

       
            <!-- like button on post -->
           
            <!-- comment button on post -->

            <a data-toggle="collapse" href="#collapse_${post._id}" role="button" aria-expanded="false"
            aria-controls="collapse${post._id}"><i class="far fa-comment"></i></a>&nbsp&nbsp&nbsp
            <!-- send button on post -->
            <a href=""><i class="fas fa-paper-plane"></i></a>
        </div>
    </div>

    <div class="collapse post-comments mr-2 ml-2" id="collapse_${post._id}">
        
        <form action="/comments/create" method="POST" class="new-comment-form" style="margin-top: 10px;">
            <input type="text" class="form-control" placeholder="Add a new Comment..." aria-label="Username"
                aria-describedby="basic-addon1" name="content" required>
            <input type="hidden" name="post" value="${post._id}">
            <button type="submit" data-toggle="tooltip" data-placement="top" title="comment" class="btn btn-danger btn-sm mt-2 mb-2 mr-2">Add Comment</button>
        </form>
        <!-- comments list container -->
        <hr style=" background-color: grey;height: 1px;border: none;">
        <div class="post-comments-lister-list pl-4 pr-4">
            <div id="post-comments-${post._id}">
                
            </div>
        </div>
       
    </div>
</div>
`);
    }



    // method to delete a post from dom

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post_${data.post._id}`).remove();
                    noty_flash("success", "Post deleted Successfully");

                }, error: function(error){
                    console.log(error.responseText);
                    noty_flash(
                      "error",
                      "There was some error in deleting the post"
                    );
                }
            });
        });
    }



     createPost();
 }