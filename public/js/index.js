
/*============================Variables==============================*/

$all = $('#show-all')
$owned = $('#show-owned')
$unowned = $('#show-unowned')
$readOrUnread = $('#read-or-unread')


/*=========================== Functions ===============================*/
const displayAll = () => {
    $('.card').show()
}

const displayOwned = () => {
    $('.ownedfalse').hide()
    $('.ownedtrue').show()
}

const displayUnowned = () => {
    $('.ownedfalse').show()
    $('.ownedtrue').hide()
}

const displayReadStatus = () => {
}

// owned-true owned-false
// read-true read false


/*=============================Function Calls=============================*/

    $('#show-all').on('click', displayAll);
    $('#show-owned').on('click', displayOwned);
    $('#show-unowned').on('click', displayUnowned);
    $('#read-or-unread').on('click', displayReadStatus);