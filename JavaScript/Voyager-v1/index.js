var soundTrackDurations = [265, 25, 58, 4, 52, 31, 22, 31];
var isSoundPlaying = false;

function handleClick() {

    if (isSoundPlaying) {
        return;
    }
    isSoundPlaying = true;

    var idx = this.getAttribute("idx");
    var soundTrackDuration = soundTrackDurations[idx];

    var sound = this.getAttribute("alt");
    var soundTrackURL = "sounds/" + sound + ".mp3";
    var soundTrack = new Audio(soundTrackURL);
    soundTrack.play();

    const ele1 = document.querySelectorAll(".audio-np-con")[idx];
    ele1.classList.toggle("audio-p-con");
    ele1.classList.toggle("audio-np-con");

    const img1 = document.querySelectorAll(".audio-img-np")[idx];
    img1.classList.toggle("audio-img-p");
    img1.classList.toggle("audio-img-np");

    document.querySelector(".audio-img-p").style.animationDuration = soundTrackDuration + "s";

    soundTrack.addEventListener("ended", function () {
        const ele2 = document.querySelector(".audio-p-con");
        if (ele2) {
            ele2.classList.toggle("audio-np-con");
            ele2.classList.toggle("audio-p-con");
        }
        const img2 = document.querySelector(".audio-img-p");
        if (img2) {
            img2.classList.toggle("audio-img-np");
            img2.classList.toggle("audio-img-p");
        }
        isSoundPlaying = false;
    });
}

var audioImgLen = document.querySelectorAll(".audio-np-con").length;
for (var i = 0; i < audioImgLen; i++) {
    document.querySelectorAll(".audio-np-con")[i].addEventListener("click", handleClick);
}
