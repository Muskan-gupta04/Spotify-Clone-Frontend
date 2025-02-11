
document.addEventListener('DOMContentLoaded', function () {
    console.log('Let\'s write JavaScript');

    let currentSong = new Audio();
    let songs = [
        'Apocalyptic Echoes - Jimena Contreras.mp3',
        'In Dreams - Lish Grooves.mp3',
        'Night Shift - National Sweetheart.mp3',
        'So Sweet - Lish Grooves.mp3',
        'Some College - National Sweetheart.mp3',
        'The Rainy Road - Lish Grooves.mp3',
        'In Dreams - Lish Grooves.mp3',
        'Night Shift - National Sweetheart.mp3',
        'So Sweet - Lish Grooves.mp3',
        'Some College - National Sweetheart.mp3'
    ];

    function secondsToMinutesSeconds(seconds) {
        if (isNaN(seconds) || seconds < 0) {
            return "00:00";
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    let playButton = document.getElementById('play');


    let currentIndex = 0;

    const playMusic = (track, pause = false) => {
        const trackPath = `songs/${track}`;
        console.log(`Attempting to play: ${trackPath}`);
        currentSong.src = trackPath;
        if (!pause) {
            currentSong.play().catch(error => {
                console.error('Failed to play audio:', error);
            });
            playButton.src = "pause.svg";
        }
        document.querySelector(".songinfo").innerHTML = track;
        document.querySelector(".songtime").innerHTML = "00:00/00:00";
    };

    const displaySongs = () => {
        let songUL = document.querySelector(".songList ul");
        songUL.innerHTML = "";
        playMusic(songs[0], true);
        for (const song of songs) {
            const songItem = `
                <li>
                    <img class="invert" src="music.svg" alt="Music Icon">
                    <div class="info">
                        <div>${song.replaceAll("%20", " ")}</div>
                        <div>Artist Name</div>
                    </div>
                    <div class="playnow">
                        <span>Play Now</span>
                        <img class="invert" src="play.svg" alt="Play Icon">
                    </div>
                </li>`;
            songUL.innerHTML += songItem;
        }

        Array.from(document.querySelectorAll(".songList li")).forEach((li, index) => {
            li.addEventListener("click", () => {
                playMusic(songs[index]);
            });
        });
    };

    displaySongs();

    // Play/Pause button
    playButton.addEventListener('click', () => {
        if (currentSong.paused) {
            currentSong.play();
            playButton.src = "pause.svg";
        } else {
            currentSong.pause();
            playButton.src = "play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        const seekbarRect = seekbar.getBoundingClientRect();
        const clickPosition = (e.clientX - seekbarRect.left) / seekbarRect.width;
        const newTime = clickPosition * currentSong.duration;
        currentSong.currentTime = newTime;
        document.querySelector(".circle").style.left = clickPosition * 100 + "%";
    });

    document.querySelector(".hamberger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    })

    document.getElementById("previous").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        playMusic(songs[currentIndex]);
    });

    document.getElementById("next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % songs.length;
        playMusic(songs[currentIndex]);
    });
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100")
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })
});


