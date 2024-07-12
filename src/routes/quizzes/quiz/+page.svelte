<script>
  import NotLoggedIn from "../../components/notLoggedIn.svelte";
  import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  import { onMount } from "svelte";
  import { supabase } from "../../supabaseClient";
  import { parse } from "svelte/compiler";

  let notLoggedIn = false;
  let grade = 5;
  let subject = Math;
  let parsedJSONResponse = [];
  let isLoading = true;
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

  onMount(() => {
    const userEmail = sessionStorage.getItem("Email");
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
      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });
      await run(
        chatSession,
        `Can you please generate 5 questions for a quiz based on these information:{ grade: ${grade}, subject: ${subject}, Board: "CBSE NCERT" }`
      );
    } catch (err) {
      console.error(err);
      error = "Failed to fetch API key or generate questions";
    } finally {
      isLoading = false;
    }
  }
  async function run(chatSession, prompt) {
    try {
      const result = await chatSession.sendMessage(
        `you are an educational AI model designed for generating questions with options for the answer and the correct answer as well for a quiz in a simple json format. Also please provide only the json format and no other text since that will make my job easier so please help me and just return the json, and also you don't have to put the markup like the little ticks in the top and bottom of your response and the "json" at the top ${prompt}`
      );
      const response = await result.response.text();
      parsedJSONResponse = JSON.parse(response);
    } catch (err) {
      console.error(err);
      error = "Failed to parse response";
    }
  }

  function checkAnswer() {
    console.isLoading(parsedJSONResponse);
  }
</script>

{#if notLoggedIn}
  <NotLoggedIn />
{:else if isLoading}
  <center>
    <p>Loading Questions...</p>
  </center>
{:else if error}
  <p>Error: {error}</p>
{:else if parsedJSONResponse.length > 0}
  {#each parsedJSONResponse as question, index}
    <div>
      <h3>Question {index++}: {question.question}</h3>
      {#each question.options as option}
        <button class="btn btn-primary" value={option} on:click={checkAnswer}
          >{option}</button
        >
      {/each}
    </div>
  {/each}
{:else}
  <p>No questions generated.</p>
{/if}

<style>
  button {
    margin-right: 10px;
    width: 90px;
  }
</style>
