//Safari adaptability
if (navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/)) {
    document.querySelector('.main__header__image').classList.add('safari');
}