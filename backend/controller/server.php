<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'C:\xampp\htdocs\post-partum-app\backend\controller\vendor\autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function generateJWT($user_id)
{
    $key = "shashank";
    $payload = array(
        "user_id" => $user_id,
        "iat" => time(),
        "exp" => time() + (60 * 60)
    );
    $alg = 'HS256'; // Specify the algorithm
    return JWT::encode($payload, $key, $alg); // Include the algorithm parameter
}

// Function to check password strength
function isPasswordStrong($password, $username)
{
    // Check if password is at least 12 characters long
    if (strlen($password) < 4) {
        return false;
    }

    // Check if password contains at least one number
    if (!preg_match('/\d/', $password)) {
        return false;
    }

    // Check if password contains at least one special character
    if (!preg_match('/[!@#$%^&*()_+\-=[\]{};\'":\\|,.<>\/?]+/', $password)) {
        return false;
    }

    // Check if password contains at least one uppercase letter
    if (!preg_match('/[A-Z]/', $password)) {
        return false;
    }

    // Check if password contains at least one lowercase letter
    if (!preg_match('/[a-z]/', $password)) {
        return false;
    }

    // Check if password does not contain spaces
    if (preg_match('/\s/', $password)) {
        return false;
    }

    // Check if password does not contain unicode characters or emoji
    if (preg_match('/[\x{0080}-\x{FFFF}]/u', $password)) {
        return false;
    }

    // Check if password is not the name of the user itself
    if (strtolower($password) === strtolower($username)) {
        return false;
    }

    // Check if password is not the word "password"
    if (strtolower($password) === 'password') {
        return false;
    }

    // Check if password is not the word "123456"
    if ($password === '123456') {
        return false;
    }

    return true;
}

// Database connection
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'app_users';

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die ("Connection failed: " . $conn->connect_error);
}

// Handle Sign Up and Login
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if it's a login or signup request
    if (isset ($_POST['login'])) {
        // Login request
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Retrieve user data from the database based on the provided email
        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $hashed_password = $row['password'];

            // Verify the provided password against the hashed password stored in the database
            if (password_verify($password, $hashed_password)) {
                // Password is correct, generate JWT token
                $user_id = $row['id'];
                $jwt_token = generateJWT($user_id);
                echo json_encode(array("status" => "success", "token" => $jwt_token));
            } else {
                // Password is incorrect
                echo json_encode(array("status" => "error", "message" => "Invalid email or password"));
            }
        } else {
            // User not found with the provided email
            echo json_encode(array("status" => "error", "message" => "Invalid email or password"));
        }

    } else {
        // Sign Up request
        $username = $_POST['username'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Check if username or email already exists
        $check_query = "SELECT * FROM users WHERE username = '$username' OR email = '$email'";
        $result = $conn->query($check_query);
        if ($result && $result->num_rows > 0) {
            echo json_encode(array("status" => "error", "message" => "Username or email already exists"));
            return;
        }

        // Check password strength
        if (!isPasswordStrong($password, $username)) {
            echo json_encode(array("status" => "error", "message" => "Password should be at least 4 characters long"));
            return;
        }

        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert user data into the database
        $sql = "INSERT INTO users (username, name, email, password) VALUES ('$username', '$name', '$email', '$hashed_password')";

        if ($conn->query($sql) === TRUE) {
            // Generate JWT token
            $user_id = $conn->insert_id;
            $jwt_token = generateJWT($user_id);
            echo json_encode(array("status" => "success", "message" => "User signed up successfully", "token" => $jwt_token));
        } else {
            echo json_encode(array("status" => "error", "message" => "Error occurred while signing up: " . $conn->error));
        }
    }
}


// Close connection
$conn->close();
?>