<script>
	import Navbar from "./components/navbar.svelte";
	import "./index.css";
	import { goto } from "$app/navigation";
	import laptop from "./images/laptop.png"

	function loginPage() {
		goto("/login");
	}

	function registerPage() {
		goto("/register");
	}
</script>

<svelte:head>
	<title>Grade App</title>
</svelte:head>

<div class="main">
	<Navbar />
	<img class="laptopImg" src={laptop} alt="laptop.img">
	<div class="home" id="home">
		<h7>Grade App - Educational App</h7>
		<p>
			Grade App is an educational chatting application that leverages the
			power of GPT-3.5 to provide answers to academic questions based on
			NCERT (National Council of Educational Research and Training) books.
			It's designed to help students and educators easily access accurate
			and reliable information related to their studies in a
			conversational format.
		</p>
		<button
			type="button"
			class="btn btn-primary loginButton"
			on:click={loginPage}>Login</button
		>
		<button
			type="button"
			class="btn btn-primary signUpButton"
			on:click={registerPage}>Register</button
		>
		<div class="features" id="features">
			<h7>Features</h7>
			<p>
				- Chat with an AI Assistant: Have real-time conversations with
				the AI-powered assistant that is trained on NCERT books.
			</p>

			<p>
				- Get Accurate Answers: Receive accurate and conh7ually relevant
				answers to your academic questions, ensuring you have the right
				information at your fingertips.
			</p>

			<p>
				- Educational Resource: Use Grade App as a supplementary
				resource to aid your studies, providing clarification and
				support on a wide range of academic topics.
			</p>

			<p>
				- User-Friendly Interface: The user interface is designed to be
				intuitive and easy to use, making it accessible to students of
				all ages.
			</p>
		</div>
		<div id="usage">
			<h7>Usage</h7>
			<p>
				<b>If you already have an account:</b> <br />
				1. Click on "Login" button above.<br />
				2. Enter your email and password and click "Login".<br />
			</p>
			<p>
				<b>If you don't have an account:</b><br />
				1. Click on the "Sign Up" Button above.<br />
				2. Enter your email and password and click "Sign Up".<br />
				Or<br />
				Contact our team at <u>gradeappbyapp@gmail.com</u> for more information
				on how you can create an account.
			</p>

			<p>
				Enjoy the benefits of instant, accurate, and reliable academic
				assistance by our AI ChatBot by typing in your questions
			</p>
		</div>
		<div id="contributing">
			<h7>Contributing</h7>

			<p>
				We welcome contributions to improve Grade App. Feel free to open
				issues, submit pull requests, or suggest new features to enhance
				the app's functionality.
			</p>
		</div>
		<div id="acknowledgments">
			<h7>Acknowledgments</h7>

			<p>- Thanks to CodyAI for providing the GPT-3 API.</p>
			<p>
				- The Grade App team for their hard work and dedication in
				developing this educational tool.
			</p>
		</div>
		<div id="contact">
			<h7>Contact</h7>

			<p>
				If you have any questions or feedback, please feel free to reach
				out at
				<u>gradeappbyapp@gmail.com</u>
			</p>
		</div>
		<h2 style="color: #f25e22;">Happy learning with Grade App! 📚🤖🚀</h2>
	</div>
</div>
