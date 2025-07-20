// 🌐 HTTP Crash Course – Developer Notes
// 📘 1. What is HTTP & HTTPS
// HTTP (HyperText Transfer Protocol):
// Stateless communication protocol used by the web.

// Sends data in plain text.
//ex:abc  then we get abc only 
// Used for retrieving or sending web resources.

// HTTPS (HTTP Secure):
//here one extra layer is added which adds encrytption 
// Adds SSL/TLS encryption on top of HTTP.

// Data is encrypted during transfer.

// Secures communication (prevents man-in-the-middle attacks).

// 🔁 2. Client–Server Architecture
// Client (e.g., browser, mobile app) sends requests to a server.

// Server processes and sends responses.

// Standard pattern for web applications.



/// actually concept is how do we transfer text data 



// 🌐 3. URL, URI, URN
// Term	Full Form	Meaning
// URL	Uniform Resource Locator	Full address to locate a resource
// URI	Uniform Resource Identifier	Identifier (can be URL or URN)
// URN	Uniform Resource Name	Resource by name (not location)

// 📦 4. HTTP Headers
// 📌 What are Headers?
// Metadata sent with request or response.

// Structured as key-value pairs (e.g., Content-Type: application/json).

// 🧾 Types of Headers:
// Type	Description
// Request Headers	Sent by client (e.g., Authorization, User-Agent)
// Response Headers	Sent by server (e.g., Set-Cookie, Cache-Control)
// Representation Headers	Encoding info (Content-Encoding: gzip)
// Payload Headers	Meta info about body (e.g., Content-Type)

// 🔐 Commonly Used Headers:
// Header	Purpose
// Accept	Tells server what format client can accept
// Content-Type	Format of body data (e.g., application/json)
// Authorization	Token-based authentication (e.g., JWT)
// User-Agent	Info about client (browser/app details)
// Cookie	Sends session data
// Cache-Control	How to cache responses
// Set-Cookie	Sends cookie to be stored on client
//cors 
// Access-Control-*	Used in CORS (Cross-Origin Resource Sharing)
//used in crendentials ,allow origin ,allow method

//some methods ,we will atlk abt them , now the methods are nothing 
// only tell you what operations are done in them .for ex:if i want to send te data 
// and i want make a new entery in the database ,then obviously there is a specific method for that task

// if i am requesting the server and asking it to send me this data,then also 
// there is a step specific operation,the read operation  .if i want this data i donot update the entire data 
// i want to updatae only some part ,then there is a diffrent operation, i want 
// updtae only that some part ,then there is a diffrent operation,

// ⚙️ 5. HTTP Methods (Verbs)
// Method	Use
// GET	Retrieve data from server
// POST	Create a new resource
// PUT	Fully update an existing resource
// PATCH	Partially update an existing resource
// DELETE	Remove a resource
// OPTIONS	Check what methods are allowed
// HEAD	Same as GET but without body (for meta/info)

// 🧾 6. HTTP Status Codes

//1**->informational  
// ✅ 2xx – Success
// Code	Meaning
// 200	OK
// 201	Created
// 202	Accepted
// 204	No Content

// 🔁 3xx – Redirection
// Code	Meaning
// 301	Permanent redirect
// 302	Temporary redirect
// 307	Temporary (preserve method)
// 308	Permanent (preserve method)

// ❗ 4xx – Client Errors
// Code	Meaning
// 400	Bad Request
// 401	Unauthorized (not logged in)
// 403	Forbidden (no permission)
// 404	Not Found
// 429	Too Many Requests

// 💥 5xx – Server Errors
// Code	Meaning
// 500	Internal Server Error
// 502	Bad Gateway
// 503	Service Unavailable
// 504	Gateway Timeout

// 🔒 7. CORS & Security Headers
// Access-Control-Allow-Origin: Controls cross-origin access.

// X-Frame-Options, X-XSS-Protection: Prevent security vulnerabilities.

// Security headers don’t enforce behavior; they inform the browser.

// 📌 8. Best Practices
// Always follow standard status codes.

// Use appropriate HTTP verbs for clarity.

// Use headers for caching, auth, and state management.

// For large file uploads, consider Content-Range or chunked uploads.

// In APIs, send clear error messages and codes (e.g., 400 for validation errors).

// 💡 9. Bonus: Developer Tips
// Use tools like Postman, Thunder Client, or cURL for testing.

// Inspect headers in browser dev tools > Network tab.

// Use logging and monitoring to catch 5xx errors.

// Understand HTTP deeply — it improves API design, performance, and debugging skills.