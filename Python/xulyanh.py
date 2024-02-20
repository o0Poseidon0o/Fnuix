import cv2
import os
import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image, ImageTk
import matplotlib.pyplot as plt

class ImageProcessor:
    def __init__(self, master):
        self.master = master
        self.master.title("Image Processor")

        self.image_frame = tk.Frame(self.master)
        self.image_frame.pack()

        self.image_label = tk.Label(self.image_frame)
        self.image_label.pack()

        self.info_frame = tk.Frame(self.master)
        self.info_frame.pack()

        self.info_label = tk.Label(self.info_frame, text="")
        self.info_label.pack()

        self.menu_bar = tk.Menu(self.master)
        self.master.config(menu=self.menu_bar)

        self.file_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.menu_bar.add_cascade(label="File", menu=self.file_menu)
        self.file_menu.add_command(label="Open Image", command=self.open_image)
        self.file_menu.add_separator()
        self.file_menu.add_command(label="Exit", command=self.exit_app)

        self.process_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.menu_bar.add_cascade(label="Process", menu=self.process_menu)
        self.process_menu.add_command(label="Increase Brightness", command=self.increase_brightness)
        self.process_menu.add_command(label="Decrease Brightness", command=self.decrease_brightness)
        self.process_menu.add_command(label="Segment Image", command=self.segment_image)
        self.process_menu.add_command(label="Show Contrast Histogram", command=self.show_contrast_histogram)

        self.image_opened = False

    def open_image(self):
        file_path = filedialog.askopenfilename(title="Open Image")
        if file_path:
            self.image_path = file_path
            self.image = cv2.imread(file_path)
            self.image_opened = True
            self.display_image()
            self.display_image_info()

    def display_image(self):
        if self.image_opened:
            image = cv2.cvtColor(self.image, cv2.COLOR_BGR2RGB)
            image = Image.fromarray(image)
            image = ImageTk.PhotoImage(image)
            self.image_label.config(image=image)
            self.image_label.image = image

    def display_image_info(self):
        if self.image_opened:
            height, width, channels = self.image.shape
            image_format = os.path.splitext(os.path.basename(self.image_path))[1]
            info_text = f"Image Info:\n\nSize: {width}x{height}\nChannels: {channels}\nFormat: {image_format}"
            self.info_label.config(text=info_text)

    def increase_brightness(self):
        """
        Tăng độ sáng của ảnh bằng cách thêm một hằng số vào tất cả các giá trị pixel.
        Thuật toán:
            - Tạo một hằng số để thêm vào tất cả các giá trị pixel.
            - Sử dụng hàm cv2.convertScaleAbs() để thực hiện việc tăng độ sáng.
        """
        if self.image_opened:
            brightness = 50
            brightened_image = cv2.convertScaleAbs(self.image, beta=brightness)
            self.image = brightened_image
            self.display_image()

            # Hiển thị thông tin thuật toán
            algorithm_info = "The Increase Brightness function increases the brightness of the image by adding a constant value to all pixel values."
            messagebox.showinfo("Algorithm Information", algorithm_info)

    def decrease_brightness(self):
        """
        Giảm độ sáng của ảnh bằng cách trừ một hằng số khỏi tất cả các giá trị pixel.
        Thuật toán:
            - Tạo một hằng số để trừ đi từ tất cả các giá trị pixel.
            - Sử dụng hàm cv2.convertScaleAbs() để thực hiện việc giảm độ sáng.
        """
        if self.image_opened:
            brightness = -50
            darkened_image = cv2.convertScaleAbs(self.image, beta=brightness)
            self.image = darkened_image
            self.display_image()

            # Hiển thị thông tin thuật toán
            algorithm_info = "The Decrease Brightness function decreases the brightness of the image by subtracting a constant value from all pixel values."
            messagebox.showinfo("Algorithm Information", algorithm_info)

    def segment_image(self):
        """
        Phân đoạn ảnh bằng phương pháp ngưỡng cố định.
        Thuật toán:
            - Chuyển ảnh sang ảnh xám.
            - Sử dụng phương pháp ngưỡng cố định để phân đoạn ảnh thành hai lớp (nền và vật thể).
        """
        if self.image_opened:
            gray_image = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
            _, segmented_image = cv2.threshold(gray_image, 127, 255, cv2.THRESH_BINARY)
            self.image = segmented_image
            self.display_image()

            # Hiển thị thông tin thuật toán
            algorithm_info = "The Segment Image function segments the image using a fixed thresholding method."
            messagebox.showinfo("Algorithm Information", algorithm_info)

    def show_contrast_histogram(self):
        if self.image_opened:
            gray_image = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
            
            # Equalization Histogram
            eq_hist = cv2.equalizeHist(gray_image)
            
            # CLAHE (Contrast Limited Adaptive Histogram Equalization)
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
            clahe_image = clahe.apply(gray_image)
            
            # Display histograms
            plt.figure(figsize=(10, 5))
            plt.subplot(1, 3, 1)
            plt.hist(gray_image.ravel(), bins=256, color='gray', alpha=0.7)
            plt.title('Original Histogram')
            plt.xlabel('Pixel Value')
            plt.ylabel('Frequency')

            plt.subplot(1, 3, 2)
            plt.hist(eq_hist.ravel(), bins=256, color='gray', alpha=0.7)
            plt.title('Equalized Histogram')
            plt.xlabel('Pixel Value')
            plt.ylabel('Frequency')

            plt.subplot(1, 3, 3)
            plt.hist(clahe_image.ravel(), bins=256, color='gray', alpha=0.7)
            plt.title('CLAHE Histogram')
            plt.xlabel('Pixel Value')
            plt.ylabel('Frequency')

            plt.tight_layout()
            plt.show()

            # Hiển thị thông tin thuật toán
            algorithm_info = "The Show Contrast Histogram function displays histograms of the original image, the equalized image, and the CLAHE-enhanced image."
            messagebox.showinfo("Algorithm Information", algorithm_info)

    def exit_app(self):
        self.master.destroy()

def main():
    root = tk.Tk()
    app = ImageProcessor(root)
    root.mainloop()

if __name__ == "__main__":
    main()
