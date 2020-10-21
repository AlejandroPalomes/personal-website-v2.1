const header = document.querySelector('#header');
window.onresize = function() {
    console.log('test')
    header.height = window.innerHeight;
}
window.onresize();