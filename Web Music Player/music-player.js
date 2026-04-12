const playlist = [
  {
    title: 'SoundHelix Song 1',
    artist: 'SoundHelix',
    duration: '6:13',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0NjA3ODZ8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBsYXllcnxlbnwwfHx8fDE2MTg2NDI0MTU&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    title: 'SoundHelix Song 2',
    artist: 'SoundHelix',
    duration: '5:01',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    artwork: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0NjA3ODZ8MHwxfHNlYXJjaHw0fHxtdXNpYyUyMHBsYXllcnxlbnwwfHx8fDE2MTg2NDI0MjY&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    title: 'SoundHelix Song 3',
    artist: 'SoundHelix',
    duration: '5:31',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    artwork: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0NjA3ODZ8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMHBsYXllcnxlbnwwfHx8fDE2MTg2NDI0Mjg&ixlib=rb-4.0.3&q=80&w=400',
  },
];

const playlistElement = document.getElementById('playlist');
const audio = document.getElementById('audio');
const trackArtwork = document.getElementById('track-artwork');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackStatus = document.getElementById('track-status');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const progressFilled = document.getElementById('progress-filled');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const volumeRange = document.getElementById('volumeRange');

let currentTrackIndex = 0;
let isPlaying = false;
let shuffleMode = false;
let repeatMode = 'none';

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60) || 0;
  const secs = Math.floor(seconds % 60) || 0;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function renderPlaylist() {
  playlistElement.innerHTML = playlist
    .map((track, index) => {
      return `
        <li class="track-item ${index === currentTrackIndex ? 'active' : ''}" data-index="${index}">
          <div class="track-details">
            <span class="track-title">${track.title}</span>
            <span class="track-artist">${track.artist}</span>
          </div>
          <span class="track-duration">${track.duration}</span>
        </li>
      `;
    })
    .join('');
}

function updateModeButtons() {
  shuffleBtn.classList.toggle('active', shuffleMode);
  shuffleBtn.setAttribute('aria-pressed', String(shuffleMode));
  repeatBtn.classList.toggle('active', repeatMode !== 'none');
  repeatBtn.setAttribute('aria-pressed', String(repeatMode !== 'none'));
  repeatBtn.textContent = repeatMode === 'one' ? '🔂' : '🔁';
}

function setTrack(index, playAfter = false) {
  currentTrackIndex = (index + playlist.length) % playlist.length;
  const track = playlist[currentTrackIndex];
  audio.src = track.src;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  trackArtwork.src = track.artwork;
  trackArtwork.alt = `${track.title} artwork`;
  renderPlaylist();
  updateStatus();
  if (playAfter) {
    audio.play();
  }
}

function togglePlayPause() {
  if (!audio.src) {
    setTrack(currentTrackIndex);
  }
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function updatePlayButton() {
  playPauseBtn.textContent = audio.paused ? '►' : '⏸️';
}

function updateStatus() {
  trackStatus.textContent = audio.paused ? 'Paused' : 'Playing';
}

function updateProgress() {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFilled.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
}

function getNextIndex() {
  if (shuffleMode) {
    let nextIndex = currentTrackIndex;
    while (nextIndex === currentTrackIndex && playlist.length > 1) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    }
    return nextIndex;
  }
  return (currentTrackIndex + 1) % playlist.length;
}

function seek(event) {
  const rect = progressBar.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const percent = Math.max(0, Math.min(offsetX / rect.width, 1));
  audio.currentTime = percent * audio.duration;
}

function toggleShuffle() {
  shuffleMode = !shuffleMode;
  updateModeButtons();
}

function toggleRepeat() {
  if (repeatMode === 'none') {
    repeatMode = 'all';
  } else if (repeatMode === 'all') {
    repeatMode = 'one';
  } else {
    repeatMode = 'none';
  }
  updateModeButtons();
}

function playNextTrack() {
  setTrack(getNextIndex(), true);
}

function playPrevTrack() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  setTrack(currentTrackIndex - 1, true);
}

playlistElement.addEventListener('click', (event) => {
  const item = event.target.closest('.track-item');
  if (!item) return;
  const index = Number(item.dataset.index);
  setTrack(index, true);
});

playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNextTrack);
prevBtn.addEventListener('click', playPrevTrack);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);
volumeRange.addEventListener('input', (event) => {
  audio.volume = Number(event.target.value);
});
progressBar.addEventListener('click', seek);

audio.addEventListener('play', () => {
  isPlaying = true;
  updatePlayButton();
  updateStatus();
});
audio.addEventListener('pause', () => {
  isPlaying = false;
  updatePlayButton();
  updateStatus();
});
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', updateProgress);
audio.addEventListener('ended', () => {
  if (repeatMode === 'one') {
    audio.currentTime = 0;
    audio.play();
    return;
  }

  const nextIndex = getNextIndex();
  if (repeatMode === 'all' || nextIndex !== currentTrackIndex) {
    setTrack(nextIndex, true);
  } else {
    audio.pause();
  }
});

document.addEventListener('keydown', (event) => {
  const activeElement = document.activeElement;
  if (activeElement && ['INPUT', 'TEXTAREA', 'BUTTON'].includes(activeElement.tagName)) return;

  switch (event.key) {
    case ' ':
      event.preventDefault();
      togglePlayPause();
      break;
    case 'ArrowRight':
      playNextTrack();
      break;
    case 'ArrowLeft':
      playPrevTrack();
      break;
    case 'ArrowUp':
      event.preventDefault();
      audio.volume = Math.min(1, audio.volume + 0.05);
      volumeRange.value = audio.volume;
      break;
    case 'ArrowDown':
      event.preventDefault();
      audio.volume = Math.max(0, audio.volume - 0.05);
      volumeRange.value = audio.volume;
      break;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  volumeRange.value = audio.volume = 0.8;
  renderPlaylist();
  setTrack(currentTrackIndex);
  updateModeButtons();
});
