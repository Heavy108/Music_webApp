console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

const defaultSongs = [
    { songName: "Muskurane_Ft._Arijit_Singh", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Meri Maa Mumma Dasvidaniya(jatt.cc)", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "03 - Most Wanted Munda(wapking.fm)", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Muskane_jhuti hai_Ft._Arijit_Singh", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "O Khuda - Hero (Love Mix) - DJ Sevix n DJ Dip(wapking.fm)e", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "O Ri Chiraiya (Satyamev Jayate)(MyMp3Song.Com)", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg" },
];

let songs = [...defaultSongs, ...JSON.parse(localStorage.getItem('songs')) || []];

const renderSongs = () => {
    const songItemContainer = document.querySelector('.songItemContainer');
    songItemContainer.innerHTML = '';

    songs.forEach((song, i) => {
        const songItem = document.createElement('div');
        songItem.classList.add('songItem');
        
        const img = document.createElement('img');
        img.src = song.coverPath || song.thumbnail;

        const songName = document.createElement('span');
        songName.classList.add('songName');
        songName.innerText = song.songName;

        const songListPlay = document.createElement('span');
        songListPlay.classList.add('songlistplay');
        
        const timeStamp = document.createElement('span');
        timeStamp.classList.add('timestamp');
        
        const playIcon = document.createElement('i');
        playIcon.id = i;
        playIcon.classList.add('far', 'songItemPlay', 'fa-solid', 'fa-play-circle');
        
        timeStamp.appendChild(playIcon);
        songListPlay.appendChild(timeStamp);
        
        songItem.appendChild(img);
        songItem.appendChild(songName);
        songItem.appendChild(songListPlay);
        
        songItemContainer.appendChild(songItem);
    });

    // Reinitialize play buttons event listeners
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songIndex].filePath || songs[songIndex].songFile;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        });
    });
};

renderSongs();

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath || songs[songIndex].songFile;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath || songs[songIndex].songFile;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
