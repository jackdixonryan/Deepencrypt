<script lang="ts">
import supabase from "$lib/db";
import type { User } from "@supabase/supabase-js";
import { userStore } from "../stores";
import { onMount } from "svelte";
import { xpToLevel } from "$lib/helpers/xp";
import Donut from "svelte-chartjs/src/Doughnut.svelte";

let user: User;
let player;
let skills;
let totalLevel;
let chartData;

onMount(() => {
  user = supabase.auth.user();
  userStore.subscribe((userRecord) => {
    player = userRecord;
    if (player) {
      console.log({ player });
      skills = createSkillArray(userRecord);
      totalLevel = getTotalLevel(skills);
      chartData = createChartData(skills);
    }
  });
});

function createSkillArray(userRecord) {
  const matrix = userRecord.skillMatrix;
  const entries = Object.entries(matrix);
  const arr = [];

  for (let i = 0; i < entries.length; i++) {
    const [ skillName, xp ] = entries[i];
    arr.push({
      name: skillName,
      xp,
      level: xpToLevel(xp)
    });
  }
  return arr;
}

function getTotalLevel(skillArray) {
  return skillArray.reduce((prev, curr) => {
    return prev + curr.level;
  }, 0)
}

function createChartData(skillArray) {
  let chartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774"
        ]
      }
    ]
  }

  skillArray.forEach((skill) => {
    const { name, xp } = skill;
    chartData.labels.push(name);
    chartData.datasets[0].data.push(xp);
  });

  return chartData;

}
</script>

{#if user && player}
<section>
  <!-- <h1>{}</h1> -->
  <article>
    Welcome to your new profile. I'm pleased that you decided to join us - it is free, after all, so why not? You have been issued a license to prospect this site. This license bears with it a license number. Your license number is your identifier on this site, and it will be the source of truth for everything about you - your currency balance, your skill rankings, your pages, your titles, and your achievements. Go ahead and take a look.
  </article>

  <article>
    <header>
      <hgroup>
        <h4>License No.</h4>
        <h3>{ user.id }</h3>
      </hgroup>
    </header>
    <h4>BASIC</h4>
    <ul>
      <li>TOTAL LEVEL: {totalLevel}</li>
      <li>EMAIL: {user.email}</li>
      <li>CREATED ON: {user.created_at}</li>
      <li>LAST SEEN: {user.last_sign_in_at}</li>
    </ul>
    <h4>SKILLS</h4>
      <div class="flex-wrapper">
        <ul class="flex-child">
          {#each skills as skill}
            <li>{ skill.name }: { skill.level } ({ skill.xp } XP)</li>
          {/each}
        </ul>
        <div class="flex-child">
          <Donut data={chartData} width={50} height={50} options={{ maintainAspectRatio: false, legend: { display: false} }}></Donut>
        </div>
    </div>
  </article>

  {#if totalLevel === 9}
  <article>
    <p>So, you haven't trained any skills yet. That's alright. You haven't got a toolbar yet, that's probably part of the problem. When you're ready, click the button to begin the toolbar tutorial and start your journey toward prosperity.</p>
    <a href="/introduction/toolbar"><button>START TUTORIAL</button></a>
  </article>
  {/if}
</section>
{:else}
<section>
  <article>
    <header>Already Licensed?</header>
    <a href="/access-license">
      <button>Access your License</button>
    </a>
  </article>
  <article>
    <header>Looks like you haven't got a license yet.</header>
    A working license is required to interact with the mainframe. Without a license, I fear there's nothing we can do for you. Fortunately, myself and my comrades are willing to issue you a license for no additional fee.
    <footer>
      <a href="/get-license"><button>Get a License</button></a>
    </footer>
  </article>
</section>
{/if}

<style>
  .flex-wrapper {
    display: flex;
  }

  .flex-child {
    flex: 1
  }
</style>