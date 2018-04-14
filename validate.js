function isAlphaNumeric( str)
{
	var exp=/^([0-9]|[a-z])+([0-9a-z]+)$/i;
	if(!str.match(exp))
	{
		return false;
	}
	else
		return true;
}

function checkUname(){
    var retVal=true;
    var uname=$("#uname");
    var errMsg="";
    var unameSpan=$("#uname + span");
    if(!unameSpan.length){
        $("#uname").after("<span></span>");
        unameSpan=$("#uname + span");
        console.log("Reached here")
    }
    else
    {
         console.log("Reached here")
         unameSpan.text("")
    }
    unameSpan.hide();
    
    if(uname.val()==="")
    {
        errMsg+="Username must not be empty";
    }
    else if(!isAlphaNumeric(uname.val()))
    {
        errMsg+="Username must contain only letters and numbers"
    }
    else
    {
        
    }
    if(errMsg!="")
    {
        unameSpan.text(errMsg);
        unameSpan.addClass("error");
        unameSpan.show();
        retVal=false;
    }
    return retVal;
}

function checkpwd()
{
    var pwd=$("#pwd");
    var password=pwd.val();
    var msg="";
    var strength=0;
    var pwdSpan=$("#pwd + span");
    if(!pwdSpan.length){
        $("#pwd").after("<span></span>");
        pwdSpan=$("#pwd + span");
        console.log("Reached here")
    }
    else
    {
         pwdSpan.text("")
    }
    if (password.length < 6) {
        pwdSpan.removeClass()
        pwdSpan.addClass('error');
        pwdSpan.text("Too short");
        return(false);
    }
    if (password.length > 7) {
        strength += 1;
    }
   // If password contains both lower and uppercase characters, increase strength value.
   if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
   else{
       msg+="Password must contain both uppercase and lowercase letters."
       console.log(msg)
   }
   // If it has numbers and characters, increase strength value.
   if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
   else
   {
       msg+="Password must contain atleast a number."
       console.log(msg)
   }
   // If it has one special character, increase strength value.
   if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
   else
   {
       msg+="Password must contain atleast one special character."
       console.log(msg)
   }
   if(msg!="")
   {
       pwdSpan.text(msg);
       pwdSpan.addClass("error");
   }
   else{
       pwdSpan.removeClass();
   }
    if (strength == 4) {
        return true;
    
    }
    else{
        return false;
    }
}

function checkEmail() {
   var ename=$("#email");
   email=ename.val();
    var errMsg="";
    var enameSpan=$("#email + span");
    if(!enameSpan.length){
        $("#email").after("<span></span>");
        enameSpan=$("#email + span");
    }
    else
    {
         enameSpan.text("")
    }
    enameSpan.hide();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!regex.test(email)) 
    {
        errMsg+="Not a valid email address";
        enameSpan.text(errMsg);
        enameSpan.addClass("error");
        enameSpan.show();
        
    }
    return(regex.test(email))
}

function clearAllMessages(){
    $("#uname").focus(function(){
        var unameSpan=$("#uname + span");
        var uname=$("#uname");
        
        if(!unameSpan.length){
        }
       else
        {
            unameSpan.text("");
            unameSpan.removeClass();
            uname.val('');
         }
    })
    
    $("#pwd").focus(function(){
        var pwdSpan=$("#pwd + span");
        var pwd=$("#pwd");
        
        if(!pwdSpan.length){
        }
       else
        {
            pwdSpan.text("");
            pwdSpan.removeClass();
            pwd.val('');
         }
    })
    
    $("#email").focus(function(){
        var eSpan=$("#email + span");
        var em=$("#email")
        if(!eSpan.length){
        }
       else
        {
            eSpan.text("");
            eSpan.removeClass();
            e.val('');
         }
    })
}
function checkExistence(data)
{
    console.log(data);
    if(data.length>0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

$(document).ready(function(){
          clearAllMessages();
          $("form").submit(function(e){
              var u=checkUname();
              var p=checkpwd();
              var e=checkEmail();
              var isthere=true;
              var form= this;
              
              if(u && p && e){
                  $.ajax({
                      type:'POST',
                      url:'/grab',
                      data:{name:$("#uname").val(),email:$("#email").val()},
                      success:function(data){
                          console.log("Success" + typeof(data));
                          isthere=checkExistence(data);
                          if(isthere)
                          {
                             console.log("Already taken");
                             var eSpan=$("#pwd + span");
                             eSpan.text("This username or email already exists");
                             eSpan.addClass("error");
                          }
                         else
                         {
                             console.log("Can be added");
                             form.submit();
                          }
                          
                      },
                      error:function(){
                          console.log("Error" + data);
                      }
                  });
              }
              return false;
              
          })
          
	
})