const video = document.querySelector('.flex'),
    speed = document.querySelector('.speed'),
    bar = document.querySelector('.speed-bar'),
    min = 0.4,
    max = 4;

    speed.addEventListener('mousemove', function(e){
         const  persent = e.offsetY / this.offsetHeight,
        height = Math.round(persent * 100) + '%', 
        playbackRate = persent * (max - min) + min;
        bar.style.height = height;
        bar.textContent = playbackRate.toFixed(2) + 'x';
        video.playbackRate = playbackRate;

    })