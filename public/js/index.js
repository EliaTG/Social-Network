$(document).ready(function(){


    $(".delete-heroes").on('click',function(e){
      e.preventDefault();   
      if(confirm("Are you sure you want to delete this pokemon?")){
          $(this).closest("#form-delete").submit();
      }

    });

});
