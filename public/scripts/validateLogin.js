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
    if (password.length < 1) {
        pwdSpan.removeClass()
        pwdSpan.addClass('error');
        pwdSpan.text("Enter password");
        return(false);
    }
    return true;
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


$(document).ready(function(){
          clearAllMessages();
          $("form").submit(function(e){
              var u=checkUname();
              var p=checkpwd();
              if(u && p) return true;
              else return false;
          });
              
              
          
	
})