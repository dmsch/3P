$(document).ready(function() {
	// console.log('main.js loaded');
	if (!Modernizr.input.placeholder) {
		$('input, textarea').placeholder();
	};

	// bPopup =======================================
	var bPopup, bPopupOk;

	$(".add-new-project-link").on("click", function (event) {
		event.preventDefault();

		bPopup = $(".add-project-popup").bPopup({
			onClose: function () {
				tooltipsterProjectName[0].hide();
				$("#projectName").css({
					border:"1px solid #d6d5d3",
				});
				tooltipsterFileName[0].hide();
				$(".fileform").css({
					border:"2px solid #d6d5d3",
				});
				tooltipsterProjectURL[0].hide();
				$("#projectURL").css({
					border:"1px solid #d6d5d3",
				});
				tooltipsterProjectDesc[0].hide();
				$("#projectDescMessage").css({
					border:"1px solid #d6d5d3",
				});
			}
		});

		$("#projectName").val("");
		$("#fileformlabel").val("");
		$("#projectURL").val("");
		$("#projectDescMessage").val("");
	});

	$(".popup-close-button").on("click", function (event) {
		bPopup.close();
	});

	$(".button-send").on("click", function (event) {
		event.preventDefault();

		// Validate input fields ===============================================
		var myNewProjectValidation = true;

		if ($("#projectName").val() == "") {
			myNewProjectValidation = false;
			tooltipsterProjectName[0].show();
			$("#projectName").css({
				border:"2px solid #e0ad9a",
			});
		} else {
			tooltipsterProjectName[0].hide();
		}

		if ($("#fileformlabel").val() == "") {
			myNewProjectValidation = false;
			tooltipsterFileName[0].show();
			$(".fileform").css({
				border:"2px solid #e0ad9a",
			});
		} else {
			tooltipsterFileName[0].hide();
		}

		if ($("#projectURL").val() == "") {
			myNewProjectValidation = false;
			tooltipsterProjectURL[0].show();
			$("#projectURL").css({
				border:"2px solid #e0ad9a",
			});
		} else {
			tooltipsterProjectURL[0].hide();
		}

		if ($("#projectDescMessage").val() == "") {
			myNewProjectValidation = false;
			tooltipsterProjectDesc[0].show();
			$("#projectDescMessage").css({
				border:"2px solid #e0ad9a",
			});
		} else {
			tooltipsterProjectDesc[0].hide();
		}
		// End of Validate input fields ===============================================

		if (myNewProjectValidation) {
			bPopupOk = $(".popup-ok").bPopup({
				onClose: function () {bPopup.close();}
			});
		}
		
	});

	$(".popup-close-button.popupOk").on("click", function (event) {
		bPopupOk.close();
		bPopup.close();
	});
	// End of bPopup =======================================

	// File upload ====================================
	$("#upload").on("change", function () {
		var myStr = $("#upload").val();

		if (myStr.lastIndexOf('\\')){
	        var i = myStr.lastIndexOf('\\')+1;
	    }
	    else{
	        var i = myStr.lastIndexOf('/')+1;
	    };						

		$("#fileformlabel").val(myStr.slice(i));

		if ($("#fileformlabel").val() != "") {
			tooltipsterFileName[0].hide();
			$(".fileform").css({
				border:"2px solid #d6d5d3",
			});
		}; 
	});
	// End of File upload ====================================

	// Tooltipster ===========================================================
	var tooltipsterProjectName = $("#projectName").tooltipster({
		position: "left",
		multiple: true,
		trigger: "custom",
		theme: "tooltipster-red",
		content: "введите название"
	});

	var tooltipsterFileName = $("#upload").tooltipster({
		position: "left",
		multiple: true,
		trigger: "custom",
		theme: "tooltipster-red",
		content: "изображение"
	});

	var tooltipsterProjectURL = $("#projectURL").tooltipster({
		position: "left",
		multiple: true,
		trigger: "custom",
		theme: "tooltipster-red",
		content: "ссылка на проект"
	});

	var tooltipsterProjectDesc = $("#projectDescMessage").tooltipster({
		position: "left",
		multiple: true,
		trigger: "custom",
		theme: "tooltipster-red",
		content: "описание проекта"
	});

	$("#projectName").on('focus', function(event) {
		tooltipsterProjectName[0].hide();
		$("#projectName").css({
			border:"1px solid #d6d5d3",
		});
	});
	$("#projectName").on('blur', function(event) {
		if ($(this).val() == "") {
			tooltipsterProjectName[0].show();
			$("#projectName").css({
				border:"2px solid #e0ad9a",
			});
		};
	});

/*	$("#fileformlabel").on('change', function(event) {
		tooltipsterFileName[0].hide();
	});
	$("#fileformlabel").on('blur', function(event) {
		if ($(this).val() == "") tooltipsterFileName[0].show();
	});*/

	$("#projectURL").on('focus', function(event) {
		tooltipsterProjectURL[0].hide();
		$("#projectURL").css({
			border:"1px solid #d6d5d3",
		});
	});
	$("#projectURL").on('blur', function(event) {
		if ($(this).val() == "") {
			tooltipsterProjectURL[0].show();
			$("#projectURL").css({
				border:"2px solid #e0ad9a",
			});
		};
	});

	$("#projectDescMessage").on('focus', function(event) {
		tooltipsterProjectDesc[0].hide();
		$("#projectDescMessage").css({
			border:"1px solid #d6d5d3",
		});
	});
	$("#projectDescMessage").on('blur', function(event) {
		if ($(this).val() == "") {
			tooltipsterProjectDesc[0].show();
			$("#projectDescMessage").css({
				border:"2px solid #e0ad9a",
			});
		};
	});


	// End of Tooltipster ===========================================================

	

});