$(document).on("click", ".open", function() {
	var hash_id = $(this).data('hash');
	$(".modal-body #hash_id").val(hash_id);
	var teamnum = $(this).data('number');
    $(".modal-body #teamnumber").val(teamnum);
	var teamcap = $(this).data('captain');
    $(".modal-body #teamcaptain").val(teamcap);
	var teamsco = $(this).data('score');
    $(".modal-body #teamscore").val(teamsco);
});