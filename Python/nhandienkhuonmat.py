import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import cv2
import os

# Khởi tạo bộ phân loại Cascade cho việc nhận diện khuôn mặt
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Hàm nhận diện khuôn mặt trong ảnh
def detect_faces(image):
    # Chuyển ảnh sang ảnh xám (gray)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Phát hiện các khuôn mặt trong ảnh
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    
    return faces

# Hàm xử lý khi người dùng nhấn nút "Chọn ảnh"
def select_image():
    global input_image_path
    input_image_path = filedialog.askopenfilename(filetypes=[("Image files", "*.png;*.jpg;*.jpeg;*.gif")])
    if input_image_path:
        lbl_status.config(text="Ảnh đã chọn: " + os.path.basename(input_image_path))

# Hàm nhận diện khuôn mặt trong ảnh đã chọn và hiển thị kết quả
def detect_and_display_faces():
    global input_image_path
    if input_image_path:
        input_image = cv2.imread(input_image_path)
        faces = detect_faces(input_image)
        
        if len(faces) > 0:
            # Lấy khuôn mặt đầu tiên
            (x, y, w, h) = faces[0]
            
            # Vẽ khung đỏ xung quanh khuôn mặt và hiển thị tên gương mặt
            cv2.rectangle(input_image, (x, y), (x+w, y+h), (0, 0, 255), 2)
            
            
            # So sánh khuôn mặt với các ảnh trong thư mục 'khohinhanh'
            detected_name = "Không xác định"
            for filename_khohinhanh in os.listdir('khohinhanh'):
                if filename_khohinhanh.endswith(('.png', '.jpg', '.jpeg', '.gif')):
                    compare_image_path = os.path.join('khohinhanh', filename_khohinhanh)
                    compare_image = cv2.imread(compare_image_path)
                    _, compare_faces = detect_faces(compare_image)
                    
                    # Nếu có khuôn mặt được nhận diện trong ảnh so sánh, lấy tên của ảnh
                    if len(compare_faces) > 0:
                        detected_name = os.path.splitext(filename_khohinhanh)[0]
                        break
            
            # Hiển thị hình ảnh gốc với khuôn mặt được nhận diện và tên
            show_image_with_faces(input_image, os.path.basename(input_image_path), detected_name)
            
        else:
            lbl_status.config(text="Không tìm thấy khuôn mặt trong ảnh")
    else:
        lbl_status.config(text="Vui lòng chọn ảnh trước khi nhận diện khuôn mặt")

# Hàm hiển thị hình ảnh gốc với khuôn mặt được nhận diện và tên
def show_image_with_faces(image, file_name, detected_name):
    # Hiển thị tên tệp trên khung màu đỏ
    cv2.putText(image, detected_name, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
    
    # Hiển thị hình ảnh
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image_pil = Image.fromarray(image)
    image_tk = ImageTk.PhotoImage(image_pil)
    
    # Tạo cửa sổ mới để hiển thị hình ảnh
    image_window = tk.Toplevel(root)
    image_window.title("Hình ảnh khuôn mặt được nhận diện")
    
    lbl_image = tk.Label(image_window, image=image_tk)
    lbl_image.image = image_tk
    lbl_image.pack()

# Tạo cửa sổ Tkinter
root = tk.Tk()
root.title("Ứng dụng Nhận diện Khuôn mặt")

# Khởi tạo biến đường dẫn ảnh đầu vào
input_image_path = ""

# Tạo các widget
btn_select_image = tk.Button(root, text="Chọn ảnh", command=select_image)
btn_select_image.pack(pady=10)

btn_detect_faces = tk.Button(root, text="Nhận diện khuôn mặt", command=detect_and_display_faces)
btn_detect_faces.pack(pady=5)

lbl_status = tk.Label(root, text="")
lbl_status.pack(pady=5)

# Hiển thị cửa sổ
root.mainloop()
