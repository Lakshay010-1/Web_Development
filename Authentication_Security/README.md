<h1>Authentication Security </h1>
<ul>
    <h2>
        <li> <a href="#">Canvas Flow v1</a> </li>
    </h2>
</ul> 

<br>
<br>

<h2>Authentication Levels</h2>
<h3>
    <ol>
        <li>
            <strong><u>Open Authorization (OAuth 2.0)</u></strong>
            <ul>
                <li>Uses OAuth for single sign-on.</li>
                <li>No password storage; relies on external identity provider.</li>
            </ul>
        </li>
        <li>
            <strong><u>Level 1 – Basic Authentication (Plaintext Passwords)</u></strong>
            <ul>
                <li>Stores and compares raw passwords.</li>
            </ul>
        </li>
        <br>
        <li>
            <strong><u>Level 2 – Encrypted Passwords (Custom Crypto)</u></strong>
            <ul>
                <li>Uses symmetric encryption (with key/iv/tag) to store passwords.</li>
                <li>Still reversible, but stronger than plain text.</li>
            </ul>
        </li>
        <br>
        <li>
            <strong><u>Level 3 – Hashed Passwords (MD5)</u></strong>
            <ul>
                <li>Stores passwords as MD5 hashes.</li>
                <li>One-way hashing.</li>
            </ul>
        </li>
        <br>
        <li>
            <strong><u>Level 4 – Hashed + Salted Passwords (bcrypt)</u></strong>
            <ul>
                <li>Uses bcrypt with configurable salt rounds.</li>
                <li>Secure industry standard for password storage.</li>
            </ul>
        </li>
        <br>
        <li>
            <strong><u>Level 5 – Session-Based Authentication (Passport Local)</u></strong>
            <ul>
                <li>Uses passport-local-mongoose for salted+hashed passwords.</li>
                <li>Adds session management with cookies.</li>
                <li>Production-grade for local authentication.</li>
            </ul>
        </li>
        <br>
        <li>
            <strong><u>Level 6 – JWT Token</u></strong>
            <ul>
                <li>Uses JSON Web Tokens for stateless authentication (no sessions stored on server).</li>
                <li>Tokens are signed and sent with each request, enabling secure APIs.</li>
                <li>Scales well for distributed systems and mobile clients.</li>
            </ul>
        </li>
    </ol>
</h3>