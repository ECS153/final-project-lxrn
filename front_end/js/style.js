var x = window.matchMedia("(max-width: 991px)")
//changeFriendsSection(x) // Call listener function at run time
x.addListener(changeFriendsSection) // Attach listener function on state changes

function changeFriendsSection(x) {
    console.log("in changeFriendsSection")
    var friends_section = document.getElementsByClassName('friends_section')[0];
    // if width < 768px
    if (x.matches) 
    { // If media query matches
        if (friends_section.classList.contains('pull-right')) 
        {
            friends_section.classList.remove('pull-right');
        }
        friends_section.classList.add('pull-left');
    } 
    else 
    {
        if (friends_section.classList.contains('pull-left')) 
        {
            friends_section.classList.remove('pull-left');
        }
        friends_section.classList.add('pull-right');
    }
}
