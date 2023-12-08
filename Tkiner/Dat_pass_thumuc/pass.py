import os
import tkinter as tk
from tkinter import messagebox

def set_password():
    folder_path = entry_folder_path.get()
    password = entry_password.get()

    if not folder_path or not password:
        messagebox.showerror("Error", "Please enter both folder path and password.")
        return

    # Kiểm tra xem thư mục có tồn tại không
    if not os.path.exists(folder_path):
        messagebox.showerror("Error", f"The folder '{folder_path}' does not exist.")
        return

    # Lưu mật khẩu vào một tệp trong thư mục
    password_file_path = os.path.join(folder_path, "password.txt")
    with open(password_file_path, "w") as file:
        file.write(password)

    messagebox.showinfo("Success", f"Password set successfully for '{folder_path}'.")

def recover_password():
    folder_path = entry_folder_path.get()

    if not folder_path:
        messagebox.showerror("Error", "Please enter the folder path.")
        return

    # Kiểm tra xem thư mục có tồn tại không
    if not os.path.exists(folder_path):
        messagebox.showerror("Error", f"The folder '{folder_path}' does not exist.")
        return

    # Đọc mật khẩu từ tệp password.txt (nếu có)
    password_file_path = os.path.join(folder_path, "password.txt")
    if os.path.exists(password_file_path):
        with open(password_file_path, "r") as file:
            password = file.read()
            messagebox.showinfo("Password Recovery", f"The password for '{folder_path}' is: {password}")
    else:
        messagebox.showinfo("Password Recovery", f"No password set for '{folder_path}'.")

# Tạo cửa sổ chính
root = tk.Tk()
root.title("Folder Password Manager")

# Thêm các thành phần giao diện
label_folder_path = tk.Label(root, text="Folder Path:")
label_folder_path.pack()

entry_folder_path = tk.Entry(root)
entry_folder_path.pack()

label_password = tk.Label(root, text="Password:")
label_password.pack()

entry_password = tk.Entry(root, show="*")  # Hiển thị dấu '*' thay vì mật khẩu thực sự
entry_password.pack()

button_set_password = tk.Button(root, text="Set Password", command=set_password)
button_set_password.pack()

button_recover_password = tk.Button(root, text="Recover Password", command=recover_password)
button_recover_password.pack()

# Chạy vòng lặp chính
root.mainloop()
