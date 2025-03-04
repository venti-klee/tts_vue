<script setup>

</script>

<template>
  <div class="waveform-canvas">
    <av-waveform src="/static/audio1.wav" 
      :played-line-color="'#25AEBF'" 
      :noplayed-line-color="'#E2E2E3'" 
      :playtime-slider-color="'#767A7D'"
      :canv-width="860"
      :canv-height="80"
      :playtime-line-width="1.0"
      >
        
      </av-waveform>
  </div>
</template>

<style >
.waveform-canvas{
  display:flex;
  justify-content:center;
  gap:20px;
  width:1185px;
  margin-top:-10px;
  background-color: rgba(60, 67, 75, 0.66);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding:10px 22px 10px 22px;
  audio{
    margin-top:15px;
    margin-right:20px;
    /* background-color: seagreen; */
  }
  canves{
    margin-left:0px;
    
  }
}
</style>