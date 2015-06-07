$(document).on("click", ".open-editteam", function() {
	var teamnum = $(this).data('id');
    $(".modal-body #teamnumber").val(teamnum);
});