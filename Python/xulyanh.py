import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk, ImageFilter

class ImageProcessorApp:
    def __init__(self, master):
        self.master = master
        self.master.title("Image Processor")
        
        self.image_label = tk.Label(self.master)
        self.image_label.pack()
        
        self.load_button = tk.Button(self.master, text="Load Image", command=self.load_image)
        self.load_button.pack()
        
        self.width_label = tk.Label(self.master, text="Width:")
        self.width_label.pack()
        self.width_entry = tk.Entry(self.master, width=10)
        self.width_entry.pack()

        self.height_label = tk.Label(self.master, text="Height:")
        self.height_label.pack()
        self.height_entry = tk.Entry(self.master, width=10)
        self.height_entry.pack()



        self.angle_label = tk.Label(self.master, text="Angle:")
        self.angle_label.pack()
        self.angle_entry = tk.Entry(self.master, width=10)
        self.angle_entry.pack()
        
        self.resize_button = tk.Button(self.master, text="Resize Image", command=self.resize_image)
        self.resize_button.pack()
        
        self.gaussian_button = tk.Button(self.master, text="Apply Gaussian Blur", command=self.apply_gaussian_blur)
        self.gaussian_button.pack()
        
        self.rotate_button = tk.Button(self.master, text="Rotate Image", command=self.rotate_image)
        self.rotate_button.pack()
        
        self.loaded_image = None
    
    def load_image(self):
        file_path = filedialog.askopenfilename()
        if file_path:
            self.loaded_image = Image.open(file_path)
            self.display_image(self.loaded_image)
    
    def display_image(self, image):
        self.tk_image = ImageTk.PhotoImage(image)
        self.image_label.configure(image=self.tk_image)
    
    def resize_image(self):
        if self.loaded_image:
            width = int(self.width_entry.get())
            height = int(self.height_entry.get())
            resized_image = self.loaded_image.resize((width, height))
            self.display_image(resized_image)
    
    def apply_gaussian_blur(self):
        if self.loaded_image:
            blurred_image = self.loaded_image.filter(ImageFilter.GaussianBlur(2))
            self.display_image(blurred_image)
    
    def rotate_image(self):
        if self.loaded_image:
            angle = int(self.angle_entry.get())
            rotated_image = self.loaded_image.rotate(angle)
            self.display_image(rotated_image)

def main():
    root = tk.Tk()
    app = ImageProcessorApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
