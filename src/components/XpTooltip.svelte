<script lang="ts">
  import { toNextLevel, xpToLevel } from "$lib/helpers/xp";  
  import { userStore } from "../stores";

  let currentSkills;

  const displayTimeInSeconds = 5;
  let timer = 0; 
  let shown = false;
  let skill;
  let oldVal;
  let newVal;
  let level; 

  $: level, announceLevel();

  function announceLevel() {
    console.log("LEVEL UP! new level is " + level);
  }

  let percentToNextLevel: number;

  userStore.subscribe((value) => {
    if (value) {
      const { skillMatrix } = value;
      const values = Object.entries(skillMatrix);
      if (currentSkills) {      
        for (let i = 0; i < currentSkills.length; i++) {''
          const oldSkillVal = currentSkills[i][1];
          const newSkillVal = values[i][1];

          if (oldSkillVal !== newSkillVal) {
            timer = 0;
            oldVal = oldSkillVal;
            newVal = newSkillVal;
            level = xpToLevel(newSkillVal);
            percentToNextLevel = toNextLevel(newVal);
            console.log({ percentToNextLevel });
            skill = values[i][0];
            shown = true;
            const current = setInterval(() => {
              timer += 1
            }, 100);
            setTimeout(() => {
              if (timer > 500) {
                clearInterval(current);
                // shown = false;
              }
            }, displayTimeInSeconds * 1000);
          }
        }      
      }
      currentSkills = values;
    }
  });
</script>

{#if shown}
<div id="skilling-tooltip">
  <img src="/icons/skills/mining.png" alt="mining-skill-glyph" class="icon">
</div>
<progress value={percentToNextLevel.toFixed(2)} max="100"></progress>
{/if}

<style>
  #skilling-tooltip {
    background-color: #11191f;  
    left: 50%;
    transform: translate(-50%);
    position: fixed;
    padding: 1rem;
    border: 1px white solid;
    text-align: center;
    z-index: 10000;
    border-radius: 50%;
  }

  .icon {
    height: 2rem;
    width: 2rem;
  }

  progress {
    left: 50%;
    transform: translate(-50%);
    position: fixed;
    text-align: center;
    z-index: 10000;
    top: 5.5rem;  
    width: 4rem;
  }

</style>