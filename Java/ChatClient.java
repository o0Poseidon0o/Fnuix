
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class ChatClient {
    private static final String SERVER_IP = "localhost";
    private static final int SERVER_PORT = 8080;

    public static void main(String[] args) {
        try {
            Socket socket = new Socket(SERVER_IP, SERVER_PORT);
            BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter writer = new PrintWriter(socket.getOutputStream(), true);

            // Đọc và in thông báo chào mừng máy chủ
            String welcomeMessage = reader.readLine();
            System.out.println(welcomeMessage);

            // Nhận đầu vào của người dùng cho tên người dùng
            BufferedReader userInputReader = new BufferedReader(new InputStreamReader(System.in));       
            
            String username = userInputReader.readLine();
            writer.println(username);

            new Thread(() -> {
                String serverMessage;
                try {
                    while ((serverMessage = reader.readLine()) != null) {
                        System.out.println(serverMessage);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();

            // Nhận thông tin đầu vào của người dùng và gửi tin nhắn đến máy chủ
            String userInput;
            while ((userInput = userInputReader.readLine()) != null) {
                if (userInput.equalsIgnoreCase("exit") || userInput.equalsIgnoreCase("quit")) {
                    // Người dùng muốn thoát, gửi tín hiệu đến máy chủ
                    writer.println("exit");
                    break;
                }
                writer.println(userInput);
            }

            //Đóng tài nguyên
            socket.close();
            reader.close();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
