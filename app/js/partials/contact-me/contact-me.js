$(document).ready(function() {
	if (!Modernizr.input.placeholder) {
		$('input, textarea').placeholder();
	};

	// bPopup =======================================
	var bPopupOk; 

	
	$(".popup-close-button.popupOk").on("click", function (event) {
		bPopupOk.close();
	});
	// End of bPopup =======================================



	// Tooltipster ===========================================================
	var tooltipsterContactName = $("#contactName").tooltipster({
		position: "left",
		multiple: true,
		trigger: "custom",
		theme: "tooltipster-red",
		content: "введите имя"
	});

	var tooltipsterContactEmail = $("#contactEmail").tooltipster({
		position: "right",
		multiple: true,
		trigger: "custom",
		theme: "tooltipster-red",
		content: "введите email"
	});

	var tooltipsterInputMessage = $("#inputMessage").tooltipster({
		position: "left",
		multiple: true,
		trigger: "custom",
		theme: "tooltipster-red",
		content: "ваш вопрос"
	});

	var tooltipsterCapchaInput = $("#capchaInput").tooltipster({
		position: "right",
		multiple: true,
		trigger: "custom",
		theme: "tooltipster-red",
		content: "код капчи"
	});

	$(".button-send").on('click', function(event) {
		event.preventDefault();
		
		// Validate input fields ===============================================
		var myNewProjectValidation = true;

		if ($("#contactName").val() == "") {
			myNewProjectValidation = false;
			tooltipsterContactName[0].show();
			$("#contactName").css({
				border:"2px solid #e0ad9a",
			});
		} else {
			tooltipsterContactName[0].hide();
		}

		if ($("#contactEmail").val() == "") {
			myNewProjectValidation = false;
			tooltipsterContactEmail[0].show();
			$("#contactEmail").css({
				border:"2px solid #e0ad9a",
			});
		} else {
			tooltipsterContactEmail[0].hide();
		}

		if ($("#inputMessage").val() == "") {
			myNewProjectValidation = false;
			tooltipsterInputMessage[0].show();
			$("#inputMessage").css({
				border:"2px solid #e0ad9a",
			});
		} else {
			tooltipsterInputMessage[0].hide();
		}

		if ($("#capchaInput").val() == "") {
			myNewProjectValidation = false;
			tooltipsterCapchaInput[0].show();
			$("#capchaInput").css({
				border:"2px solid #e0ad9a",
			});
		} else {
			tooltipsterCapchaInput[0].hide();
		}

		if (myNewProjectValidation) {
			
			bPopupOk = $(".popup-ok").bPopup({
				onClose: function () {
					$("#contactName").val('');
					$("#contactEmail").val('');
					$("#inputMessage").val('');
					$("#capchaInput").val('');
					bPopup.close();
				}
			});
		}

		
		// End of Validate input fields ===============================================
	});

	$("#contactName").on('focus', function(event) {
		tooltipsterContactName[0].hide();
		$("#contactName").css({
			border:"1px solid #d6d5d3",
		});
	});
	$("#contactName").on('blur', function(event) {
		if ($(this).val() == "") {
			tooltipsterContactName[0].show();
			$("#contactName").css({
				border:"2px solid #e0ad9a",
			});
		};
	});
	$("#contactEmail").on('focus', function(event) {
		tooltipsterContactEmail[0].hide();
		$("#contactEmail").css({
			border:"1px solid #d6d5d3",
		});
	});
	$("#contactEmail").on('blur', function(event) {
		if ($(this).val() == "") {
			tooltipsterContactEmail[0].show();
			$("#contactEmail").css({
				border:"2px solid #e0ad9a",
			});
		};
	});
	$("#inputMessage").on('focus', function(event) {
		tooltipsterInputMessage[0].hide();
		$("#inputMessage").css({
			border:"1px solid #d6d5d3",
		});
	});
	$("#inputMessage").on('blur', function(event) {
		if ($(this).val() == "") {
			tooltipsterInputMessage[0].show();
			$("#inputMessage").css({
				border:"2px solid #e0ad9a",
			});
		};
	});
	$("#capchaInput").on('focus', function(event) {
		tooltipsterCapchaInput[0].hide();
		$("#capchaInput").css({
			border:"1px solid #d6d5d3",
		});
	});
	$("#capchaInput").on('blur', function(event) {
		if ($(this).val() == "") {
			tooltipsterCapchaInput[0].show();
			$("#capchaInput").css({
				border:"2px solid #e0ad9a",
			});
		};
	});

	$(".button-clear").on('click', function(event) {
		event.preventDefault();
		
		tooltipsterContactName[0].hide();
		$("#contactName").css({
			border:"2px solid #d6d5d3",
		});
		$("#contactName").val("");

		tooltipsterContactEmail[0].hide();
		$("#contactEmail").css({
			border:"2px solid #d6d5d3",
		});
		$("#contactEmail").val("");

		tooltipsterInputMessage[0].hide();
		$("#inputMessage").css({
			border:"2px solid #d6d5d3",
		});
		$("#inputMessage").val("");

		tooltipsterCapchaInput[0].hide();
		$("#capchaInput").css({
			border:"2px solid #d6d5d3",
		});
		$("#capchaInput").val("");
	});
});