<script>
  export let jumbotronContents;
</script>

<div id='myCarousel' class='carousel slide mt-3' data-bs-ride='carousel'>
  <div class='carousel-indicators'>
    {#if jumbotronContents != null && jumbotronContents.length > 0}
      {#each jumbotronContents as jumbotronContent, i}
        <button 
          type='button' 
          data-bs-target='#myCarousel' 
          data-bs-slide-to='{i}' 
          class={i === 0 ? 'active' : ''} 
          aria-current='true' 
          aria-label='Slide 1'>
        </button>
      {/each}
    {:else}
      <button type='button' data-bs-target='#myCarousel' data-bs-slide-to='0' class='active' aria-current='true' aria-label='Slide 1'></button>
      <button type='button' data-bs-target='#myCarousel' data-bs-slide-to='1' aria-label='Slide 2'></button>
      <button type='button' data-bs-target='#myCarousel' data-bs-slide-to='2' aria-label='Slide 3'></button>
    {/if}
  </div>
  <div class='carousel-inner'>
    {#if jumbotronContents != null && jumbotronContents.length > 0}
      {#each jumbotronContents as jumbotronContent, i}
        <div class={i === 0 ? 'carousel-item active' : 'carousel-item'} data-bs-interval='5000'>
          <a href={jumbotronContent.url} target='_blank' rel='noopener noreferrer'>
            <img src={jumbotronContent.image.url} class='d-block w-100' alt='...'>
          </a>
        </div>
      {/each}
    {:else}
      <div class='carousel-item active' data-bs-interval='5000'>
        <img src='https://placehold.co/1200x600' class='d-block w-100' alt='...'>
      </div>
      <div class='carousel-item' data-bs-interval='5000'>
        <img src='https://placehold.co/1200x600' class='d-block w-100' alt='...'>
      </div>
      <div class='carousel-item' data-bs-interval='5000'>
        <img src='https://placehold.co/1200x600' class='d-block w-100' alt='...'>
      </div>
    {/if}
  </div>
  <button class='carousel-control-prev' type='button' data-bs-target='#myCarousel' data-bs-slide='prev'>
    <span class='carousel-control-prev-icon' aria-hidden='true'></span>
    <span class='visually-hidden'>Previous</span>
  </button>
  <button class='carousel-control-next' type='button' data-bs-target='#myCarousel' data-bs-slide='next'>
    <span class='carousel-control-next-icon' aria-hidden='true'></span>
    <span class='visually-hidden'>Next</span>
  </button>
</div>