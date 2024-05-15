use std::fs::File;
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::path::Path;
use std::thread;

fn handle_client(mut stream: TcpStream) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    let request = String::from_utf8_lossy(&buffer[..]);

    let (status_line, filename) = if request.starts_with("GET / ") {
        ("HTTP/1.1 200 OK", "frontend/index.html")
    } else if request.starts_with("GET /styles.css ") {
        ("HTTP/1.1 200 OK", "frontend/styles.css")
    } else if request.starts_with("GET /script.js ") {
        ("HTTP/1.1 200 OK", "frontend/script.js")
    } else if request.starts_with("GET /projects.js ") {
        ("HTTP/1.1 200 OK", "frontend/projects.js")
    } else if request.starts_with("GET /favicon.png ") {
        ("HTTP/1.1 200 OK", "frontend/favicon.png")
    } else {
        ("HTTP/1.1 404 NOT FOUND", "frontend/404.html")
    };

    let path = Path::new(filename);
    let mut file = File::open(path).unwrap();
    let mut contents = Vec::new();
    file.read_to_end(&mut contents).unwrap();

    let response = format!(
        "{}\r\nContent-Length: {}\r\n\r\n",
        status_line,
        contents.len()
    );

    stream.write(response.as_bytes()).unwrap();
    stream.write(&contents).unwrap();
    stream.flush().unwrap();
}

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    println!("Server listening on port 7878");

    for stream in listener.incoming() {
        let stream = stream.unwrap();
        thread::spawn(|| {
            handle_client(stream);
        });
    }
}
