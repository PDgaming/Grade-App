<script>
  import NotLoggedIn from "../../components/notLoggedIn.svelte";
  import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  import { onMount } from "svelte";
  import { supabase } from "../../supabaseClient";

  let notLoggedIn = false;
  let grade;
  let subject;
  let parsedJSONResponse = [
    {
      question: "What is the process by which plants make their own food?",
      options: ["Photosynthesis", "Respiration", "Digestion", "Evaporation"],
      answer: "Photosynthesis",
    },
    {
      question: "Which of these is NOT a part of the human digestive system?",
      options: ["Stomach", "Lungs", "Intestine", "Mouth"],
      answer: "Lungs",
    },
    {
      question: "What is the name of the largest planet in our solar system?",
      options: ["Mars", "Jupiter", "Saturn", "Venus"],
      answer: "Jupiter",
    },
    {
      question: "Which of these animals is a herbivore?",
      options: ["Lion", "Tiger", "Cow", "Eagle"],
      answer: "Cow",
    },
    {
      question: "What is the main source of energy for most living things?",
      options: ["Wind", "Water", "Sun", "Earth"],
      answer: "Sun",
    },
  ];
  let isLoading = false;
  let error = null;
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
  };
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  let selectClassAndSubject = true;
  let chatSession;
  let selectedAnswers = [];
  let correctAnswers = [];
  let userEmail;

  onMount(() => {
    userEmail = sessionStorage.getItem("Email");
    if (!userEmail) {
      notLoggedIn = true;
    } else {
      getApiKey();
    }
  });
  async function getApiKey() {
    try {
      const { data, error } = await supabase.from("API-Key").select();
      if (error) throw error;

      const apiKey = data[0].API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "",
      });
      chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });
    } catch (err) {
      console.error(err);
      error = "Failed to fetch API key or generate questions";
    }
  }
  async function run(chatSession, prompt) {
    try {
      const result = await chatSession.sendMessage(
        `you are an educational AI model designed for generating questions with options for the answer and the correct answer as well for a quiz in a simple json format. Also please provide only the json format and no other text since that will make my job easier so please help me and just return the json, and also you don't have to put the markup like the little ticks in the top and bottom of your response and the "json" at the top ${prompt}`
      );
      const response = await result.response.text();
      parsedJSONResponse = JSON.parse(response);
      console.log(parsedJSONResponse);
    } catch (err) {
      console.error(err);
      error = "Failed to parse response";
    } finally {
      isLoading = false;
    }
  }
  function takeQuiz() {
    selectClassAndSubject = false;
    isLoading = true;
    // run(
    //   chatSession,
    //   `Can you please generate 5 questions for a quiz based on these information:{ grade: ${grade}, subject: ${subject}, Board: "CBSE NCERT" }`
    // );
  }

  checkAnswer();
  async function checkAnswer() {
    correctAnswers = [];
    for (const row of parsedJSONResponse) {
      correctAnswers = [...correctAnswers, row.answer];
    }
    console.log(correctAnswers);
    let scoreIncrement = 0;
    // Loop through the selected answers and check if they match the correct answers
    selectedAnswers = ["Photosynthesis", "Lungs", "Jupiter", "Cow", "Sun"];
    for (let i = 0; i < 5; i++) {
      if (selectedAnswers[i] == correctAnswers[i]) {
        scoreIncrement += 3;
      } else {
        console.error("Sorry, your answer is wrong.");
      }
    }
    if (scoreIncrement > 0) {
      try {
        // First, get the current Rank
        let { data, error } = await supabase
          .from("Leaderboard")
          .select("Rank")
          .eq("User", userEmail);

        if (error) {
          console.error(error);
        } else {
          console.log(data);
        }

        const currentRank = data.Rank || 0;
        const newRank = currentRank + scoreIncrement;

        // Then, update the Rank
        const { data: updateData, error: updateError } = await supabase
          .from("Leaderboard")
          .update({ Rank: newRank })
          .eq("User", userEmail);

        if (updateError) throw updateError;

        console.log("Score updated successfully", updateData);
      } catch (error) {
        console.error("There was an error updating your score.", error);
      }
    }
  }
</script>

{#if notLoggedIn}
  <NotLoggedIn />
{/if}
{#if !notLoggedIn}
  {#if selectClassAndSubject}
    <div class="selection">
      <h3 style="margin-right: 20px;">Select Your Grade:</h3>
      <select style="margin-right: 50px;" id="selectgrade" bind:value={grade}>
        <option value="1">1st Grade</option>
        <option value="2">2nd Grade</option>
        <option value="3">3rd Grade</option>
        <option value="4">4th Grade</option>
        <option value="5">5th Grade</option>
        <option value="6">6th Grade</option>
        <option value="7">7th Grade</option>
        <option value="8">8th Grade</option>
        <option value="9">9th Grade</option>
        <option value="10">10th Grade</option>
        <!-- <option>Class 11(Science) --coming soon--</option>
      <option>Class 11(Commerce) --coming soon--</option>
      <option>Class 11(Arts/Humanateries) --coming soon--</option>
      <option>Class 12(Science) --coming soon--</option>
      <option>Class 12(Commerce) --coming soon--</option>
      <option>Class 12(Arts/Humanateries) --coming soon--</option> -->
      </select>
      <h3 style="margin-right: 20px;">Select A subject:</h3>
      <select id="selectSubject" bind:value={subject}>
        <option>Science(EVS)</option>
        <option>Maths</option>
        <option>English Grammar</option>
        <option>Political Science(Civics)</option>
        <option>Geography</option>
        <option>History</option>
        <option>Information Technology</option>
        <option>General Knowledge</option>
        <option>Random</option>
      </select>
    </div>
    <br />
    <button class="btn btn-primary" on:click={takeQuiz}>Take Quiz</button>
  {/if}
  {#if isLoading}
    <center>
      <p>Loading Questions...</p>
    </center>
  {:else if parsedJSONResponse.length > 0}
    {#each parsedJSONResponse as question, index}
      <div class="questions">
        <h3>Question {index++}: {question.question}</h3>
        <select bind:value={selectedAnswers[index]}>
          {#each question.options as option}
            <option value={option}>{option}</option>
          {/each}
        </select><br />
      </div>
    {/each}
    <button class="btn btn-primary" on:click={checkAnswer}>Submit</button>
  {/if}
{/if}

<style>
  .selection {
    display: inline-flex;
    margin-bottom: 10px;
  }
  .questions {
    margin-bottom: 20px;
  }
  .questions select {
    width: 100px;
  }
</style>
