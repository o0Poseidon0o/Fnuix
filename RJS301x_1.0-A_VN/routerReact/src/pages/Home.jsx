import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>My home Page</h1>
      <p>
        Go to <Link to="/products">The list of products</Link>
      </p>
    </>
  );
}
export default HomePage;
// Dùng Link để tăng hiệu suất chuyển trang
