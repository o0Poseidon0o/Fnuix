
// Import các gói thư viện cần thiết
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ChatServer {
    private static final int PORT = 8080;
    private static final int INVITE_TIMEOUT = 30000;

    public static Map<String, PrintWriter> userWriters = new HashMap<>();
    public static Map<String, GroupInfo> groupWriters = new HashMap<>();

    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(PORT);
            System.out.println("Server is running on port " + PORT);

            while (true) {
                Socket clientSocket = serverSocket.accept();
                new Thread(new ClientHandler(clientSocket)).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //Tạo đối tượng đại diện cho thông tin về một nhóm 
    private static class GroupInfo {
        private List<PrintWriter> members;
        private String password;

        public GroupInfo() {
            this.members = new ArrayList<>();
            this.password = "";
        }

        public List<PrintWriter> getMembers() {
            return members;
        }

        public String getPassword() {
            return password;
        }
    }
    //xử lý mỗi kết nối từ một client
    private static class ClientHandler implements Runnable {
        private Socket clientSocket;
        private PrintWriter writer;// Đối tượng ghi đến client
        private String username;// Tên người dùng của client
        
        public ClientHandler(Socket socket) {
            this.clientSocket = socket;
        }

        @Override
        public void run() {
            try {
                // Tạo đối tượng đọc từ client và ghi đến client
                BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                writer = new PrintWriter(clientSocket.getOutputStream(), true);

                
                String enteredUsername;
                boolean validUsername = false;

                do {
                    // Yêu cầu client nhập tên người dùng
                    writer.println("Enter your username:");
                    enteredUsername = reader.readLine();

                    // Kiểm tra xem username đã tồn tại hay chưa
                    if (!userWriters.containsKey(enteredUsername)) {
                        validUsername = true;
                        // Gán username đã được xác nhận cho client
                        username = enteredUsername;
                        userWriters.put(username, writer);
                        // Thông báo đăng nhập thành công
                        writer.println("Welcome, " + username + "!");
                    } else {
                        writer.println("Username already exists. Please choose a different username.");
                    }
                } while (!validUsername);
                
                // Xử lý tin nhắn từ client
                String input;
                while ((input = reader.readLine()) != null) {
                    if (input.startsWith("/")) {
                        handleCommand(input);// Xử lý lệnh nếu tin nhắn bắt đầu bằng "/"
                    } else {
                        sendMessage(input);// Gửi tin nhắn đến tất cả hoặc một người dùng cụ thể
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                // Khi client ngắt kết nối, xóa người dùng và đóng ổ cắm
                userWriters.remove(username);
                closeSocket();
            }
        }
        // Gửi tin nhắn đến một người dùng hoặc nhóm
        private void sendMessage(String message) {
            // Xử lý tin nhắn một-một, một-nhóm và một-cho-tất cả
            if (message.startsWith("@")) {
                String[] parts = message.split(" ", 2);
                String recipient = parts[0].substring(1);
                String content = parts[1];

                if (userWriters.containsKey(recipient)) {
                    userWriters.get(recipient).println(username + ": " + content);
                } else {
                    writer.println("User not found: " + recipient);
                }
            } else if (message.startsWith("#")) {
                String[] parts = message.split(" ", 2);
                String groupName = parts[0].substring(1);
                String content = parts[1];

                if (groupWriters.containsKey(groupName)) {
                    GroupInfo groupInfo = groupWriters.get(groupName);

                    // Kiểm tra xem người gửi lệnh có phải là thành viên của nhóm không
                    if (groupInfo.getMembers().contains(writer)) {
                        for (PrintWriter groupWriter : groupInfo.getMembers()) {
                            groupWriter.println(username + "(" + groupName + "): " + content);
                        }
                    } else {
                        writer.println("You are not a member of the group: " + groupName);
                    }
                } else {
                    writer.println("Group not found: " + groupName);
                }
            } else {
                for (PrintWriter userWriter : userWriters.values()) {
                    userWriter.println(username + "(all): " + message);
                }
            }
        }
        // Xử lý các lệnh từ client
        private void handleCommand(String command) {
            // Xử lý các lệnh, ví dụ: tham gia/ra khỏi nhóm, tạo nhóm
            if (command.startsWith("/join")) {
                String[] parts = command.split(" ", 3);
                String groupName = parts[1];
                String password = parts.length == 3 ? parts[2] : "";
                joinGroup(groupName, password);
            } else if (command.startsWith("/leave")) {
                String[] parts = command.split(" ", 2);
                String groupName = parts[1];
                leaveGroup(groupName);
            } else if (command.startsWith("/groups")) {
                displayGroups();
            } else if (command.startsWith("/createGroup")) {
                String[] parts = command.split(" ", 3);
                String groupName = parts[1];
                String password = parts.length == 3 ? parts[2] : "";
                createGroup(groupName, password);
                joinGroup(groupName, password);
            } else if (command.startsWith("/users")) {
                displayConnectedUsers();
            } else if (command.startsWith("/invite")) {
                String[] parts = command.split(" ", 3);
                String groupName = parts[1];
                String invitee = parts[2];
                inviteUserToGroup(groupName, invitee);
            } else if (command.startsWith("/members")) {
                String[] parts = command.split(" ", 2);
                String groupName = parts[1];
                displayGroupMembers(groupName);
            } else {
                writer.println("Unknown command: " + command);
            }
        }
        // Tham gia nhóm với một tên nhóm và mật khẩu
        private void joinGroup(String groupName, String password) {
            if (groupWriters.containsKey(groupName)) {
                GroupInfo groupInfo = groupWriters.get(groupName);
                if (!groupInfo.getMembers().contains(writer)) {
                    // Thực hiện hành động khi mật khẩu đúng hoặc người dùng đã là thành viên của nhóm
                    if (groupInfo.getPassword().equals(password) || groupInfo.getMembers().contains(writer)) {
                        groupInfo.getMembers().add(writer);
                        writer.println("You joined the group: " + groupName);
                    } else {
                        // Thông báo khi mật khẩu sai và người dùng chưa là thành viên của nhóm
                        writer.println("Incorrect password for group: " + groupName);
                    }
                } else {
                    writer.println("You are already a member of the group: " + groupName);
                }
            } else {
                writer.println("Group not found: " + groupName);
            }
        }
        // Rời khỏi nhóm với một tên nhóm
        private void leaveGroup(String groupName) {
            if (groupWriters.containsKey(groupName)) {
                GroupInfo groupInfo = groupWriters.get(groupName);
                if (groupInfo.getMembers().remove(writer)) {
                    writer.println("You left the group: " + groupName);
                    if (groupInfo.getMembers().isEmpty()) {
                        groupWriters.remove(groupName);
                    }
                } else {
                    writer.println("You are not a member of the group: " + groupName);
                }
            } else {
                writer.println("Group not found: " + groupName);
            }
        }
        // Hiển thị danh sách các nhóm và xác định nhóm có yêu cầu mật khẩu hay không
        private void displayGroups() {
            StringBuilder groupsInfo = new StringBuilder("Available groups: ");
            for (Map.Entry<String, GroupInfo> entry : groupWriters.entrySet()) {
                groupsInfo.append(entry.getKey()).append(entry.getValue().getPassword().isEmpty() ? "" : "(private)").append(", ");
            }
            writer.println(groupsInfo.substring(0, groupsInfo.length() - 2));
        }
        // Tạo một nhóm mới nếu nhóm chưa tồn tại
        private void createGroup(String groupName, String password) {
            if (!groupWriters.containsKey(groupName)) {
                GroupInfo groupInfo = new GroupInfo();
                groupInfo.password = password;
                groupWriters.put(groupName, groupInfo);
                
                // Thiết lập bộ hẹn giờ để xóa nhóm nếu không đạt được số lượng thành viên tối thiểu
                Thread timerThread = new Thread(() -> {
                    try {
                        Thread.sleep(INVITE_TIMEOUT);
                        if (groupWriters.containsKey(groupName) && groupWriters.get(groupName).getMembers().size() < 2) {
                            groupWriters.remove(groupName);
                            writer.println("Group deleted: " + groupName + " (insufficient members)");
                        }
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                });
                timerThread.start();
                //Kiểm tra xem luồng timerThread đang hoạt động hay không
                //Kiểm tra xem groupWriters có chứa nhóm với tên là groupName hay không.
                if (timerThread.isAlive() && groupWriters.containsKey(groupName) && groupWriters.get(groupName).getMembers().size() >= 2) {
                    timerThread.interrupt();
                }

                writer.println("Group created: " + groupName);
                writer.println("Requires group to have at least 2 members! Please add members! The group will be deleted in 30 seconds if there are not enough members");
            } else {
                writer.println("Group already exists: " + groupName);
            }
        }
        // Hiển thị danh sách người dùng đang kết nối
        private void displayConnectedUsers() {
            writer.println("Connected users: " + String.join(", ", userWriters.keySet()));
        }
        //mời một người dùng khác (invitee) vào một nhóm cụ thể (groupName).
        private void inviteUserToGroup(String groupName, String invitee) {
            if (groupWriters.containsKey(groupName)) {
                GroupInfo groupInfo = groupWriters.get(groupName);
                //Kiểm tra xem người gửi mời (writer) có phải là thành viên của nhóm hay không.
                if (groupInfo.getMembers().contains(writer)) {
                    //Kiểm tra xem người được mời (invitee) có tồn tại trong userWriters hay không.
                    if (userWriters.containsKey(invitee)) {
                        PrintWriter inviteeWriter = userWriters.get(invitee);
                        //Kiểm tra xem người được mời đã là thành viên của nhóm hay chưa
                        if (!groupInfo.getMembers().contains(inviteeWriter)) {
                            groupInfo.getMembers().add(inviteeWriter);
                            writer.println(invitee + " has been added to the group " + groupName);
                            inviteeWriter.println("You have been automatically added to the group " + groupName + " by " + username);
                        } else {
                            writer.println(invitee + " is already a member of the group " + groupName);
                        }
                    } else {
                        writer.println("User not found: " + invitee);
                    }
                } else {
                    writer.println("You are not a member of the group: " + groupName);
                }
            } else {
                writer.println("Group not found: " + groupName);
            }
        }
        //hiển thị danh sách các thành viên của một nhóm cụ thể (groupName)
        private void displayGroupMembers(String groupName) {
            if (groupWriters.containsKey(groupName)) {
                GroupInfo groupInfo = groupWriters.get(groupName);
                List<String> members = new ArrayList<>();
                
                for (PrintWriter memberWriter : groupInfo.getMembers()) {
                    members.add(getUsernameByWriter(memberWriter));
                }
                writer.println("Members of group " + groupName + ": " + String.join(", ", members));
            } else {
                writer.println("Group not found: " + groupName);
            }
        }
        
        // tìm tên người dùng dựa trên PrintWriter
        private String getUsernameByWriter(PrintWriter writer) {
            //duyệt qua tất cả các phần tử trong Map có kiểu userWriters
            for (Map.Entry<String, PrintWriter> entry : userWriters.entrySet()) {
                //so sánh giá trị (value) của mỗi cặp key-value trong userWriters với một PrintWriter
                if (entry.getValue().equals(writer)) {
                    return entry.getKey();
                }
            }
            return "";
        }
        // Đóng writer và socket khi kết thúc
        private void closeSocket() {
            if (writer != null) {
                writer.close();
            }
            try {
                clientSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
