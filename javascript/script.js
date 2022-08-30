console.log("Welcome to Spotify developer group");

//Intializing each and every elements.
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar =document.getElementById('progressBar');
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let currentSong = document.getElementById('currentSong');
let index = 1;
let firstPlay = true;
let firstSong = document.getElementById('1');
let songs = [
    {songName: "Raabta", filePath:"songs/1.mp3", coverPath:"covers/1.jpg" , duration:"04:57"},
    {songName: "Azaadi Ke Liye", filePath:"songs/2.mp3", coverPath:"covers/2.jpg" , duration:"03:46"},
    {songName: "Saware", filePath:"songs/3.mp3", coverPath:"covers/3.jpg" , duration:"05:21"},
    {songName: "Ilahi", filePath:"songs/4.mp3", coverPath:"covers/4.jpg" , duration:"03:51"},
    {songName: "Keshariya", filePath:"songs/5.mp3", coverPath:"covers/5.jpg" , duration:"04:28"},
    {songName: "Samjhawan", filePath:"songs/6.mp3", coverPath:"covers/6.jpg" , duration:"04:29"},
    {songName: "Tujhe kitna chahne", filePath:"songs/7.mp3", coverPath:"covers/7.jpg" , duration:"04:44"},
    {songName: "Duaa", filePath:"songs/8.mp3", coverPath:"covers/8.jpg" , duration:"04:20"},
    {songName: "Desh Mere", filePath:"songs/9.mp3", coverPath:"covers/9.jpg" , duration:"03:08"},
]
songItems.forEach((element, i)=>
{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songName;
    element.getElementsByClassName('duration')[0].innerHTML = songs[i].duration;
});
currentSong.innerHTML = songs[0].songName;

// audioElement.addEventListener('timeupdate', timeEvent);
//Event listeners is controlled here
let timers = setInterval(timeEvent,500);
myProgressBar.addEventListener('change',()=>{
    clearInterval(timers);
    milliseconds = myProgressBar.value * audioElement.duration/1000;
    audioElement.currentTime = milliseconds;
    timers = setInterval(timeEvent,500);
});

masterPlay.addEventListener('click', isPlay);

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause-circle');
        songUpdate();
        audioElement.currentTime = 0;
        mainPlay();
        firstPlay = false;
    });
});

document.getElementById('next').addEventListener('click',()=>{
    if(!firstPlay)
    {
        if(index >= 9)
            index = 1;
        else
            index += 1;
        songUpdate();
        specificSong();
    }
});

document.getElementById('back').addEventListener('click',()=>{
    if(!firstPlay)
    {
        if(index<=1)
            index = 1;
        else
            index -= 1;
        songUpdate();
        specificSong();
    }
});

//All the functions is listed below which controls the song play.
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play');
        element.classList.remove('fa-pause-circle');
    });
}

function timeEvent() {
    progress = parseInt((audioElement.currentTime/audioElement.duration)*1000);
    myProgressBar.value = progress;
    if(progress==1000)
    {
        audioElement.currentTime = 0;
        mainPause();
        myProgressBar.value = 0;
        if(index>=1 && index<=8)
            index +=1;
        else
            index =1;
        songUpdate();
        specificSong();
    }   
}

function specificSong()
{
        audioElement.currentTime = 0;
        mainPlay();
        makeAllPlays();
        let currentStatus = document.getElementById(index);
        currentStatus.classList.remove('fa-play');
        currentStatus.classList.add('fa-pause-circle');
}

function mainPause()
{
    audioElement.pause();
    masterPlay.classList.add('fa-play');
    masterPlay.classList.remove('fa-pause-circle');
    gif.style.opacity = 0.0;
}

function mainPlay()
{
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1.0;
}

function songUpdate()
{
    audioElement.src = `songs/${index}.mp3`;
    currentSong.innerHTML = songs[index-1].songName;
}

function isPlay()
{
    if(firstPlay)
        {
            firstSong.classList.remove('fa-play');
            firstSong.classList.add('fa-circle-pause');
            firstPlay = false;
        }
    if(audioElement.paused || audioElement.currentTime<=0)
        mainPlay();
    else
        mainPause();
}