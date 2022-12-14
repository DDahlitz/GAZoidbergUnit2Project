$(() => {
           const displayAll = () => {
                $('.card').show()
                $('.readtrue').css({"text-decoration": "none"})
                $('.readtrue').children('a').css({"opacity": "1"})
            }
        
            const displayOwned = () => {
                $('.ownedfalse').hide()
                $('.ownedtrue').show()
                $('.readtrue').css({"text-decoration": "none"})
                $('.readtrue').children('a').css({"opacity": "1"})
            }
        
            const displayUnowned = () => {
                $('.ownedfalse').show()
                $('.ownedtrue').hide()
                $('.readtrue').css({"text-decoration": "none"})
                $('.readtrue').children('a').css({"opacity": "1"})
            }
        
            const displayReadStatus = () => {
                $('.readtrue').css({"text-decoration": "line-through"})
                $('.readtrue').children('a').css({"opacity": "0.1"})
            }

                $('#show-all').on('click', displayAll);
                $('#show-owned').on('click', displayOwned);
                $('#show-unowned').on('click', displayUnowned);
                $('#read-or-unread').on('click', displayReadStatus);
})