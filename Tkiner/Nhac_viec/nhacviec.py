import tkinter as tk
from tkinter import ttk, messagebox, simpledialog
from tkcalendar import Calendar
from datetime import datetime, timedelta

class NoteApp:
    def __init__(self, master):
        self.master = master
        self.master.title("Ứng Dụng Ghi Chú và Nhắc Nhở")

        self.note_label = tk.Label(master, text="Nhập Ghi Chú:")
        self.note_label.pack()

        self.note_entry = tk.Entry(master, width=50)
        self.note_entry.pack()

        self.date_label = tk.Label(master, text="Chọn Ngày Nhắc Nhở:")
        self.date_label.pack()

        self.cal = Calendar(master, selectmode="day", year=datetime.now().year, month=datetime.now().month, day=datetime.now().day)
        self.cal.pack(padx=10, pady=10)

        self.time_label = tk.Label(master, text="Chọn Giờ Nhắc Nhở:")
        self.time_label.pack()

        # Sử dụng TimePicker nếu có sẵn
        try:
            self.time_picker = ttk.TimePicker(master, width=10)
            self.time_picker.pack()
        except AttributeError:
            self.time_entry = tk.Entry(master)
            self.time_entry.pack()

        self.set_reminder_button = tk.Button(master, text="Đặt Nhắc Nhở", command=self.set_reminder)
        self.set_reminder_button.pack()

        self.show_reminders_button = tk.Button(master, text="Hiển Thị Nhắc Nhở", command=self.show_reminders)
        self.show_reminders_button.pack()

        # Danh sách để lưu công việc và thời gian nhắc nhở
        self.reminders_list = []

        # Gắn sự kiện cho việc chuột trái chọn ngày
        self.cal.bind("<ButtonRelease-1>", self.show_selected_date_reminder)

    def set_reminder(self):
        note_text = self.note_entry.get()
        selected_date_str = self.cal.get_date()

        if not selected_date_str:
            messagebox.showerror("Lỗi", "Vui lòng chọn ít nhất một ngày nhắc nhở.")
            return

        selected_date = datetime.strptime(selected_date_str, "%m/%d/%y").date()

        # Lấy giờ từ TimePicker nếu có sẵn, ngược lại sử dụng Entry
        try:
            selected_time = self.time_picker.get()
        except AttributeError:
            selected_time = self.time_entry.get()

        # Nếu không có giờ được chọn, thoát khỏi phương thức
        if not selected_time:
            selected_time = "00:00"

        remind_datetime = datetime.combine(selected_date, datetime.strptime(selected_time, "%H:%M").time())

        now = datetime.now()

        if remind_datetime < now:
            messagebox.showerror("Lỗi", "Ngày và giờ nhắc nhở phải là tương lai.")
            return

        time_difference = remind_datetime - now
        seconds_until_remind = int(time_difference.total_seconds())

        self.master.after(seconds_until_remind * 1000, lambda text=note_text: self.show_reminder(text, remind_datetime))

        # Lưu thông tin công việc và thời gian nhắc nhở vào danh sách
        self.reminders_list.append((note_text, remind_datetime))

        messagebox.showinfo("Thông báo", "Nhắc nhở đã được đặt thành công.")

    def show_reminder(self, note_text, remind_datetime):
        messagebox.showinfo("Nhắc Nhở", f"{note_text}\nĐã đến hạn nhắc nhở vào {remind_datetime}!")

    def show_reminders(self):
        if not self.reminders_list:
            messagebox.showinfo("Danh Sách Nhắc Nhở", "Không có nhắc nhở nào được đặt.")
            return

        reminders_window = tk.Toplevel(self.master)
        reminders_window.title("Danh Sách Nhắc Nhở")

        reminders_listbox = tk.Listbox(reminders_window, width=50, height=10)
        reminders_listbox.pack(padx=10, pady=10)

        for note, remind_time in self.reminders_list:
            reminders_listbox.insert(tk.END, f"{note} - {remind_time}")

        close_button = tk.Button(reminders_window, text="Đóng", command=reminders_window.destroy)
        close_button.pack()

    def show_selected_date_reminder(self, event):
        selected_date_str = self.cal.get_date()

        if selected_date_str:
            selected_date = datetime.strptime(selected_date_str, "%m/%d/%y").date()
            selected_date_reminders = [f"{note} - {remind_time}" for note, remind_time in self.reminders_list if remind_time.date() == selected_date]

            if selected_date_reminders:
                selected_date_reminders_text = "\n".join(selected_date_reminders)
                reminder_window = tk.Toplevel(self.master)
                reminder_window.title(f"Nội dung nhắc nhở cho ngày {selected_date_str}")
                reminder_label = tk.Label(reminder_window, text=selected_date_reminders_text, padx=10, pady=10)
                reminder_label.pack()
            else:
                messagebox.showinfo("Nhắc Nhở Ngày Được Chọn", "Không có nhắc nhở nào được đặt cho ngày này.")

if __name__ == "__main__":
    root = tk.Tk()
    app = NoteApp(root)
    root.mainloop()
