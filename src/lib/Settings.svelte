<script>
  /** @type {import('$lib/Timetable').Timetable}  */
  export let timetable;
</script>

<div class="space-y-6">
  {#each timetable.entries as entry}
    <label class="block">
      <span class="text-sm"
        >{entry.id}, thứ {entry.wday}, tuần {[entry.weeks.first]
          .concat(entry.weeks.others)
          .join(', ')}</span
      >
      <input
        type="text"
        bind:value={entry.name}
        class="block w-full py-1 px-2 rounded-md dark:bg-transparent border border-blue"
      />
    </label>
  {/each}
</div>
