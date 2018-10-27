$(document).ready( function() {
	$(`#btn-go`).click((event) => {
		$.ajax({
			url: `/tablename`,
			type: `GET`,
			success: (data) => {
				console.log(data)
				// UPDATE DOM
				$(`doohickey`).append(data)
			},
			error: function(jgXhr, textStatus, errorThrown) {
				console.log(`OOPS:`, errorThrown)
			}
		})
	})
})
