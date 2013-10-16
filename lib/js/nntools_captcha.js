
function startCaptcha(element){
	showCaptcha(element);
}

function stopCaptcha(element){
	Recaptcha.destroy();
}

function verifyCaptcha() {
	checkCaptcha();
}

function showCaptcha(element) {
	var publickeyCaptcha = '6Lfnv-cSAAAAAIOAAsBXdJ2KbYN_HSwtFT4AK_-x';
	Recaptcha.create(
		publickeyCaptcha,
		element,
		{
			theme: "clean",
			callback: Recaptcha.focus_response_field
		}
	);
}

function checkCaptcha(){
	var captchaResp = Recaptcha.get_response();
	var captchaChal = Recaptcha.get_challenge();
	var captchaData = {resp: captchaResp, chal: captchaChal};
	var captchaSuccess = function(data){
		if (data == 'true') {
      document.getElementById("fullButton").hidden = false;
		} else {
			Recaptcha.reload();
		}
	};
  captchaReq  = $.post(
  	"../../../cgi-bin/pl/captcha.pl",
		captchaData,
		captchaSuccess
	);
}

