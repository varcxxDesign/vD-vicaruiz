// Custom Script
$(document).ready(function(){
  
  jQuery("#email-form-alex").submit(function(e) {
    e.preventDefault(); 

    var response = grecaptcha.getResponse();
    // console.log(response);
    if(response.length == 0) {
        // recapptcha verification fail

        $('.w-form-verify').css("display", "block");
        setTimeout(function(){
          $('.w-form-verify').fadeOut('slow');
        }, 2000);

        return false;
    }else {
      // recaptcha verification successful

          jQuery(function($) {
            
            $.ajax({
              method: "POST",
              url: "phpMailer.php",
              dataType: 'script',
              cache: true,
              data: { 
                recaptcha: response,
                name: document.getElementById("name").value, 
                email: document.getElementById("email").value,
                message: document.getElementById("Message").value
              },
              success: function(reply){

                if (reply == 1) {

                  grecaptcha.reset();

                  $('.w-form-done').css("display", "block");

                  document.getElementById("name").value = "";
                  document.getElementById("email").value = "";
                  document.getElementById("Message").value = "";

                  setTimeout(function(){
                    $('.w-form-done').fadeOut('slow');
                  }, 2000);

                }else {

                  console.log(reply);

                }

                

              }
            });
              
          });


    }// end else

  });

})