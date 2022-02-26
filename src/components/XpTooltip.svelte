<script lang="ts">  
  import { userStore } from "../stores";

  let currentSkills;

  const displayTimeInSeconds = 5;
  let timer = 0; 
  let shown = false;
  let skill;
  let oldVal;
  let newVal;


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
            skill = values[i][0];
            shown = true;
            const current = setInterval(() => {
              timer += 1
            }, 100);
            setTimeout(() => {
              if (timer > 500) {
                clearInterval(current);
                shown = false;
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
  <p>{skill}</p>
  <p>{oldVal.toFixed(2)} XP -> {newVal.toFixed(2)} XP</p>
</div>
{/if}

<style>
  #skilling-tooltip {
    background-color: #11191f;
    margin-left: 0 auto;
    width: 60%;
    left: 0;
    right: 0;
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    border: 1px white solid;
    text-align: center;
    z-index: 10000;
  }
</style>