//Safari adaptability
if (navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/)) {
    alert('this is safari brower and only safari brower');
    document.querySelector('.main__header__image').classList.add('safari');
}