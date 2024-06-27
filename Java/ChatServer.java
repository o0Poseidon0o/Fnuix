package ChatJava;

import java.io.*;
import java.net.*;
import java.util.*;

public class ChatServer {
    private static final int PORT = 12345;
    private static Set<String> users = new HashSet<>();
    private static Map<String, PrintWriter> userWriters = new HashMap<>();

    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Server đang chạy trên Port: 12345");
            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("Người mới vừa tham gia: " + clientSocket);

                new Thread(new ClientHandler(clientSocket)).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static class ClientHandler implements Runnable {
        private Socket clientSocket;
        private PrintWriter out;
        private BufferedReader in;
        private String username;

        public ClientHandler(Socket socket) {
            this.clientSocket = socket;
        }

        @Override
        public void run() {
            try {
                out = new PrintWriter(clientSocket.getOutputStream(), true);
                in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

                out.println("Chào mừng bạn tham gia vào MiniChat! Hãy nhập tên của bạn để tham gia trò chuyện:");
                username = in.readLine();
                while (username == null || username.isEmpty() || users.contains(username)) {
                    out.println("User đã tồn tại hoặc sai định dạng. Vui lòng nhập tên khác:");
                    username = in.readLine();
                }
                users.add(username);
                userWriters.put(username, out);
                broadcast(username + " đã tham gia trò chuyện");

                String input;
                while ((input = in.readLine()) != null) {
                    if (input.equals("logout")) {
                        break;
                    } else if (input.startsWith("@")) {
                        String[] parts = input.split(" ", 2);
                        String recipient = parts[0].substring(1);
                        String message = "[" + username + " thì thầm]: " + parts[1];
                        if (userWriters.containsKey(recipient)) {
                            userWriters.get(recipient).println(message);
                            out.println(message);
                        } else {
                            out.println("User '" + recipient + "' không tìm thấy người dùng hoặc đã ngoại tuyến.");
                        }
                    } else {
                        broadcast("[" + username + "]: " + input);
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (username != null) {
                    users.remove(username);
                    userWriters.remove(username);
                    broadcast(username + " rời khỏi cuộc trò chuyện");
                }
                try {
                    clientSocket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        private void broadcast(String message) {
            for (PrintWriter writer : userWriters.values()) {
                writer.println(message);
            }
        }
    }
}
