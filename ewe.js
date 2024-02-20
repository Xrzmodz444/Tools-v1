const { exec } = require('child_process');

const musicFiles = [
  '5min/musik/kanjud.mp3',
  '5min/musik/ror.mp3',
  '5min/musik/tiriz.mp3',
  '5min/musik/suu.mp3'
];

const playMusicSequentially = (index) => {
  if (index >= musicFiles.length) {
    // Stop jika sudah mencapai akhir daftar file musik
    return;
  }

  const file = musicFiles[index];
  const player = exec(`mpv '${file}'`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Terjadi kesalahan: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`Output: ${stdout}`);
  });

  player.on('exit', () => {
    // Panggil pemutaran musik berikutnya setelah delay 1 detik
    setTimeout(() => {
      playMusicSequentially(index + 1);
    }, 1000);
  });
};

// Mulai dengan indeks 0 (file musik pertama)
playMusicSequentially(0);
