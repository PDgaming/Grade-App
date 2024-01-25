<div class="container">
    <h1>Sign Up</h1>
    <form>
        <div id="SignUpForm">
            <input
                type="email"
                class="emailInput"
                id="email"
                placeholder="Email"
            /><br />

            <input
                type="password"
                class="passwordInput"
                id="password"
                placeholder="Password"
            />
            <span class="showPassword" id="showPassword">Show</span><br />

            <button onclick="signUp()">Sign Up</button>
            <h1 style="font-size: 20px;">
                Already have an account? <a href="/login">Login</a>
            </h1>
        </div>
    </form>
</div>
