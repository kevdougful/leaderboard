$(document).on("click", ".open-editteam", function() {
	var teamnum = $(this).data('number');
    $(".modal-body #teamnumber").val(teamnum);
	var teamcap = $(this).data('captain');
    $(".modal-body #teamcaptain").val(teamcap);
	var teamsco = $(this).data('score');
    $(".modal-body #teamscore").val(teamsco);
});