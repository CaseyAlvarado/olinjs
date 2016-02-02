<h1> These are the cats that are between the ages of {{agegroup.lb}} and {{agegroup.ub}} </h1> 
<ul>
   {{#each agegroup.c}}
   		<li style="font-size:20px">Cat Age:{{this.age}} ; Cat Name: {{this.name}} ; Color: {{this.color}}</li>
   {{/each}}
<ul>