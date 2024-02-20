import subprocess
from colorama import init, Fore

# Inisialisasi colorama
init(autoreset=True)

def show_menu():
    print(Fore.BLUE + 'Silakan pilih alat:')
    print('1. Tempory')
    print('2. All-Tools')

def choose_tool():
    choice = input(Fore.BLUE + 'Masukkan nomor alat yang ingin Anda gunakan: ')
    if choice == '1':
        print('Anda memilih alat Tempory.')
        start_tempory()  # Panggil fungsi untuk memulai alat Tempory
    elif choice == '2':
        print('Anda memilih alat Spamsms.')
        start_spamsms()  # Panggil fungsi untuk memulai alat Spamsms
    else:
        print(Fore.RED + 'Pilihan tidak valid. Silakan pilih nomor alat yang sesuai.')
        choose_tool()  # Jika pilihan tidak valid, minta pengguna memilih lagi

def start_tempory():
    subprocess.run(['node', 'index.js'])  # Menjalankan perintah 'node index.js' menggunakan subprocess

def start_spamsms():
    subprocess.run(['python', 'tool.py'])  # Misalkan alat Spamsms ditulis dalam Python

# Tampilkan menu dan pilih alat
show_menu()
choose_tool()
